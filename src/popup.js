const toggleEl = document.getElementById("toggle");

async function getCurrentOrigin() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return new URL(tab.url).origin;
}

let currentOrigin;

(async () => {
  currentOrigin = await getCurrentOrigin();
  chrome.storage.local.get({ disabledSites: [] }, (res) => {
    toggleEl.checked = !res.disabledSites.includes(currentOrigin);
  });
})();

toggleEl.addEventListener("change", () => {
  chrome.storage.local.get({ disabledSites: [] }, (res) => {
    const updated = toggleEl.checked
      ? res.disabledSites.filter(o => o !== currentOrigin)
      : [...res.disabledSites, currentOrigin];
    chrome.storage.local.set({ disabledSites: updated });
  });
});
