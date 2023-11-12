// document.body.style.backgroundColor = '#eee';
// document.body.style.borderStyle = '4px dashed hotpink;';
document.body.style.borderColor = 'hotpink';
document.body.style.borderWidth = '4px';
document.body.style.borderStyle = 'dashed';

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
