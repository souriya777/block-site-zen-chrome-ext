<script>
  import '@common/css/main.scss';
  import ChromeLocalStorage from '@common/js/ChromeLocalStorage';
  import { getOptionsUrl } from '@common/js/chrome-utils';
  import { extractDomain } from '@common/js/string-utils';
  import Headband from '@common/lib/Headband.svelte';

  const IMGS = [
    {
      img: 'old-man.jpeg',
      credit: `Photo by <a href="https://unsplash.com/fr/@alesdusa?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Ales Dusa</a> on <a href="https://unsplash.com/fr/photos/photo-en-niveaux-de-gris-dun-homme-en-veste-noire-7SXZlKDj22E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Unsplash</a>
  `,
    },
    {
      img: 'patrick-smokes.jpg',
      credit: `Photo by <a href="https://unsplash.com/fr/@worldsbetweenlines?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Patrick Hendry</a> on <a href="https://unsplash.com/fr/photos/uomo-che-fuma-sigaretta-jCimF7LYlKE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Unsplash</a>
  `,
    },
    {
      img: 'jose-look.jpg',
      credit: `Photo by <a href="https://unsplash.com/fr/@jcmu?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Jose Murillo</a> on <a href="https://unsplash.com/fr/photos/foto-em-tons-de-cinza-de-homem-usando-gorro-em-frente-a-parede-de-concreto-e-entre-duas-plantas-de-folhas-lineares-MlyYDrdR8UU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank">Unsplash</a>
  `,
    },
  ];
  const MANTRAS = [
    {
      quote: `Focusing is about saying No.`,
      author: 'Steve Jobs',
    },
    {
      quote: `Practice is the best of all instructos.`,
      author: 'Publilius Syrus',
    },
    {
      quote: `Knowledge will give you power, but character respect.`,
      author: 'Bruce Lee',
    },
    {
      quote: `Powerful indeed is the empire of habits.`,
      author: 'Publilius Syrus',
    },
    {
      quote: `No gains without pains.`,
      author: 'Benjamin Franklin',
    },
    {
      quote: `Lost time is never found again.`,
      author: 'Benjamin Franklin',
    },
  ];

  let url;

  ChromeLocalStorage.get('currentUrl').then(
    (result) => (url = extractDomain(result['currentUrl'])),
  );

  $: indexMantra = Math.floor(Math.random() * MANTRAS.length);
  $: quote = MANTRAS.at(indexMantra).quote;
  $: author = MANTRAS.at(indexMantra).author;

  $: indexImg = Math.floor(Math.random() * IMGS.length);
  $: img = IMGS.at(indexImg).img;
  $: credit = IMGS.at(indexImg).credit;

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
    color: var(--color-accent);
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
    color: var(--color-primary);
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
    color: var(--color-accent);
  }

  .credit {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: var(--color-discret);
  }
</style>
