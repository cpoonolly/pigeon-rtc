const ICE_CONFIGURATION = {
  iceServers: [
    {urls: 'stun:stun.l.google.com:19302'}
  ]
};

export default class CarrierPigeonRTCConnectionMngr {
  constructor() {
    this.rtcConnection = new RTCPeerConnection(ICE_CONFIGURATION);

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
