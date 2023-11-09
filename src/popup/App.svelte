<script>
  import '@popup/css/main.scss';

  let url = 'testa';

  // popup.js
  document.addEventListener('DOMContentLoaded', function () {
    // Get the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // tabs[0] contains the information about the active tab
      var currentTab = tabs[0];

      // Access the URL of the active tab
      var currentUrl = currentTab.url;

      // Do something with the URL
      console.log('🔥Current URL:', currentUrl);
      url = currentUrl;
    });
  });

  chrome.runtime.sendMessage({ data: 'Handshake' }, function (response) {
    console.log('handshake', response);
  });

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const str = JSON.stringify(message.data);
    console.log('🟢listener', str, message?.url);
    // url = message?.url;
  });

  function openParams() {
    console.log('TODO');
  }
  function blockSite() {
    console.log('TODO');
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
