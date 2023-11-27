import ChromeLocalStorage from '@common/js/ChromeLocalStorage';
import { isInBlockedPeriod } from '@common/js/interval-utils';
import { isBlacklisted } from '@common/js/blacklist-utils';
import { intervals, week } from '@common/js/store';
import { get } from 'svelte/store';

// console.log('🙏CONTENT.JS...');

ChromeLocalStorage.get('blacklist').then(() => {
  const blacklisted = isBlacklisted(window.location.href);
  // console.log('blacklisted?', blacklisted);
  const inBlockedPeriod = isInBlockedPeriod(get(week), get(intervals));
  // console.log('in blocked period?', isInBlockedPeriod(get(week), get(intervals)));

  if (blacklisted && inBlockedPeriod) {
    ChromeLocalStorage.set('currentUrl', window.location.href);

    const optionUrl = 'chrome-extension://' + chrome.runtime.id + '/focus.html';
    // console.log(optionUrl);
    chrome.runtime.sendMessage({ redirect: optionUrl });
  }
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(
//     '🟢🟢🟢🟢🟢',
//     sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension',
//   );
//   console.log(request.url);
//   if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye my friend 😎😎😎' });
// });
