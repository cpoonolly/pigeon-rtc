const ICE_CONFIGURATION = {
  iceServers: [
    {urls: 'stun:stun.l.google.com:19302'}
  ]
};

export default class PigeonRTCConnectionMngr {
  constructor() {
    this.rtcConnection = new RTCPeerConnection(ICE_CONFIGURATION);

    /*
      Unfortunately sending ice candidates via carrier pigeon is most likely a slow and arduous process...
      ...and likely our users have a limited fleet of pigeons to send out
      ...so the hacky solution is to instead blob our description + ice candidates into a single message.
      ...this way way our users only need to send out a single pigeon out leaving the rest of the "kit" to relax & frolic
      ...while this likely might cause issues in situations that require multiple candidates to be sent back and forth,
         (ex: when stun fails and we need to resort to a turn server? - my knowledge on the matter is actually quite limited...)
         still i think for the sake of our pigeon friends we can make this concession
    */
    this.localConnectionData = {description: null, candidates: []};
    this.subscribers = new Set();

    this.localMediaStreamPromise = null;
    this.remoteMediaStreamPromise = null;

    this.rtcConnection.onicecandidate = this.handleIceCandidate.bind(this);
  }

  subscribe(handler) {
    this.subscribers.add(handler);
  }

  unsubscribe(handler) {
    this.subscribers.delete(handler);
  }

  notifyAll() {
    this.subscribers.forEach((handler) => handler(JSON.stringify(this.localConnectionData)));
  }

  async getLocalMediaStream() {
    if (this.localMediaStreamPromise === null) {
      this.localMediaStreamPromise = new Promise((resolve, reject) => {
        navigator.getUserMedia(
          {video: true, audio: true},
          (stream) => resolve(stream),
          () => reject(new Error('Failed to get local media stream'))
        );
      });
    }

    return this.localMediaStreamPromise;
  }

  async getRemoteMediaStream() {
    if (this.remoteMediaStreamPromise === null) {
      this.remoteMediaStreamPromise = new Promise((resolve, reject) => {
        this.rtcConnection.ontrack = ((event) => {
          resolve(event.streams[0]);
        });
      });
    }

    return this.remoteMediaStreamPromise;
  }

  /* Initiate a call */
  async createOffer() {
    // add local media stream tracks to rtc connection
    let localMediaStream = await this.getLocalMediaStream();
    localMediaStream.getTracks().forEach((track) => this.rtcConnection.addTrack(track, localMediaStream));

    // send an offer
    let localDescription = await this.rtcConnection.createOffer();
    await this.rtcConnection.setLocalDescription(localDescription);
    
    this.localConnectionData.description = this.rtcConnection.localDescription;
    this.notifyAll();
  }

  /* Handle an incoming call */
  async handleOffer({description, candidates}) {
    console.log(`handleOffer: ${description}`);

    await this.rtcConnection.setRemoteDescription(description);

    // add local media stream tracks to rtc connection
    let localMediaStream = await this.getLocalMediaStream();
    localMediaStream.getTracks().forEach((track) => this.rtcConnection.addTrack(track, localMediaStream));

    // send an answer
    await this.rtcConnection.setLocalDescription(await this.rtcConnection.createAnswer());

    this.localConnectionData.description = this.rtcConnection.localDescription;
    for (let i = 0; i < candidates.length; i++) {
      await this.handleRemoteIceCandidate(candidates[i]);
    }

    this.notifyAll();
  }

  /* Handle an answer to our offer (if we initiated the call) */
  async handleAnswer({description, candidates}) {
    console.log(`handleAnswer: ${description}`);
    await this.rtcConnection.setRemoteDescription(description);

    this.localConnectionData.description = this.rtcConnection.localDescription;
    for (let i = 0; i < candidates.length; i++) {
      await this.handleRemoteIceCandidate(candidates[i]);
    }
  }

  async handleIceCandidate({candidate}) {
    console.log(`handleIceCandidate: ${candidate}`);

    if (!candidate) return;
    this.localConnectionData.candidates.push({candidate});
    this.notifyAll();
  }

  async handleRemoteIceCandidate({candidate}) {
    console.log(`handleRemoteIceCandidate: ${candidate}`);

    if (!candidate) return;
    await this.rtcConnection.addIceCandidate(candidate);
  }
}
