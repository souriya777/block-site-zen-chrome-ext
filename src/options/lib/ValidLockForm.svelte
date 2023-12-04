<script>
  import { authorizationToken } from '@common/js/store';

  export let validate;
  let first, second, third, fourth, fifth, sixth;

  let error = false;

  $: if (error) {
    resetValues();
  }

  function resetValues() {
    first = '';
    second = '';
    third = '';
    fourth = '';
    fifth = '';
    sixth = '';
  }

  function handleChange() {
    if (error) {
      error = false;
    }
  }

  function valid() {
    error = !validate(first, second, third, fourth, fifth, sixth);
    $authorizationToken = !error;
  }
</script>

<form on:submit|preventDefault class:error>
  <div class="title">
    <slot name="title" />
  </div>

  <div class="pin">
    <input
      type="text"
      size="1"
      maxlength="1"
      bind:value={first}
      on:keyup={handleChange}
      on:change={handleChange}
    />
    <input
      type="text"
      size="1"
      maxlength="1"
      bind:value={second}
      on:keyup={handleChange}
      on:change={handleChange}
    />
    <input
      type="text"
      size="1"
      maxlength="1"
      bind:value={third}
      on:keyup={handleChange}
      on:change={handleChange}
    />
    <input
      type="text"
      size="1"
      maxlength="1"
      bind:value={fourth}
      on:keyup={handleChange}
      on:change={handleChange}
    />
    <input
      type="text"
      size="1"
      maxlength="1"
      bind:value={fifth}
      on:keyup={handleChange}
      on:change={handleChange}
    />
    <input
      type="text"
      size="1"
      maxlength="1"
      bind:value={sixth}
      on:keyup={handleChange}
      on:change={handleChange}
    />
  </div>

  <div class="msg">The pin is incorrect.</div>

  <div class="action">
    <button class="normal primary" on:click={valid}>
      <span class="summary">Confirm!</span>
      <span class="detail">Confirm the PIN</span>
    </button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
  }

  input {
    text-align: center;
  }

  .title {
    margin-block-end: 18px;
  }

  .pin {
    margin-block-end: 14px;
  }

  .action {
    margin-block-start: 20px;
  }

  .title,
  .pin {
    font-family: 'montserrat-700';
    font-size: 34px;
  }

  .msg {
    visibility: hidden;
    color: var(--color-error);
  }

  form.error .msg {
    visibility: visible;
  }

  form.error input {
    outline-color: var(--color-error);
    border: 2px solid var(--color-error);
    border-radius: 4px;
  }
</style>
