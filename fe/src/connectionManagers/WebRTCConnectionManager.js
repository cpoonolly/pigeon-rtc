import io from 'socket.io-client';

const ICE_CONFIGURATION = {
  iceServers: [
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

export default class WebRTCConnectionManager {
  constructor(serverUrl, roomUuid) {
    this.rtcConnection = new RTCPeerConnection(ICE_CONFIGURATION);
    this.socket = io.connect(serverUrl);
    
    this.roomUuid = roomUuid;
    this.localMediaStreamPromise = null;
    this.remoteMediaStreamPromise = null;

    this.rtcConnection.onicecandidate = this.handleIceCandidate.bind(this);

    this.socket.on('offer', this.handleOffer.bind(this));
    this.socket.on('answer', this.handleAnswer.bind(this));
    this.socket.on('ice_candidate', this.handleRemoteIceCandidate.bind(this));

    this.socket.emit('join_room', roomUuid);
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
    this.socket.emit('offer', this.roomUuid, {description: this.rtcConnection.localDescription});
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
    this.socket.emit('answer', this.roomUuid, {description: this.rtcConnection.localDescription});
  }

  /* Handle an answer to our offer (if we initiated the call) */
  async handleAnswer({description}) {
    console.log(`handleAnswer: ${description}`);
    await this.rtcConnection.setRemoteDescription(description);
  }

  async handleIceCandidate({candidate}) {
    console.log(`handleIceCandidate: ${candidate}`);

    if (!candidate) return;
    this.socket.emit('ice_candidate', this.roomUuid, {candidate});
  }

  async handleRemoteIceCandidate({candidate}) {
    console.log(`handleRemoteIceCandidate: ${candidate}`);

    if (!candidate) return;
    await this.rtcConnection.addIceCandidate(candidate);
  }
}
