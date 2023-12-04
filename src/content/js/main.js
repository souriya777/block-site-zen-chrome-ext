import { get } from 'svelte/store';
import ChromeLocalStorage from '@common/js/ChromeLocalStorage';
import { isInBlockedPeriod } from '@common/js/interval-utils';
import { isBlacklisted } from '@common/js/blacklist-utils';
import { intervals, week } from '@common/js/store';
import { extractDomain } from '@common/js/string-utils';
import { incrementStat } from '@common/js/stats-utils';

// console.log('🙏CONTENT.JS...');

ChromeLocalStorage.get('blacklist').then(() => {
  const domain = extractDomain(window.location.href);
  // stats
  incrementStat(domain);

  // blacklist
  const blacklisted = isBlacklisted(window.location.href);
  const inBlockedPeriod = isInBlockedPeriod(get(week), get(intervals));

  if (blacklisted && inBlockedPeriod) {
    ChromeLocalStorage.set('currentUrl', window.location.href);

    // redirect
    const optionUrl = 'chrome-extension://' + chrome.runtime.id + '/focus.html';
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
