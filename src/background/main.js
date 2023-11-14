chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    console.log('background.js 😎 ', tab.url);

    // inject content.js
    // chrome.scripting
    //   .executeScript({
    //     target: { tabId: tabId },
    //     files: ['./content.js'],
    //   })
    //   .then(() => {
    //     console.log('INJECTED THE CONTENT SCRIPT 🔥🔥🔥');
    //     let url = '';

    //     (async () => {
    //       const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    //       url = tab.url;

    //       const response = await chrome.tabs.sendMessage(tab.id, {
    //         greeting: 'hello',
    //         url,
    //       });
    //       // do something with response here, not outside the function
    //       console.log('🟢', response);
    //     })();

    //     chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //       chrome.runtime.sendMessage({ data: 'datax', url }, function (response) {});
    //       //alert(message.data);
    //     });
    //   });
  }
});

// REDIRECT FOCUS
chrome.runtime.onMessage.addListener(function (request, sender) {
  console.log(request.redirect, '⭐️');
  if (request?.redirect) {
    chrome.tabs.update(sender.tab.id, { url: request.redirect });
  }
});
