<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import TimeSvg from '@common/lib/TimeSvg.svelte';
  import TriangleDownSvg from '@common/lib/TriangleDownSvg.svelte';

  export let id;
  export let initHours;
  export let initMinutes;
  export let minHours = null;
  export let minMinutes = null;
  export let timestamp;

  const dispatch = createEventDispatcher();
  const HOURS = Array.from({ length: 24 }, (_, i) => i);
  const MINUTES = Array.from({ length: 6 }, (_, i) => i * 10);

  let checked;
  let currentTimestamp;

  $: hours = format(initHours);
  $: minutes = format(initMinutes);
  $: if (timestamp !== currentTimestamp) {
    if (checked) {
      checked = false;
    }

    currentTimestamp = timestamp;
  }
  $: time = `${hours}:${minutes}`;

  onMount(() => {
    scrollToSelected();
  });

  function updateTime(newHours, newMinutes, newSelected) {
    const oldSelected = document.querySelector(`button.selected.${id}`);

    if (oldSelected) {
      oldSelected.classList.remove('selected');
    }

    if (newSelected) {
      newSelected.classList.add('selected');
    }

    hours = format(newHours);
    minutes = format(newMinutes);
    checked = false;

    dispatch('update', {
      hours: newHours,
      minutes: newMinutes,
    });
  }

  function scrollToSelected() {
    const elt = document.querySelector(`button.selected.${id}`);
    if (elt) {
      elt.scrollIntoView({ block: 'nearest' });
    }
  }

  function format(timeValue) {
    return String(timeValue).padStart(2, '0');
  }
</script>

<div
  class="interval"
  role="button"
  tabindex="0"
  on:click|stopPropagation={() => ''}
  on:keyup|stopPropagation={() => ''}
>
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
      {#each MINUTES as minutes (`${hours}${minutes}`)}
        {@const selected = hours === initHours && minutes === initMinutes}
        {@const forbidden =
          minHours != null &&
          minMinutes != null &&
          (hours < minHours || (hours === minHours && minutes < minMinutes))}
        {@const displayHours = format(hours)}
        {@const displayMinutes = format(minutes)}

        <li>
          {#if forbidden}
            <button class={id} class:selected class:forbidden>
              {displayHours}:{displayMinutes}
            </button>
          {:else}
            <button
              class:selected
              class={id}
              on:click={(e) => updateTime(hours, minutes, e?.target)}
            >
              {displayHours}:{displayMinutes}
            </button>
          {/if}
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

  button:not(.forbidden):hover {
    background-color: var(--color-accent-3);
    font-family: 'montserrat-700';
  }

  button.forbidden {
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    cursor: not-allowed;
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
