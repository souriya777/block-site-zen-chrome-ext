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
    /* position: absolute; */
    position: fixed;
    left: 50%;
    bottom: 0;
    display: flex;
    height: 0;
    margin-block-end: 10px;
    border-radius: 4px;
    overflow: hidden;
    background-color: var(--color-snackbar);
    color: var(--color-snackbar-text);
    transform: translateX(-50%);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .visible {
    height: var(--height-snackbar);
    padding: 6px 16px;
    transition: height 200ms cubic-bezier(0, 0.7, 0.26, 0.95);
  }

  .hide {
    animation: hide ease 150ms;
  }

  button {
    border: none;
    min-width: 48px;
    padding: unset;
    margin-inline-start: 20px;
    background: none;
    color: var(--color-accent);
    font-family: 'montserrat-700';
    cursor: pointer;
  }

  button:hover {
    color: var(--color-accent-3);
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
