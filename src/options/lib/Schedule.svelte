<script>
  import { get } from 'svelte/store';
  import { intervals } from '@common/js/store';
  import { initInterval } from '@common/js/interval-utils';
  import MinusCircleSvg from '@common/lib/MinusCircleSvg.svelte';
  import PlusCircleSvg from '@common/lib/PlusCircleSvg.svelte';
  import Interval from '@options/lib/Interval.svelte';

  export let timestamp;

  let monday = false;
  let tuesday = false;
  let wednesday = false;
  let thursday = false;
  let friday = false;
  let saturday = false;
  let sunday = false;

  $: console.log(monday, tuesday, wednesday, thursday, friday, saturday, sunday);

  function addInterval() {
    const interval = initInterval();
    intervals.update((arr) => [...arr, { ...interval }]);
  }

  function removeInterval(uuid) {
    intervals.update((arr) => [...arr.filter((item) => item?.id !== uuid)]);
    console.log('remove interval', uuid);
  }

  function updateInterval(customEvent) {
    const { id, startHours, startMinutes, endHours, endMinutes } = customEvent.detail;

    console.log(id, startHours, startMinutes, endHours, endMinutes);
    const interval = get(intervals).find((item) => item?.id === id);
    interval['start'] = { hours: startHours, minutes: startMinutes };
    interval['end'] = { hours: endHours, minutes: endMinutes };

    intervals.update((arr) => [...arr.filter((item) => item?.id !== id), { ...interval }]);

    console.log('update interval', id);
  }

  function save() {
    const interval = initInterval();
    intervals.update((arr) => [...arr, { ...interval }]);
    console.log('save');
  }
</script>

storedIntervals:{JSON.stringify($intervals)}
<fieldset>
  <legend>interval : </legend>
  {#if $intervals}
    {#each $intervals as interval, i (interval.id)}
      <div class="schedule__interval">
        <Interval
          id={interval.id}
          startHours={interval?.start?.hours}
          startMinutes={interval?.start?.minutes}
          endHours={interval?.end?.hours}
          endMinutes={interval?.end?.minutes}
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
  {/if}
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

<button class="normal primary" on:click={save}>Save</button>

<style>
  .schedule__interval {
    display: flex;
  }
</style>
