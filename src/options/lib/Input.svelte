<script>
  import { isNotEmpty } from '@common/js/string-utils';
  import ExclamationSvg from '@common/lib/ExclamationSvg.svelte';
  import CrossSvg from '@common/lib/CrossSvg.svelte';

  export let value;
  export let placeholder;
  export let size = 24;
  export let callbackValue;
  export let errorMsg = '';
  export let timestamp;
  export let canClear = false;

  let input;

  $: if (isNotEmpty(value)) {
    callbackValue(value);
  }

  $: if (timestamp && input) {
    input.focus();
  }

  function clear() {
    value = '';
    input.focus();
  }

  function handleChange(e) {
    if (e?.target?.value) {
      callbackValue(e.target.value);
    }
  }
</script>

<div class="input">
  <div class="container">
    <input
      type="text"
      class:error={isNotEmpty(errorMsg)}
      class:canClear
      bind:this={input}
      bind:value
      {placeholder}
      {size}
      on:keyup={handleChange}
      on:change={handleChange}
    />
    <span class="input__icon">
      <slot name="icon-svg" />
    </span>
    {#if canClear}
      <span class="input__icon close">
        <button class="icon secondary" on:click={clear}>
          <CrossSvg />
        </button>
      </span>
    {/if}
  </div>
  {#if errorMsg}
    <span class="error-msg"><ExclamationSvg />{errorMsg}</span>
  {/if}
</div>

<style>
  :root {
    --transition: ease 250ms;
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

  .container .input__icon {
    order: 1;
  }

  .container input {
    order: 2;
  }

  input {
    flex-grow: 1;
    height: var(--height-input);
    border: 1px solid transparent;
    text-indent: 28px;
    transition: all var(--transition);
  }

  input:hover {
    border-color: var(--color-primary);
  }

  input:focus {
    text-indent: 10px;
    outline: none;
    border-color: var(--color-primary);
    transition: all var(--transition);
  }

  .input__icon {
    position: absolute;
    margin-inline-start: 2px;
    fill: var(--color-discret);
    transition: all var(--transition);
  }

  .input__icon.close {
    right: 6px;
  }

  input:focus + .input__icon {
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

  .canClear {
    padding-inline-end: 38px;
  }
</style>
