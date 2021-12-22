
const initExtention = () => {
  const script = document.createElement("script");
  script.textContent = SOURCES; // will be pasted at build time
  script.id = "HaCK-info";
  
  document.head.appendChild(script);
};


document.addEventListener('readystatechange', (event) => {
  if (document.readyState === "interactive") {
    initExtention();
  }
});
