document.body.style.backgroundColor = '#eee';

// get current url
// check if it's in blacklist
// if yes, display image & mantra
// style it

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    '🟢🟢🟢🟢🟢',
    sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension',
  );
  console.log(request.url);
  if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye my friend 😎😎😎' });
});
