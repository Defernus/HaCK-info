# HaCK info

Chrome extension to view site information in console

## TL;DR install

Go to [chrome://extensions/](chrome://extensions/) -> click 'Load unpacked' button -> select the root folder of the project

## Using

Extension creates global 'HaCK' variable with all info
```typescript
const HaCK: {
  connections: RTCPeerConnection[]; // all webrtc connections
  streams: MediaStream[]; // all requested camera streams
  glCanvases: {
    element: HTMLCanvasElement; // created all canvas elements with webgl2 context,
    shaders: { // all shaders
      shader: WebGLShader;
      src: string; // shader sources
    }[];
  }[];
};
```
