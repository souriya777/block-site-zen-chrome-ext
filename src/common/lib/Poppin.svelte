<div class="poppin"><slot /></div>
<div class="blur">blur</div>

<style>
  .blur {
    position: absolute;
    background-color: var(--color-primary);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.3;
    z-index: var(--z-index-blur-layer);
  }

  .poppin {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 400px;
    padding: var(--space-m);
    border-radius: var(--border-radius-container);
    background-color: var(--color-secondary);
    z-index: var(--z-index-poppin-layer);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
</style>
