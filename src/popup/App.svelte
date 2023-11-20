<script>
  import '@common/css/main.scss';
  import '@popup/css/main.scss';
  import { addToBlacklist } from '@common/js/store';
  import { closeCurrentTab, currentUrlAndFavicon, getOptionsUrl } from '@common/js/chrome-utils';
  import { extractDomain, isValidUrl } from '@common/js/string-utils';
  import LogoSvg from '@common/lib/LogoSvg.svelte';
  import SettingsSvg from '@common/lib/SettingsSvg.svelte';

  let url;
  let domain;
  $: isPageValid = isValidUrl(url);

  chrome.runtime.sendMessage(
    {
      data: 'Handshake',
    },

    function (response) {
      console.log('handshake', response);
    },
  );

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('🟢listener', message.data, message?.url);
  });

  function openParams() {
    window.open(getOptionsUrl(), '_blank');
  }

  async function blockSite() {
    addToBlacklist(domain);
    closeCurrentTab();
  }

  document.addEventListener('DOMContentLoaded', function () {
    currentUrlAndFavicon().then((result) => {
      url = result.url;
      domain = extractDomain(url);
    });
  });
</script>

<main>
  <div class="headband">
    <span class="logo"><LogoSvg /></span><span class="brand">BlockSiteZen</span><button
      class="icon"
      on:click|preventDefault={openParams}><SettingsSvg /></button
    >
  </div>

  <div class="content">
    {#if isPageValid}
      <div class="msg">
        <span class="url">{domain}</span>is not blocked.
      </div>
      <div class="action">
        <button class="normal primary" on:click={blockSite}>Block this site</button>
      </div>
    {:else}
      <div class="msg">Unavailable on this page.</div>
    {/if}
  </div>
</main>

<style>
  :root {
    --padding-inline: 10px;
  }

  :global(.logo svg) {
    height: 32px;
    width: 32px;
  }

  main {
    width: 280px;
    background-color: var(--background-color-secondary);
    color: var(--color-primary);
  }

  .headband {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 12px;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding-block: 16px 24px;
    background-color: var(--background-color-tertiary);
  }

  .brand {
    display: flex;
    align-items: center;
    font-family: 'montserrat-700';
    font-size: 18px;
  }

  .url {
    color: var(--color-primary);
    font-family: 'montserrat-700';
  }

  .msg {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
  }

  .action {
    margin-block-start: 28px;
    margin-inline: auto;
    font-size: 16px;
  }

  .headband,
  .content {
    padding-inline: var(--padding-inline);
  }
</style>
