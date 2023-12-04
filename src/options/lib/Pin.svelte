<script>
  import { removePin, savePin } from '@common/js/pin-utils';
  import { pin } from '@common/js/store';
  import { isEmpty } from '@common/js/string-utils';
  import ValidLockForm from '@options/lib/ValidLockForm.svelte';
</script>

<div class="pin">
  <div class="container">
    <div class="container__header"><h3>PIN</h3></div>
    <div class="container__content">
      <!-- TO DEBUG -->
      <!-- pin:{JSON.stringify($pin)} -->
      {#if isEmpty($pin)}
        <ValidLockForm validate={savePin} />
      {:else}
        <p class="empty">Pin is already set</p>
        <button class="normal primary" on:click={removePin}>
          <span class="summary">Remove!</span>
          <span class="detail">Remove the PIN</span>
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .empty {
    margin-block-end: var(--space-m);
    font-style: italic;
  }
</style>
