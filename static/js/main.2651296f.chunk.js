(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{138:function(e,t,n){e.exports=n(350)},143:function(e,t,n){},145:function(e,t,n){},242:function(e,t){},350:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(21),i=n.n(c),o=(n(143),n(22)),s=n(23),l=n(28),u=n(27),d=n(29),h=n(15),m=(n(145),n(24)),f=n(133),p=n.n(f),v=n(134),C=n.n(v),b=n(135),E=n.n(b),g=n(136),S=n.n(g),k=n(137),O=n.n(k),y=n(86),w=n.n(y),j=n(36),x=n.n(j),V=n(56),M=n.n(V),R=n(57),A=n.n(R),P=n(16),I=n.n(P),N=n(83),D=n.n(N),L=n(42),U=n.n(L),T=n(80),B=n.n(T),F=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(M.a,{className:e.videoCard},r.a.createElement(A.a,null,r.a.createElement(B.a,{variant:"h5",gutterBottom:!0},this.props.videoName),r.a.createElement("video",{ref:this.props.videoRef,autoPlay:!0})))}}]),t}(a.Component),_=Object(m.withStyles)(function(e){return{videoCard:{width:"100%",heigth:"100%"}}})(F),J=n(9),W=n.n(J),G=n(19),z=n(131),$=n.n(z),q={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},H="http://localhost:8080",K=function(){function e(t){Object(o.a)(this,e),this.rtcConnection=new RTCPeerConnection(q),this.socket=$.a.connect(t||H),this.localMediaStreamPromise=null,this.remoteMediaStreamPromise=null,this.rtcConnection.onicecandidate=this.handleIceCandidate.bind(this),this.socket.on("offer",this.handleOffer.bind(this)),this.socket.on("answer",this.handleAnswer.bind(this)),this.socket.on("ice_candidate",this.handleRemoteIceCandidate.bind(this))}return Object(s.a)(e,[{key:"getLocalMediaStream",value:function(){var e=Object(G.a)(W.a.mark(function e(){return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return null===this.localMediaStreamPromise&&(this.localMediaStreamPromise=new Promise(function(e,t){navigator.getUserMedia({video:!0,audio:!0},function(t){return e(t)},function(){return t(new Error("Failed to get local media stream"))})})),e.abrupt("return",this.localMediaStreamPromise);case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getRemoteMediaStream",value:function(){var e=Object(G.a)(W.a.mark(function e(){var t=this;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return null===this.remoteMediaStreamPromise&&(this.remoteMediaStreamPromise=new Promise(function(e,n){t.rtcConnection.ontrack=function(t){console.log("onRemoteTrack"),e(t.streams[0])}})),e.abrupt("return",this.remoteMediaStreamPromise);case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"call",value:function(){var e=Object(G.a)(W.a.mark(function e(){var t,n,a=this;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getLocalMediaStream();case 2:return(t=e.sent).getTracks().forEach(function(e){return a.rtcConnection.addTrack(e,t)}),e.next=6,this.rtcConnection.createOffer();case 6:return n=e.sent,e.next=9,this.rtcConnection.setLocalDescription(n);case 9:this.socket.emit("offer",{description:this.rtcConnection.localDescription});case 10:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"handleOffer",value:function(){var e=Object(G.a)(W.a.mark(function e(t){var n,a,r=this;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.description,console.log("handleOffer: ".concat(n)),e.next=4,this.rtcConnection.setRemoteDescription(n);case 4:return e.next=6,this.getLocalMediaStream();case 6:return(a=e.sent).getTracks().forEach(function(e){return r.rtcConnection.addTrack(e,a)}),e.t0=this.rtcConnection,e.next=11,this.rtcConnection.createAnswer();case 11:return e.t1=e.sent,e.next=14,e.t0.setLocalDescription.call(e.t0,e.t1);case 14:this.socket.emit("answer",{description:this.rtcConnection.localDescription});case 15:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handleAnswer",value:function(){var e=Object(G.a)(W.a.mark(function e(t){var n;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.description,console.log("handleAnswer: ".concat(n)),e.next=4,this.rtcConnection.setRemoteDescription(n);case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handleIceCandidate",value:function(){var e=Object(G.a)(W.a.mark(function e(t){var n;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.candidate,console.log("handleIceCandidate: ".concat(n)),n){e.next=4;break}return e.abrupt("return");case 4:this.socket.emit("ice_candidate",{candidate:n});case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handleRemoteIceCandidate",value:function(){var e=Object(G.a)(W.a.mark(function e(t){var n;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.candidate,console.log("handleRemoteIceCandidate: ".concat(n)),n){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,this.rtcConnection.addIceCandidate(n);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),e}(),Q="http://localhost:8080",X=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={serverUrl:Q,isServerSet:!1},n.rtcConnectionMngr=null,n.localVideoStream=null,n.localVideoEl=null,n.remoteVideoStream=null,n.remoteVideoEl=null,n.handleCallStart=n.handleCallStart.bind(Object(h.a)(Object(h.a)(n))),n.handleCallEnd=n.handleCallEnd.bind(Object(h.a)(Object(h.a)(n))),n.handleServerUrlChange=n.handleServerUrlChange.bind(Object(h.a)(Object(h.a)(n))),n.handleSetServerClick=n.handleSetServerClick.bind(Object(h.a)(Object(h.a)(n))),n.setLocalVideoEl=n.setLocalVideoEl.bind(Object(h.a)(Object(h.a)(n))),n.setRemoteVideoEl=n.setRemoteVideoEl.bind(Object(h.a)(Object(h.a)(n))),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"handleServerUrlChange",value:function(e){this.setState({serverUrl:e})}},{key:"handleSetServerClick",value:function(){this.rtcConnectionMngr=new K(this.state.serverUrl),this.setState({isServerSet:!0})}},{key:"handleCallStart",value:function(){console.log("Call Started!"),this.rtcConnectionMngr.call()}},{key:"handleCallEnd",value:function(){console.log("Call Ended!"),console.log("...no it didn't...")}},{key:"setLocalVideoEl",value:function(e){var t=this;this.localVideoEl=e,this.rtcConnectionMngr.getLocalMediaStream().then(function(e){return t.localVideoStream=e}).then(function(){return t.localVideoEl.srcObject=t.localVideoStream})}},{key:"setRemoteVideoEl",value:function(e){var t=this;this.remoteVideoEl=e,this.rtcConnectionMngr.getRemoteMediaStream().then(function(e){return t.remoteVideoStream=e}).then(function(){return t.remoteVideoEl.srcObject=t.remoteVideoStream})}},{key:"renderSetServerUI",value:function(){var e=this,t=this.props.classes;return r.a.createElement(I.a,{container:!0,spacing:12,className:t.uiContainer,justify:"center",alignItems:"stretch"},r.a.createElement(I.a,{item:!0,xs:4},r.a.createElement(U.a,{label:"Server Url",fullWidth:!0,value:this.state.serverUrl,onChange:function(t){return e.handleServerUrlChange(t.target.value)}})),r.a.createElement(I.a,{item:!0,xs:4,className:t.doublePadded},r.a.createElement(x.a,{variant:"contained",color:"primary",onClick:this.handleSetServerClick},"Connect")))}},{key:"renderVideoChatUI",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.uiContainer},r.a.createElement(I.a,{container:!0,spacing:12,justify:"center",alignItems:"stretch"},r.a.createElement(I.a,{item:!0,xs:6,className:e.doublePadded},r.a.createElement(_,{videoName:"Local",videoRef:this.setLocalVideoEl})),r.a.createElement(I.a,{item:!0,xs:6,className:e.doublePadded},r.a.createElement(_,{videoName:"Remote",videoRef:this.setRemoteVideoEl}))),r.a.createElement(I.a,{container:!0,spacing:12,justify:"center",className:e.doublePadded},r.a.createElement(I.a,{item:!0,xs:6},this.renderVideoChatUIControlPanel())))}},{key:"renderVideoChatUIControlPanel",value:function(){var e=this,t=this.props.classes;return r.a.createElement(M.a,null,r.a.createElement(A.a,null,r.a.createElement(I.a,{container:!0,spacing:12,justify:"space-evenly",alignItems:"center"},r.a.createElement(I.a,{item:!0,xs:4,className:t.controlPanelBtnContainer},r.a.createElement(x.a,{variant:"contained",color:"primary",className:t.controlPanelBtn,onClick:function(){return e.handleCallStart()}},"Call ",r.a.createElement(D.a,{className:t.controlPanelBtnIcon},"call"))),r.a.createElement(I.a,{item:!0,xs:4,className:t.controlPanelBtnContainer},r.a.createElement(x.a,{variant:"contained",color:"primary",className:t.controlPanelBtn,onClick:function(){return e.handleCallEnd()}},"End Call ",r.a.createElement(D.a,{className:t.controlPanelBtnIcon},"call_end"))))))}},{key:"render",value:function(){return this.state.isServerSet?this.renderVideoChatUI():this.renderSetServerUI()}}]),t}(a.Component),Y=Object(m.withStyles)(function(e){return{uiContainer:{height:"100%",padding:"100px"},doublePadded:{padding:2*e.spacing.unit},controlPanelBtnContainer:{paddingRight:e.spacing.unit,paddingLeft:e.spacing.unit},controlPanelBtn:{width:"100%",height:"100%"},controlPanelBtnIcon:{marginLeft:"15px"}}})(X),Z=n(85),ee=n.n(Z),te=n(132),ne=n.n(te),ae=n(84),re=n.n(ae),ce=n(82),ie=n.n(ce),oe=n(81),se=n.n(oe),le={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},ue=function(){function e(){Object(o.a)(this,e),this.rtcConnection=new RTCPeerConnection(le),this.localConnectionData={description:null,candidates:[]},this.subscribers=new Set,this.localMediaStreamPromise=null,this.remoteMediaStreamPromise=null,this.rtcConnection.onicecandidate=this.handleIceCandidate.bind(this)}return Object(s.a)(e,[{key:"subscribe",value:function(e){this.subscribers.add(e)}},{key:"unsubscribe",value:function(e){this.subscribers.delete(e)}},{key:"notifyAll",value:function(){var e=this;this.subscribers.forEach(function(t){return t(JSON.stringify(e.localConnectionData))})}},{key:"getLocalMediaStream",value:function(){var e=Object(G.a)(W.a.mark(function e(){return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return null===this.localMediaStreamPromise&&(this.localMediaStreamPromise=new Promise(function(e,t){navigator.getUserMedia({video:!0,audio:!0},function(t){return e(t)},function(){return t(new Error("Failed to get local media stream"))})})),e.abrupt("return",this.localMediaStreamPromise);case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getRemoteMediaStream",value:function(){var e=Object(G.a)(W.a.mark(function e(){var t=this;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return null===this.remoteMediaStreamPromise&&(this.remoteMediaStreamPromise=new Promise(function(e,n){t.rtcConnection.ontrack=function(t){console.log("onRemoteTrack"),e(t.streams[0])}})),e.abrupt("return",this.remoteMediaStreamPromise);case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"createOffer",value:function(){var e=Object(G.a)(W.a.mark(function e(){var t,n,a=this;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getLocalMediaStream();case 2:return(t=e.sent).getTracks().forEach(function(e){return a.rtcConnection.addTrack(e,t)}),e.next=6,this.rtcConnection.createOffer();case 6:return n=e.sent,e.next=9,this.rtcConnection.setLocalDescription(n);case 9:this.localConnectionData.description=this.rtcConnection.localDescription,this.notifyAll();case 11:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"handleOffer",value:function(){var e=Object(G.a)(W.a.mark(function e(t){var n,a,r,c,i=this;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.description,a=t.candidates,console.log("handleOffer: ".concat(n)),e.next=4,this.rtcConnection.setRemoteDescription(n);case 4:return e.next=6,this.getLocalMediaStream();case 6:return(r=e.sent).getTracks().forEach(function(e){return i.rtcConnection.addTrack(e,r)}),e.t0=this.rtcConnection,e.next=11,this.rtcConnection.createAnswer();case 11:return e.t1=e.sent,e.next=14,e.t0.setLocalDescription.call(e.t0,e.t1);case 14:this.localConnectionData.description=this.rtcConnection.localDescription,c=0;case 16:if(!(c<a.length)){e.next=22;break}return e.next=19,this.handleRemoteIceCandidate(a[c]);case 19:c++,e.next=16;break;case 22:this.notifyAll();case 23:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handleAnswer",value:function(){var e=Object(G.a)(W.a.mark(function e(t){var n,a,r;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.description,a=t.candidates,console.log("handleAnswer: ".concat(n)),e.next=4,this.rtcConnection.setRemoteDescription(n);case 4:this.localConnectionData.description=this.rtcConnection.localDescription,r=0;case 6:if(!(r<a.length)){e.next=12;break}return e.next=9,this.handleRemoteIceCandidate(a[r]);case 9:r++,e.next=6;break;case 12:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handleIceCandidate",value:function(){var e=Object(G.a)(W.a.mark(function e(t){var n;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.candidate,console.log("handleIceCandidate: ".concat(n)),n){e.next=4;break}return e.abrupt("return");case 4:this.localConnectionData.candidates.push({candidate:n}),this.notifyAll();case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handleRemoteIceCandidate",value:function(){var e=Object(G.a)(W.a.mark(function e(t){var n;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.candidate,console.log("handleRemoteIceCandidate: ".concat(n)),n){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,this.rtcConnection.addIceCandidate(n);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),e}(),de=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={startOrAccept:null,isConnected:!1,localConnectionData:"",remoteConnectionData:""},n.rtcConnectionManager=new ue,n.rtcConnectionManager.subscribe(function(e){return n.handleLocalConnectionData(e)}),n.localVideoStream=null,n.localVideoEl=null,n.remoteVideoStream=null,n.remoteVideoEl=null,n.setLocalVideoEl=n.setLocalVideoEl.bind(Object(h.a)(Object(h.a)(n))),n.setRemoteVideoEl=n.setRemoteVideoEl.bind(Object(h.a)(Object(h.a)(n))),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"setLocalVideoEl",value:function(e){var t=this;this.localVideoEl=e,this.rtcConnectionManager.getLocalMediaStream().then(function(e){return t.localVideoStream=e}).then(function(){t.localVideoEl&&(t.localVideoEl.srcObject=t.localVideoStream)})}},{key:"setRemoteVideoEl",value:function(e){var t=this;this.remoteVideoEl=e,this.rtcConnectionManager.getRemoteMediaStream().then(function(e){return t.remoteVideoStream=e}).then(function(){t.remoteVideoEl&&(t.remoteVideoEl.srcObject=t.remoteVideoStream)})}},{key:"handleLocalConnectionData",value:function(e){this.setState({localConnectionData:e})}},{key:"handleRemoteConnectionData",value:function(e){this.setState({remoteConnectionData:e})}},{key:"handleStartOrAcceptSelection",value:function(e){this.setState({startOrAccept:e}),"start"===e&&this.rtcConnectionManager.createOffer()}},{key:"handleConnectBtnClick",value:function(){var e=this,t=JSON.parse(this.state.remoteConnectionData);try{"start"===this.state.startOrAccept?this.rtcConnectionManager.handleAnswer(t).then(function(){return e.setState({isConnected:!0})}):"accept"===this.state.startOrAccept&&this.rtcConnectionManager.handleOffer(t).then(function(){return e.setState({isConnected:!0})})}catch(n){console.error(n)}}},{key:"renderSetupConnectionUI",value:function(){var e=this.state.startOrAccept,t=this.props.classes;return r.a.createElement(I.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(I.a,{item:!0},this.renderStartOrAcceptConnectionRadioGroup()),r.a.createElement(I.a,{item:!0,className:t.offerAnswerInputContainer},e&&this.renderOfferAnswerFields()),r.a.createElement(I.a,{item:!0},e&&this.renderConnectBtn()))}},{key:"renderStartOrAcceptConnectionRadioGroup",value:function(){var e=this,t=this.state.startOrAccept,n=this.props.classes;return r.a.createElement(ie.a,{component:"fieldset"},r.a.createElement(se.a,{component:"legend",className:n.startOrAcceptFormLabel},"Start or Accept a WebRTC Connection manually"),r.a.createElement(ne.a,{row:!0,name:"start_or_accept",value:t,onChange:function(t){return e.handleStartOrAcceptSelection(t.target.value)}},r.a.createElement(re.a,{value:"start",control:r.a.createElement(ee.a,null),label:"Start a Connection",disabled:null!==t}),r.a.createElement(re.a,{value:"accept",control:r.a.createElement(ee.a,null),label:"Accept a Connection",disabled:null!==t})))}},{key:"renderConnectBtn",value:function(){var e=this,t=this.state,n=t.startOrAccept,a=t.localConnectionData,c=t.remoteConnectionData,i=t.isConnected,o=this.props.classes,s=!0;return"start"===n?s=!a||!c||i:"accept"===n&&(s=!c||i),r.a.createElement(x.a,{disabled:s,variant:"contained",color:"primary",className:o.startOrAcceptConnectBtn,onClick:function(){return e.handleConnectBtnClick()}},"Connect")}},{key:"renderOfferAnswerFields",value:function(){var e=this,t=this.state,n=t.startOrAccept,a=t.localConnectionData,c=t.remoteConnectionData,i=this.props.classes,o=r.a.createElement(U.a,{label:"".concat("start"===n?"Answer":"Offer"," - Get this from your friend!"),onChange:function(t){return e.handleRemoteConnectionData(t.target.value)},value:c,multiline:!0,rows:"1",margin:"normal",variant:"outlined",className:i.offerAnswerInput}),s=r.a.createElement(U.a,{label:"".concat("start"===n?"Offer":"Answer"," - Send this to your friend!"),disabled:!0,value:a,multiline:!0,rows:"1",margin:"normal",variant:"outlined",className:i.offerAnswerInput});return r.a.createElement(I.a,{container:!0,spacing:12,justify:"space-evenly"},r.a.createElement(I.a,{item:!0,xs:4},"start"===n&&s,"accept"===n&&o),r.a.createElement(I.a,{item:!0,xs:4},"start"===n&&o,"accept"===n&&a&&s))}},{key:"renderVideoChatUI",value:function(){var e=this.props.classes;return r.a.createElement(I.a,{container:!0,spacing:12,justify:"center",alignItems:"stretch",className:e.videoChatContainer},r.a.createElement(I.a,{item:!0,xs:6,className:e.doublePadded},r.a.createElement(_,{videoName:"Local",videoRef:this.setLocalVideoEl})),r.a.createElement(I.a,{item:!0,xs:6,className:e.doublePadded},r.a.createElement(_,{videoName:"Remote",videoRef:this.setRemoteVideoEl})))}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.root},this.renderVideoChatUI(),this.renderSetupConnectionUI())}}]),t}(a.Component),he=Object(m.withStyles)(function(e){return{root:{padding:"20px"},videoChatContainer:{paddingBottom:"30px"},startOrAcceptFormLabel:{marginBottom:"20px"},offerAnswerInputContainer:{width:"100%",marginBottom:"30px"},offerAnswerInput:{width:"100%"},doublePadded:{padding:2*e.spacing.unit}}})(de),me=Object(m.createMuiTheme)({palette:{primary:p.a,secondary:C.a}}),fe=Object.freeze({SERVER:"server",MANUAL:"manual"}),pe=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={currentTab:fe.SERVER},n.handleTabChange=n.handleTabChange.bind(Object(h.a)(Object(h.a)(n))),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"handleTabChange",value:function(e,t){this.setState({currentTab:t})}},{key:"render",value:function(){var e=this.state.currentTab;return r.a.createElement(E.a,null,r.a.createElement(m.MuiThemeProvider,{theme:me},r.a.createElement("div",{className:"App"},r.a.createElement(S.a,{position:"static"},r.a.createElement(O.a,{value:e,onChange:this.handleTabChange},r.a.createElement(w.a,{label:"Connect by Server",value:fe.SERVER}),r.a.createElement(w.a,{label:"Connect Manually",value:fe.MANUAL}))),e===fe.SERVER&&r.a.createElement(Y,null),e===fe.MANUAL&&r.a.createElement(he,null))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(348);i.a.render(r.a.createElement(pe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[138,2,1]]]);
//# sourceMappingURL=main.2651296f.chunk.js.map