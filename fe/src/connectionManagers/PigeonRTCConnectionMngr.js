const ICE_CONFIGURATION = {
  iceServers: [
    // {urls: 'stun:stun.l.google.com:19302'},

    // Taken from https://gist.github.com/yetithefoot/7592580
    {url:'stun:stun01.sipphone.com'},
    {url:'stun:stun.ekiga.net'},
    {url:'stun:stun.fwdnet.net'},
    {url:'stun:stun.ideasip.com'},
    {url:'stun:stun.iptel.org'},
    {url:'stun:stun.rixtelecom.se'},
    {url:'stun:stun.schlund.de'},
    {url:'stun:stun.l.google.com:19302'},
    {url:'stun:stun1.l.google.com:19302'},
    {url:'stun:stun2.l.google.com:19302'},
    {url:'stun:stun3.l.google.com:19302'},
    {url:'stun:stun4.l.google.com:19302'},
    {url:'stun:stunserver.org'},
    {url:'stun:stun.softjoys.com'},
    {url:'stun:stun.voiparound.com'},
    {url:'stun:stun.voipbuster.com'},
    {url:'stun:stun.voipstunt.com'},
    {url:'stun:stun.voxgratia.org'},
    {url:'stun:stun.xten.com'},
    {
      url: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com'
    },
    {
      url: 'turn:192.158.29.39:3478?transport=udp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808'
    },
    {
      url: 'turn:192.158.29.39:3478?transport=tcp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808'
    }
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
