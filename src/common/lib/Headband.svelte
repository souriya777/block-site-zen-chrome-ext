<script>
  import '@common/css/main.scss';
  import LogoSvg from '@common/lib/LogoSvg.svelte';
</script>

<div class="headband">
  <div class="info">
    <span class="logo">
      <LogoSvg />
    </span>
    <slot name="title" />
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
    padding: 16px 56px;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 14px;
  }

  .info {
    display: flex;
    align-items: center;
  }

  .info .logo {
    margin-inline-end: 14px;
  }
</style>
