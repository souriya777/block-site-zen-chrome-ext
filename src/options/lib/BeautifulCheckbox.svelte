<script>
  export let name;
  export let label;
  export let checked;
</script>

<span class="schedule-checkbox">
  <input type="checkbox" id={name} {name} bind:checked on:click />
  <label for={name}>
    <span class="checkbox__border">
      <span class="checkbox__mark">
        <svg height="18" width="18" viewBox="0 0 24 24">
          <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" />
        </svg>
      </span>
    </span>
    <span class="text">{label}</span>
  </label>
</span>

<style>
  :root {
    --size: 24px;
  }

  input {
    width: 0;
    height: 0;
  }

  label {
    display: inline-flex;
    align-items: center;
    color: var(--color-primary);
    transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
    cursor: pointer;
  }

  label:hover,
  input:focus + label {
    color: var(--color-accent-3);
  }

  label:hover .checkbox__border {
    background-color: var(--color-accent-transparent);
    border-color: var(--color-accent-3);
  }

  .checkbox__border {
    position: relative;
    display: inline-block;
    height: var(--size);
    width: var(--size);
    border: 2px solid var(--color-discret);
    border-radius: 2px;
    transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
  }

  .checkbox__mark {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .checkbox__mark path {
    fill: none;
    stroke: var(--color-on-accent);
    stroke-width: 4;
    stroke-dasharray: 23;
    stroke-dashoffset: 23;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  input[type='checkbox']:checked + label .checkbox__mark path {
    animation: draw 250ms 250ms cubic-bezier(0.4, 0, 0.23, 1) forwards;
  }

  input[type='checkbox']:checked + label .checkbox__border {
    border: 12px solid var(--color-accent);
    animation: bounce 200ms cubic-bezier(0.4, 0, 0.23, 1);
  }

  .text {
    margin-inline-start: 10px;
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(0.85);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
