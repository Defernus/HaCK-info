const applyStyles = (element, style) => {
  Object.entries(style).forEach(([key, val]) => {
    element.style[key] = val;
  });
};

export default applyStyles;
