<script>
  import '@focus/css/modern-reset.scss';
  import '@focus/css/fonts.scss';

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

  let url = 'fast.com';

  $: indexMantra = Math.floor(Math.random() * MANTRAS.length);
  $: quote = MANTRAS.at(indexMantra).quote;

  $: indexImg = Math.floor(Math.random() * IMGS.length);
  $: img = IMGS.at(indexImg).img;
  $: credit = IMGS.at(indexImg).credit;

  function gotoOptions() {
    window.location.href = 'chrome-extension://' + chrome.runtime.id + '/options.html';
  }
</script>

<main>
  <div class="background" style={`background-image: url(/img/${img});`}></div>
  <div class="foreground">
    <div class="headband">
      <div class="info">LOGO This site is blocked by BlockSiteZen</div>
      <button class="goto" on:click={gotoOptions}>Go settings</button>
    </div>
    <div class="content">
      <div class="mantra">{quote}</div>
      <div class="reason">
        Will <span class="url">{url}</span> help you achieve your goals ?
      </div>
    </div>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <div class="credit">{@html credit}</div>
  </div>
</main>

<style>
  :root {
    --color-accent: hotpink;
    --color-discret: #cccccc;
  }

  :global(body) {
    font-family: 'montserrat-400', sans-serif;
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
    color: #fff;
  }

  .headband {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 56px;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 14px;
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

  .reason {
    padding-block-start: 32px;
    font-size: 22px;
    line-height: 1.2;
  }

  .url {
    color: var(--color-accent);
  }

  .goto {
    background-color: #8f8f8f;

    border: none;
    padding: 8px 20px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color ease 300ms;
  }

  .goto:hover {
    background-color: var(--color-discret);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transition: all ease 300ms;
  }

  .credit {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: var(--color-discret);
  }

  :global(.credit a) {
    color: inherit;
  }

  :global(.credit a:hover) {
    color: var(--color-accent);
  }
</style>
