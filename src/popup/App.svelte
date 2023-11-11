<script>
  import '@popup/css/main.scss';
  import ChromeStorage from '@options/js/ChromeStorage';

  let url;

  document.addEventListener('DOMContentLoaded', function () {
    // Get the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let currentTab = tabs[0];
      url = currentTab.url;
      console.log('🔥Current URL:', url);
    });
  });

  chrome.runtime.sendMessage({ data: 'Handshake' }, function (response) {
    console.log('handshake', response);
  });
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('🟢listener', message.data, message?.url);
  });

  function openParams() {
    console.log('TODO');
  }
  function blockSite() {
    console.log('TODO');
    ChromeStorage.set('urlbis', url);
  }
  function editBlockList() {
    console.log('TODO');
  }
</script>

<main>
  <h1>BlockSiteZen</h1>
  <div>url:{url}</div>
  <button class="icon" on:click={openParams}>⚙️</button>
  <button class="primary" on:click={blockSite}>Block this site</button>
  <button on:click={editBlockList}>Edit block list</button>
</main>
