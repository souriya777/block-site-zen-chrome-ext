<script>
  import '@common/css/main.scss';
  import ChromeLocalStorage from '@common/js/ChromeLocalStorage';
  import { getOptionsUrl } from '@common/js/chrome-utils';
  import { extractDomain } from '@common/js/string-utils';
  import Headband from '@common/lib/Headband.svelte';
  import FOCUS_IMGS from '@common/js/FOCUS_IMGS';
  import FOCUS_MANTRAS from '@common/js/FOCUS_MANTRAS';

  let url;

  ChromeLocalStorage.get('currentUrl').then(
    (result) => (url = extractDomain(result['currentUrl'])),
  );

  $: indexMantra = Math.floor(Math.random() * FOCUS_MANTRAS.length);
  $: quote = FOCUS_MANTRAS.at(indexMantra).quote;
  $: author = FOCUS_MANTRAS.at(indexMantra).author;

  $: indexImg = Math.floor(Math.random() * FOCUS_IMGS.length);
  $: img = FOCUS_IMGS.at(indexImg).img;
  $: credit = FOCUS_IMGS.at(indexImg).credit;

  function gotoOptions() {
    window.location.href = getOptionsUrl();
  }
</script>

<main>
  <div class="background" style={`background-image: url(/img/${img});`}></div>
  <div class="foreground">
    <Headband>
      <span slot="title"> This site is blocked by BlockSiteZen </span>
      <span slot="action">
        <button class="normal" on:click={gotoOptions}>Go settings</button>
      </span>
    </Headband>
    <div class="content">
      <div class="mantra">{quote}</div>
      <div class="author">{author}</div>
      <div class="reason">
        Will <span class="url">{url}</span> help you achieve your goals ?
      </div>
    </div>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <div class="credit">{@html credit}</div>
  </div>
</main>

<style>
  :global(body) {
    font-family: 'montserrat-400', sans-serif;
  }

  :global(.credit a) {
    color: inherit;
  }

  :global(.credit a:hover) {
    color: var(--color-primary);
  }

  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    background-size: cover;
    filter: brightness(60%);
    transition: background 0.5s linear 0s;
    z-index: -1;
  }

  .foreground {
    position: absolute;
    width: 100%;
    height: 100%;
    color: var(--color-on-primary);
  }

  .content {
    max-width: 618px;
    margin: 42px 59px;
  }

  .mantra {
    font-family: 'montserrat-700';
    font-size: 80px;
    word-spacing: 4px;
    line-height: 1.1;
    overflow-wrap: break-word;
  }

  .author {
    font-size: 16px;
  }

  .reason {
    padding-block-start: 32px;
    font-size: 22px;
    line-height: 1.2;
  }

  .url {
    color: var(--color-primary);
  }

  .credit {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: var(--color-discret);
  }
</style>
