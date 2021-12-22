import { createVideo } from "./tools/video";
import observe from "./utils/observe";

window.HaCK = {
  streams: [],
  connections: [],
  glCanvases: [],
  video: null,
};
const originalGetUserMedia = navigator.mediaDevices.getUserMedia;
navigator.mediaDevices.getUserMedia = async (constraints) => {
  const result = await originalGetUserMedia.call(navigator.mediaDevices, constraints);

  window.HaCK.streams.push(result);
  return result;
};


// register webrtc connections

const OriginalRTC = RTCPeerConnection
RTCPeerConnection = function (...args) {
  const wrbRtc = new.target ? new OriginalRTC(...args) : OriginalRTC(...args);

  window.HaCK.connections.push(wrbRtc);

  return wrbRtc;
}
RTCPeerConnection.prototype = OriginalRTC.prototype;


document.createElement = observe(document.createElement, ({ result: newEl, err }, ...args) => {
  if (err) throw err;
  if (args[0]?.toLowerCase() === "canvas") {
    newEl.getContext = observe(newEl.getContext, ({ result: ctx, err }, ...args) => {
      if (err) throw err;

      if (args[0] === "webgl2") {
        const canvasData = {
          element: newEl,
          shaders: [],
        };
        const originalFuncShaderSource = ctx.shaderSource;
        ctx.shaderSource = function (...args) {
          canvasData.shaders.push({ shader: args[0], src: args[1] });
          return originalFuncShaderSource.call(this, ...args)
        }
        window.HaCK.glCanvases.push(canvasData);
      }
      return ctx;
    });
  }

  return newEl;
});

window.addEventListener('DOMContentLoaded', () => {
  // createVideo();
});


console.log("HaCK info initialized");
