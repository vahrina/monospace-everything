const toggleEl = document.getElementById("toggle");

chrome.storage.local.get({ enabled: true }, (res) => {
  toggleEl.checked = res.enabled;
});

toggleEl.addEventListener("change", () => {
  chrome.storage.local.set({ enabled: toggleEl.checked });
});
