<script>
  export let message;

  const AUTOCLOSE_TIMEOUT = 4000;
  const HIDE_ANIMATION_DURATION = 150;
  let visible = false;
  let hide = false;

  $: if (message) {
    open();
  }

  function open() {
    visible = true;
    setTimeout(close, AUTOCLOSE_TIMEOUT);
  }

  function close() {
    hide = true;
    setTimeout(() => {
      visible = false;
      hide = false;
    }, HIDE_ANIMATION_DURATION);
  }
</script>

<div class="snackbar" class:visible class:hide>
  <div class="content">
    {message}
    <button on:click={close}>close</button>
  </div>
</div>

<style>
  :root {
    --height-snackbar: 48px;
    --width-snackbar: 360px;
  }

  .snackbar {
    position: absolute;
    left: 50%;
    bottom: 0;
    display: none;
    min-width: var(--width-snackbar);
    height: var(--height-snackbar);
    margin-block-end: 10px;
    padding-inline: 16px;
    border-radius: 4px;
    overflow: hidden;
    background-color: var(--color-secondary);
    color: var(--color-primary);
    transform: translateX(-50%);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    animation: grow ease 200ms;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .visible {
    display: flex;
  }

  .hide {
    animation: hide ease 150ms;
  }

  button {
    border: none;
    padding: unset;
    margin-inline-start: 20px;
    background: none;
    color: var(--color-accent);
    font-family: 'montserrat-700';
    cursor: pointer;
  }

  @keyframes grow {
    from {
      height: 0;
    }

    to {
      height: var(--height-snackbar);
    }
  }

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
