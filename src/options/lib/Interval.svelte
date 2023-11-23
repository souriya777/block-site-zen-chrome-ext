<script>
  import MinusCircleSvg from '@common/lib/MinusCircleSvg.svelte';
  import PlusCircle from '@common/lib/PlusCircle.svelte';
  import TimeSvg from '@common/lib/TimeSvg.svelte';
  import TriangleDownSvg from '@common/lib/TriangleDownSvg.svelte';
  import { onMount } from 'svelte';

  export let value;

  const DEFAULT_HOURS = '09';
  const DEFAULT_MINUTES = '00';

  const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const MINUTES = Array.from({ length: 6 }, (_, i) => String(i * 10).padStart(2, '0'));

  let hours = DEFAULT_HOURS;
  let minutes = DEFAULT_MINUTES;

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
  }

  function scrollToSelected() {
    const elt = document.querySelector('button.selected');
    if (elt) {
      elt.scrollIntoView();
    }
  }
</script>

<div class="interval">
  <label class="current">
    <input type="checkbox" name="dropdownOpened" on:click={scrollToSelected} />
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
<PlusCircle /><MinusCircleSvg />

<style>
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
    background-color: darkorange;
    display: flex;
    align-items: center;
  }

  .current__value {
    background-color: hotpink;
  }

  .current__arrow {
    background-color: darkred;
  }

  ul {
    background-color: aquamarine;
    position: absolute;
    height: calc(var(--height-input) * 5);
    width: 100%;
    overflow-y: scroll;
    display: none;
    z-index: 1;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--height-input);
    border-bottom: 1px dashed red;
  }

  button {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  button:hover {
    background-color: blueviolet;
  }

  button.selected {
    background-color: pink;
  }

  input[type='checkbox']:checked ~ .current__arrow {
    transform: rotate(180deg);
  }

  label:has(input[type='checkbox']:checked) + ul {
    display: block;
  }
</style>
