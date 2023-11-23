<script>
  import TimeSvg from '@common/lib/TimeSvg.svelte';
  import TriangleDownSvg from '@common/lib/TriangleDownSvg.svelte';
  import { onMount } from 'svelte';

  export let value;
  export let timestamp;

  let currentTimestamp;

  $: if (timestamp !== currentTimestamp) {
    if (checked) {
      checked = false;
    }

    currentTimestamp = timestamp;
  }

  const DEFAULT_HOURS = '09';
  const DEFAULT_MINUTES = '00';

  const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const MINUTES = Array.from({ length: 6 }, (_, i) => String(i * 10).padStart(2, '0'));

  let hours = DEFAULT_HOURS;
  let minutes = DEFAULT_MINUTES;
  let checked;

  $: time = `${hours}:${minutes}`;

  onMount(() => {
    scrollToSelected();
  });

  function updateTime(newHours, newMinutes, newSelected) {
    const oldSelected = document.querySelector('button.selected');
    if (oldSelected) {
      oldSelected.classList.remove('selected');
    }

    if (newSelected) {
      newSelected.classList.add('selected');
    }

    hours = newHours;
    minutes = newMinutes;

    checked = false;
  }

  function scrollToSelected() {
    const elt = document.querySelector('button.selected');
    if (elt) {
      elt.scrollIntoView({ block: 'start' });
    }
  }
</script>

<div class="interval" on:click|stopPropagation={() => console.log('stop propagation')}>
  <label class="current">
    <input bind:checked type="checkbox" name="dropdownOpened" on:click={scrollToSelected} />
    <div class="current__time">
      <div class="current__icon">
        <TimeSvg />
      </div>
      <div class="current__value">
        {time}
      </div>
    </div>
    <div class="current__arrow">
      <TriangleDownSvg />
    </div>
  </label>
  <ul>
    {#each HOURS as hours}
      {#each MINUTES as minutes}
        {@const isDefaultSelected = hours === DEFAULT_HOURS && minutes === DEFAULT_MINUTES}

        <li>
          <button
            class:selected={isDefaultSelected}
            on:click={(e) => updateTime(hours, minutes, e?.target)}
          >
            {hours}:{minutes}
          </button>
        </li>
      {/each}
    {/each}
  </ul>
</div>

<style>
  :root {
    --transition-arrow: transform ease 450ms;
    --transition-popin: all ease 400ms;
  }

  .interval {
    position: relative;
    display: inline-block;
    font-size: 20px;
  }

  .current {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--height-input);
    width: 180px;
    padding-inline: 6px;
    border: 2px solid var(--color-accent-3);
    border-radius: var(--border-radius-button);
    font-family: 'montserrat-700';
    cursor: pointer;
  }

  .current__time {
    display: flex;
    align-items: center;
  }

  .current__value {
    margin-inline-start: 6px;
  }

  .current__arrow {
    transition: var(--transition-arrow);
  }

  .current__icon {
    fill: var(--color-discret);
  }

  ul {
    position: absolute;
    height: 0;
    width: 100%;
    margin-block-start: 8px;
    overflow-y: scroll;
    border: 2px solid var(--color-accent);
    border-radius: var(--border-radius-button);
    opacity: 0;
    z-index: 1;
    transition: var(--transition-popin);
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--height-input);
  }

  button {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--color-accent-3);
    font-family: 'montserrat-700';
  }

  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox']:checked ~ .current__arrow {
    transform: rotate(180deg);
    transition: var(--transition-arrow);
  }

  label:has(input[type='checkbox']:checked) + ul {
    height: calc(var(--height-input) * 5);
    opacity: 1;
    transition: var(--transition-popin);
  }

  .selected {
    background-color: var(--color-accent);
  }
</style>
