<script>
  import { createEventDispatcher } from 'svelte';
  import { addToBlacklist } from '@common/js/store';
  import PlusCircle from '@common/lib/PlusCircleSvg.svelte';
  import Input from '@options/lib/Input.svelte';
  import { isValidUrl } from '@common/js/string-utils';
  import { getTimestamp } from '@common/js/svelte-utils';

  const dispatch = createEventDispatcher();
  let currentUrl = '';
  let errorMsg;
  let timestamp;

  function handleChangeUrl(value) {
    currentUrl = value;

    if (errorMsg) {
      if (isValidUrl(currentUrl)) {
        errorMsg = '';
      }
    }
  }

  function handleAddUrl() {
    if (!isValidUrl(currentUrl)) {
      errorMsg = 'url is invalid';
      timestamp = getTimestamp();
      return;
    }

    addToBlacklist(currentUrl);
    dispatch('addSuccess', {
      url: currentUrl,
    });
    currentUrl = '';
  }
</script>

<form on:submit|preventDefault>
  <Input
    placeholder="facebook.com"
    size={40}
    value={currentUrl}
    callbackValue={handleChangeUrl}
    {errorMsg}
    {timestamp}
  >
    <span slot="icon-svg">
      <PlusCircle />
    </span>
  </Input>
  <button class="normal primary" on:click={handleAddUrl}>
    <span class="summary">Add!</span>
    <span class="detail">Add to blacklist</span>
  </button>
</form>

<style>
  form {
    display: flex;
  }

  button {
    margin-inline-start: 10px;
  }
</style>
