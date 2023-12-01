<script>
  import { get } from 'svelte/store';
  import { intervals, week } from '@common/js/store';
  import { createInterval } from '@common/js/interval-utils';
  import MinusCircleSvg from '@common/lib/MinusCircleSvg.svelte';
  import PlusCircleSvg from '@common/lib/PlusCircleSvg.svelte';
  import Interval from '@options/lib/Interval.svelte';
  import BeautifulCheckbox from './BeautifulCheckbox.svelte';

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

  <!-- {JSON.stringify($week)} -->

  {#if $week}
    <BeautifulCheckbox name="monday" label="M" checked={$week.monday} on:click={updateWeek} />

    <BeautifulCheckbox name="tuesday" label="T" checked={$week.tuesday} on:click={updateWeek} />

    <BeautifulCheckbox name="wednesday" label="W" checked={$week.wednesday} on:click={updateWeek} />

    <BeautifulCheckbox name="thursday" label="T" checked={$week.thursday} on:click={updateWeek} />

    <BeautifulCheckbox name="friday" label="F" checked={$week.friday} on:click={updateWeek} />

    <BeautifulCheckbox name="saturday" label="S" checked={$week.saturday} on:click={updateWeek} />

    <BeautifulCheckbox name="sunday" label="S" checked={$week.sunday} on:click={updateWeek} />
  {/if}
</fieldset>

<button class="normal primary" on:click={save}>Save</button>

<style>
  .schedule__interval {
    display: flex;
  }
</style>
