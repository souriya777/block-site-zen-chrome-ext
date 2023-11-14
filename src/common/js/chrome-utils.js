async function currentUrl() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  console.log(tab.url);

  return tab.url;
}

export { currentUrl };
