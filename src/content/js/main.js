import { isBlacklisted } from '@common/js/store';
import ChromeLocalStorage from '@common/js/ChromeLocalStorage';

console.log('🙏CONTENT.JS...');

ChromeLocalStorage.get('blacklist').then(() => {
  const blacklisted = isBlacklisted(window.location.href);
  console.log('blacklisted?', blacklisted);
  // document.body.style.borderColor = 'hotpink';
  // document.body.style.borderWidth = '4px';
  // document.body.style.borderStyle = 'dashed';

  if (blacklisted) {
    ChromeLocalStorage.set('currentUrl', window.location.href);

    const optionUrl = 'chrome-extension://' + chrome.runtime.id + '/focus.html';
    console.log(optionUrl);
    chrome.runtime.sendMessage({ redirect: optionUrl });
  }
});

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
