const ICE_CONFIGURATION = {
  iceServers: [
    {urls: 'stun:stun.l.google.com:19302'}
  ]
};

// const SOCKET_URL = 'http://localhost:8080';

export default class WebRTCConnectionManager {
  constructor() {
    this.rtcConnection = new RTCPeerConnection(ICE_CONFIGURATION);

    this.localConnectionData = {description: null, candidates: []};
    this.subscribers = new Set();

    // this.socket = io.connect(SOCKET_URL);

    this.localMediaStreamPromise = null;
    this.remoteMediaStreamPromise = null;

    this.rtcConnection.onicecandidate = this.handleIceCandidate.bind(this);

    // this.socket.on('offer', this.handleOffer.bind(this));
    // this.socket.on('answer', this.handleAnswer.bind(this));
    // this.socket.on('ice_candidate', this.handleRemoteIceCandidate.bind(this));
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
          {video: true},
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
          console.log('onRemoteTrack');
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
    // this.socket.emit('offer', {description: this.rtcConnection.localDescription});
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
    // this.socket.emit('answer', {description: this.rtcConnection.localDescription});
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
    // this.socket.emit('ice_candidate', {candidate});
  }

  async handleRemoteIceCandidate({candidate}) {
    console.log(`handleRemoteIceCandidate: ${candidate}`);

    if (!candidate) return;
    await this.rtcConnection.addIceCandidate(candidate);
  }
}
