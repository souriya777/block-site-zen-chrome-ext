<script>
  import { createEventDispatcher } from 'svelte';
  import BinSvg from '@common/lib/BinSvg.svelte';

  export let url;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click', {
      url,
    });
  }
</script>

<div class="url">{url}</div>
<button class="icon primary" on:click={handleClick}>
  <BinSvg />
</button>

<style>
  .url {
    max-width: 88%;
    overflow-x: scroll;
  }
</style>
