# HaCK info

Chrome extension to view site information in console

## TL;DR install:

install dependencies: `npm i`. Then build extension: `npm run build`.  
Go to [chrome://extensions/](chrome://extensions/) -> click 'Load unpacked' button -> select `dist/result` folder in the project

## How to use:

Extension creates global 'HaCK' variable with all info
```typescript
type HaCK = {
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

## Progress

- [x] Store webrtc connections
- [x] Store shaders sources
- [ ] Store all streams
  - [x] camera streams
  - [ ] remote streams
  - [ ] display media stream
- [ ] Viewer tool (view stream content)
- [ ] Add tools to track different events on page (e.g. trigger a custom function when the site accesses the camera)
