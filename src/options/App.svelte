<script>
  import '@common/css/main.scss';
  import Schedule from '@options/lib/Schedule.svelte';
  import Headband from '@common/lib/Headband.svelte';
  import Blacklist from '@options/lib/Blacklist.svelte';
</script>

<main>
  <div class="options">
    <Headband>
      <span slot="title">
        <h1>BlockSiteZen</h1>
      </span>
    </Headband>

    <h2>Blocked urls</h2>
    <div class="blacklist">
      <Blacklist />
    </div>

    <h2>When ?</h2>
    <Schedule />
  </div>
</main>

<style>
  main {
    height: 100%;
    /* background-color: var(--background-color-tertiary);
    color: var(--color-primary); */
  }

  .blacklist {
    margin-inline: 20px;
  }

  .options {
    /* max-width: var(--max-width-page-options); */
  }
</style>
