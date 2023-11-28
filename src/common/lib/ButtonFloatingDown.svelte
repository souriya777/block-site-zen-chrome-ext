<script>
  import ArrowDownSvg from '@common/lib/ArrowDownSvg.svelte';
</script>

<button class="button-floating-down" on:click><ArrowDownSvg /></button>

<style>
  :root {
    --height: 46px;
  }

  button {
    position: absolute;
    bottom: 16px;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-50%);
    height: var(--height);
    width: var(--height);
    border: none;
    border-radius: 50px;
    background-color: var(--color-discret-2);
    fill: var(--color-accent-3);
    transition: var(--transition-button);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--color-accent-transparent-2);
  }
</style>
