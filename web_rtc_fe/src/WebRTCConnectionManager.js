import io from 'socket.io-client';

const ICE_CONFIGURATION = {
  iceServers: [
    {urls: 'stun:stun.l.google.com:19302'}
  ]
};

const SOCKET_URL = 'http://localhost:8080';

export default class WebRTCConnectionManager {
  constructor() {
    this.rtcConnection = new RTCPeerConnection(ICE_CONFIGURATION);
    this.socket = io.connect(SOCKET_URL);

    this.localMediaStreamPromise = null;
    this.remoteMediaStreamPromise = null;

    this.rtcConnection.onicecandidate = this.handleIceCandidate.bind(this);

    this.socket.on('offer', this.handleOffer.bind(this));
    this.socket.on('answer', this.handleAnswer.bind(this));
    this.socket.on('ice_candidate', this.handleRemoteIceCandidate.bind(this));
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
  async call() {
    // add local media stream tracks to rtc connection
    let localMediaStream = await this.getLocalMediaStream();
    localMediaStream.getTracks().forEach((track) => this.rtcConnection.addTrack(track, localMediaStream));

    // send an offer
    let localDescription = await this.rtcConnection.createOffer();
    await this.rtcConnection.setLocalDescription(localDescription);
    this.socket.emit('offer', {description: this.rtcConnection.localDescription});
  }

  /* Handle an incoming call */
  async handleOffer({description}) {
    console.log(`handleOffer: ${description}`);

    await this.rtcConnection.setRemoteDescription(description);

    // add local media stream tracks to rtc connection
    let localMediaStream = await this.getLocalMediaStream();
    localMediaStream.getTracks().forEach((track) => this.rtcConnection.addTrack(track, localMediaStream));

    // send an answer
    await this.rtcConnection.setLocalDescription(await this.rtcConnection.createAnswer());
    this.socket.emit('answer', {description: this.rtcConnection.localDescription});
  }

  /* Handle an answer to our offer (if we initiated the call) */
  async handleAnswer({description}) {
    console.log(`handleAnswer: ${description}`);
    await this.rtcConnection.setRemoteDescription(description);
  }

  async handleIceCandidate({candidate}) {
    console.log(`handleIceCandidate: ${candidate}`);

    if (!candidate) return;
    this.socket.emit('ice_candidate', {candidate});
  }

  async handleRemoteIceCandidate({candidate}) {
    console.log(`handleRemoteIceCandidate: ${candidate}`);

    if (!candidate) return;
    await this.rtcConnection.addIceCandidate(candidate);
  }
}
