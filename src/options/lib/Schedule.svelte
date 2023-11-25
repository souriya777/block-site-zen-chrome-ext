<script>
  import { get } from 'svelte/store';
  import { intervals, week } from '@common/js/store';
  import { createInterval } from '@common/js/interval-utils';
  import MinusCircleSvg from '@common/lib/MinusCircleSvg.svelte';
  import PlusCircleSvg from '@common/lib/PlusCircleSvg.svelte';
  import Interval from '@options/lib/Interval.svelte';

  export let timestamp;

  $: if ($intervals != null && $intervals.length === 0) {
    intervals.set([{ ...createInterval() }]);
  }

  function addInterval() {
    const interval = createInterval();
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

  function updateWeek(e) {
    const checked = e.target.checked;
    const name = e.target.name;
    week.update((current) => ({ ...current, [name]: checked }));
  }

  function save() {
    console.log('TODO save');
  }
</script>

intervals:{JSON.stringify($intervals)}
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

week:{JSON.stringify($week)}
<fieldset>
  <legend>days :</legend>

  {#if $week}
    <span>
      <input type="checkbox" name="monday" bind:checked={$week.monday} on:click={updateWeek} />
      <label for="monday">M</label>
    </span>

    <span>
      <input type="checkbox" name="tuesday" bind:checked={$week.tuesday} on:click={updateWeek} />
      <label for="tuesday">T</label>
    </span>

    <span>
      <input
        type="checkbox"
        name="wednesday"
        bind:checked={$week.wednesday}
        on:click={updateWeek}
      />
      <label for="wednesday">W</label>
    </span>

    <span>
      <input type="checkbox" name="thursday" bind:checked={$week.thursday} on:click={updateWeek} />
      <label for="thursday">T</label>
    </span>

    <span>
      <input type="checkbox" name="friday" bind:checked={$week.friday} on:click={updateWeek} />
      <label for="friday">F</label>
    </span>

    <span>
      <input type="checkbox" name="saturday" bind:checked={$week.saturday} on:click={updateWeek} />
      <label for="saturday">S</label>
    </span>

    <span>
      <input type="checkbox" name="sunday" bind:checked={$week.sunday} on:click={updateWeek} />
      <label for="sunday">S</label>
    </span>
  {/if}
</fieldset>

<button class="normal primary" on:click={save}>Save</button>

<style>
  .schedule__interval {
    display: flex;
  }
</style>
