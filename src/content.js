const STYLE_ID = "__monospace_everything_style__";

const CSS = `
  :root {
    --mono: ui-monospace, monospace;
  }

  body, body * {
    font-family: var(--mono);
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

const origin = location.origin;

chrome.storage.local.get({ disabledSites: [] }, (res) => {
  setState(!res.disabledSites.includes(origin));
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.disabledSites) {
    setState(!changes.disabledSites.newValue.includes(origin));
  }
});
