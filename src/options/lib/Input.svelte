<script>
  import ExclamationSvg from '@common/lib/ExclamationSvg.svelte';

  export let value;
  export let placeholder;
  export let size = 24;
  export let handleChange;
  export let errorMsg;
</script>

<div class="input">
  <div class="container">
    <input type="text" bind:value {placeholder} {size} on:keyup={handleChange} /><span class="icon"
      ><slot name="icon" /></span
    >
  </div>
  {#if errorMsg}
    <span class="error"><ExclamationSvg />{errorMsg}</span>
  {/if}
</div>

<style>
  :root {
    --transition: ease 250ms;
  }

  :global(.icon svg) {
    display: flex;
  }

  :global(.error svg) {
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

  .error {
    position: absolute;
    display: flex;
    align-items: center;
    margin-block-start: 4px;
    color: var(--color-error);
    fill: var(--color-error);
    font-size: 12px;
  }
</style>
