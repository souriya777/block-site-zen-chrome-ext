<script>
  import { addToBlacklist } from '@common/js/store';
  import PlusCircle from '@common/lib/PlusCircle.svelte';
  import Input from '@options/lib/Input.svelte';
  import { isValidUrl } from '@common/js/string-utils';

  let currentUrl = '';
  let errorMsg;
  let timestamp;

  function handleChangeUrl(e) {
    currentUrl = e.target.value;

    if (errorMsg) {
      if (isValidUrl(currentUrl)) {
        errorMsg = '';
      }
    }
  }

  function handleAddUrl() {
    if (!isValidUrl(currentUrl)) {
      errorMsg = 'url is invalid';
      timestamp = new Date().getTime();
      return;
    }

    addToBlacklist(currentUrl);
  }
</script>

<form on:submit|preventDefault>
  <Input
    placeholder="facebook.com"
    size={40}
    value={currentUrl}
    handleChange={handleChangeUrl}
    {errorMsg}
    {timestamp}
  >
    <span slot="icon-svg">
      <PlusCircle />
    </span>
  </Input>
  <button class="primary normal" on:click={handleAddUrl}>add</button>
</form>

<style>
  form {
    display: flex;
  }

  button {
    margin-inline-start: 10px;
  }
</style>
