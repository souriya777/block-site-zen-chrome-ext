<script>
  import MinusCircleSvg from '@common/lib/MinusCircleSvg.svelte';
  import PlusCircle from '@common/lib/PlusCircle.svelte';
  import TimeSvg from '@common/lib/TimeSvg.svelte';

  export let value;

  const DEFAULT_HOURS = '09';
  const DEFAULT_MINUTES = '00';

  const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const MINUTES = Array.from({ length: 6 }, (_, i) => String(i * 10).padStart(2, '0'));

  let hours = DEFAULT_HOURS;
  let minutes = DEFAULT_MINUTES;

  $: time = `${hours}:${minutes}`;

  function updateTime(hours, minutes) {
    value = `${hours}:${minutes}`;
  }
</script>

<div class="interval">
  <div class="main">
    <div class="main__icon">
      <TimeSvg />
    </div>
    <div class="main__value">
      {time}
    </div>
  </div>
  <!-- <ul class="popin">
    {#each HOURS as hours}
      {#each MINUTES as minutes}
        {@const isDefaultSelected = hours === DEFAULT_HOURS && minutes === DEFAULT_MINUTES}
        <li class:selected={isDefaultSelected}>
          <button on:click={() => updateTime(hours, minutes)}>
            {hours}:{minutes}
          </button>
        </li>
      {/each}
    {/each}
  </ul> -->
</div>
<PlusCircle /><MinusCircleSvg />

<style>
  .interval {
    display: inline-block;
    background-color: var(--color-primary);
    color: var(--color-primary);
    fill: var(--color-primary);
  }

  .main {
    display: flex;
    align-items: center;
    height: var(--height-input);
    cursor: pointer;
  }

  /* .main__icon {
    fill: var(--color-discret);
  } */

  .popin {
    background-color: darksalmon;
    /* display: none; */
  }

  .popin button {
    /* width: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer; */
  }

  ul {
    /* height: var(--height-interval-item); */
    /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    overflow-y: scroll; */
  }

  /* li {
    display: flex;
    height: var(--height-input);
    cursor: pointer;
  }

  li:hover {
    background-color: var(--color-primary);
  }

  li.selected {
    font-family: 'montserrat-700';
  } */
</style>
