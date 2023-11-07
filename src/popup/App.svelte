<script>
  import '@popup/css/main.scss';

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
  <button class="icon" on:click={openParams}>⚙️</button>
  <button class="primary" on:click={blockSite}>Block this site</button>
  <button on:click={editBlockList}>Edit block list</button>
</main>
