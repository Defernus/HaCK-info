import applyStyles from "../utils/apply-styles";
import makeDragable from "../utils/make-dragable";

const wrapperStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
  width: "300px",
  border: "1px black dashed",
  zIndex: "99999999",
  opacity: "0.5",
  transition: "opacity 0.2s easy-in-out",
};

const videoStyles = {
  objectFit: "contain",
  maxWidth: "100%",
};

export const createVideo = () => {
  const wrapper = document.createElement("div");
  const video = document.createElement("video");

  wrapper.id = "HaCK-video";

  applyStyles(wrapper, wrapperStyle);
  applyStyles(video, videoStyles);

  wrapper.appendChild(video);

  makeDragable(wrapper);
  
  document.body.appendChild(wrapper);
  window.HaCK.video = video;
};
