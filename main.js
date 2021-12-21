const initExtention = () => {
  const script = document.createElement("script");
  script.textContent = `
    {
      window.HaCK = {
        streams: [],
        connections: [],
        glCanvases: [],
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

        console.log("creating RTCPeerConnection with args:", wrbRtc);
        return wrbRtc;
      }
      RTCPeerConnection.prototype = OriginalRTC.prototype;


      const originalFuncCreateElement = document.createElement;
      document.createElement = function (...args) {
        const newEl = originalFuncCreateElement.call(this, ...args);

        if (args[0]?.toLowerCase() === "canvas") {

          const originalFuncGetContext = newEl.getContext;
          newEl.getContext = function (...args) {
            const ctx = originalFuncGetContext.call(this, ...args);
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
          }
        }

        return newEl;
      }

      console.log("HaCK info initialized");
    }
  `;
  script.id = "test-script";
  
  document.head.appendChild(script);
};


document.addEventListener('readystatechange', (event) => {
  if (document.readyState === "interactive") {
    initExtention();
  }
});
