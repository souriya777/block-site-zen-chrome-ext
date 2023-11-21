<script>
  import '@common/css/main.scss';
  import LogoSvg from '@common/lib/LogoSvg.svelte';
</script>

<div class="headband">
  <div class="info">
    <span class="logo">
      <LogoSvg />
    </span>
    <span class="title">
      <slot name="title" />
    </span>
  </div>
  <slot name="action" />
</div>

<style>
  :global(body) {
    font-family: 'montserrat-400', sans-serif;
  }

  .headband {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-s) var(--space-xl);
    background-color: var(--color-primary);
    font-size: var(--step--1);
  }

  .info {
    display: flex;
    align-items: center;
  }

  .info .logo {
    margin-inline-end: 14px;
  }
</style>
