<script>
  import { onMount } from 'svelte';
  import MinusCircleSvg from '@common/lib/MinusCircleSvg.svelte';
  import PlusCircleSvg from '@common/lib/PlusCircleSvg.svelte';
  import Interval from './Interval.svelte';

  export let timestamp;

  const START_HOURS = 9;
  const START_MINUTES = 0;
  const END_HOURS = 12;
  const END_MINUTES = 0;

  let monday = false;
  let tuesday = false;
  let wednesday = false;
  let thursday = false;
  let friday = false;
  let saturday = false;
  let sunday = false;

  let intervals = [];

  $: console.log(monday, tuesday, wednesday, thursday, friday, saturday, sunday);

  function addInterval() {
    const uuid = crypto.randomUUID();
    intervals = [
      ...intervals,
      {
        id: uuid,
        start: {
          hours: START_HOURS,
          minutes: START_MINUTES,
        },
        end: {
          hours: END_HOURS,
          minutes: END_MINUTES,
        },
      },
    ];
    console.log('add interval', uuid, intervals);
  }

  function removeInterval(uuid) {
    intervals = [...intervals.filter((item) => item?.id !== uuid)];
    console.log('remove interval', uuid, intervals);
  }

  function updateInterval(customEvent) {
    const { id, startHours, startMinutes, endHours, endMinutes } = customEvent.detail;
    const interval = intervals.find((item) => item?.id === id);
    interval['start'] = { hours: startHours, minutes: startMinutes };
    interval['end'] = { hours: endHours, minutes: endMinutes };

    intervals = [...intervals.filter((item) => item?.id !== id), { ...interval }];

    console.log(intervals);
  }

  onMount(() => {
    addInterval();
  });
</script>

<fieldset>
  <legend>interval : </legend>
  {#each intervals as interval, i (interval.id)}
    <div class="schedule__interval">
      <Interval
        id={interval.id}
        startHours={START_HOURS}
        startMinutes={START_MINUTES}
        endHours={END_HOURS}
        endMinutes={END_MINUTES}
        on:update={updateInterval}
        {timestamp}
      />
      {#if i > 0}
        <button on:click={() => removeInterval(interval.id)}>
          <MinusCircleSvg />
        </button>
      {/if}
    </div>
  {/each}
  <button on:click={addInterval}><PlusCircleSvg /></button>
</fieldset>

<fieldset>
  <legend>days :</legend>

  <span>
    <input type="checkbox" name="monday" id="monday" bind:checked={monday} />
    <label for="monday">M</label>
  </span>

  <span>
    <input type="checkbox" name="tuesday" id="tuesday" bind:checked={tuesday} />
    <label for="tuesday">T</label>
  </span>

  <span>
    <input type="checkbox" name="wednesday" id="wednesday" bind:checked={wednesday} />
    <label for="wednesday">W</label>
  </span>

  <span>
    <input type="checkbox" name="thursday" id="thursday" bind:checked={thursday} />
    <label for="thursday">T</label>
  </span>

  <span>
    <input type="checkbox" name="friday" id="friday" bind:checked={friday} />
    <label for="friday">F</label>
  </span>

  <span>
    <input type="checkbox" name="saturday" id="saturday" bind:checked={saturday} />
    <label for="saturday">S</label>
  </span>

  <span>
    <input type="checkbox" name="sunday" id="sunday" bind:checked={sunday} />
    <label for="sunday">S</label>
  </span>
</fieldset>

<style>
  .schedule__interval {
    display: flex;
  }
</style>
