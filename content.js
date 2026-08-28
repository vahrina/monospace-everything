const STYLE_ID = "__monospace_everything_style__";

const CSS = `
  *:not(.material-icons):not([class*="icon"]):not([class*="fa-"]) {
    font-family: monospace !important;
  }
`;

function applyStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  (document.head || document.documentElement).appendChild(style);
}

function removeStyle() {
  const style = document.getElementById(STYLE_ID);
  if (style) style.remove();
}

function setState(enabled) {
  if (enabled) applyStyle();
  else removeStyle();
}

chrome.storage.local.get({ enabled: true }, (res) => {
  setState(res.enabled);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.enabled) {
    setState(changes.enabled.newValue);
  }
});
