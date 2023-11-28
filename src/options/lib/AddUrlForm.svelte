<script>
  import { createEventDispatcher } from 'svelte';
  import PlusCircle from '@common/lib/PlusCircleSvg.svelte';
  import Input from '@options/lib/Input.svelte';
  import { isValidUrl } from '@common/js/string-utils';
  import { getTimestamp } from '@common/js/svelte-utils';
  import { addToBlacklist } from '@common/js/blacklist-utils';

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

    try {
      addToBlacklist(currentUrl);

      dispatch('addSuccess', {
        url: currentUrl,
      });
      currentUrl = '';
    } catch (e) {
      errorMsg = `${currentUrl} already blacklisted!`;
      timestamp = getTimestamp();
    }
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
    justify-content: space-between;
  }

  button {
    margin-inline-start: 10px;
  }
</style>
