(() => {
  const src = chrome.runtime.getURL('content.js');
  import(src);
})();
