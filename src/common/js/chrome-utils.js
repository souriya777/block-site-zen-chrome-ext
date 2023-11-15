async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  return tab;
}

async function currentUrlAndFavicon() {
  const tab = await getCurrentTab();

  return {
    url: tab.url,
    faviconUrl: tab.favIconUrl,
  };
}

async function closeCurrentTab() {
  const tab = await getCurrentTab();
  chrome.tabs.remove(tab.id, function () {});
}

function getOptionsUrl() {
  return 'chrome-extension://' + chrome.runtime.id + '/options.html';
}

export { currentUrlAndFavicon, closeCurrentTab, getOptionsUrl };
