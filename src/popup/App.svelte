<script>
  import '@popup/css/main.scss';
  import { addToBlacklist, blacklist } from '@common/js/store';
  import { currentUrl } from '@common/js/chrome-utils';
  import Logo from '@common/lib/Logo.svelte';

  let url;

  document.addEventListener('DOMContentLoaded', function () {
    currentUrl().then((result) => (url = result));
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
    console.log('block this site', url, $blacklist);
    addToBlacklist(url);
  }
  function editBlockList() {
    console.log('TODO');
  }
</script>

<main>
  <h1>BlockSiteZen</h1>
  <Logo />
  <div>url:{url}</div>
  <button class="icon" on:click={openParams}>⚙️</button>
  <button class="primary" on:click={blockSite}>Block this site</button>
  <button on:click={editBlockList}>Edit block list</button>
</main>
