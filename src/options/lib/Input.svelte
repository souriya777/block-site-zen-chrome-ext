<script>
  import { isNotEmpty } from '@common/js/string-utils';
  import ExclamationSvg from '@common/lib/ExclamationSvg.svelte';

  export let value;
  export let placeholder;
  export let size = 24;
  export let handleChange;
  export let errorMsg;
  export let timestamp;

  let input;

  $: if (timestamp) {
    input.focus();
  }
</script>

<div class="input">
  <div class="container">
    <input
      type="text"
      class:error={isNotEmpty(errorMsg)}
      bind:this={input}
      bind:value
      {placeholder}
      {size}
      on:keyup={handleChange}
    /><span class="icon"><slot name="icon-svg" /></span>
  </div>
  {#if errorMsg}
    <span class="error-msg"><ExclamationSvg />{errorMsg}</span>
  {/if}
</div>

<style>
  :root {
    --transition: ease 250ms;
  }

  :global(.input .icon svg) {
    display: flex;
  }

  :global(.input .error-msg svg) {
    height: 16px;
    width: 16px;
    margin-inline-end: 4px;
  }

  .container {
    background-color: var(--color-primary);
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .container .icon {
    order: 1;
  }

  .container input {
    order: 2;
  }

  input {
    flex-grow: 1;
    height: 40px;
    border: 1px solid transparent;
    text-indent: 28px;
    transition: all var(--transition);
  }

  input:hover {
    border-color: var(--color-accent);
  }

  input:focus {
    text-indent: 10px;
    outline: none;
    border-color: var(--color-accent);
    transition: all var(--transition);
  }

  .icon {
    position: absolute;
    margin-inline-start: 2px;
    fill: var(--color-discret);
    transition: all var(--transition);
  }

  input:focus + .icon {
    opacity: 0;
    transform: translateX(-4px);
    transition: opacity transform ease-in-out 50ms;
  }

  input.error {
    border-color: var(--color-error);
  }

  .error-msg {
    position: absolute;
    display: flex;
    align-items: center;
    margin-block-start: 4px;
    color: var(--color-error);
    fill: var(--color-error);
    font-size: 12px;
  }
</style>
