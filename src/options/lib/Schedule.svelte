<script>
  import { get } from 'svelte/store';
  import { intervals, week, snackbarMessage } from '@common/js/store';
  import { createInterval, sortIntervalsByAscendingStart } from '@common/js/interval-utils';
  import MinusCircleSvg from '@common/lib/MinusCircleSvg.svelte';
  import Interval from '@options/lib/Interval.svelte';
  import BeautifulCheckbox from './BeautifulCheckbox.svelte';

  export let timestamp;

  $: if ($intervals != null && $intervals.length === 0) {
    intervals.set([{ ...createInterval() }]);
  }

  $: sortedIntervals = $intervals != null ? $intervals.sort(sortIntervalsByAscendingStart) : null;

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

    $snackbarMessage = `${name} ${checked ? 'added' : 'removed'}`;
  }
</script>

<div class="schedule">
  <div class="container">
    <div class="header">
      <h3>Hours</h3>
    </div>

    <div class="content">
      {#if sortedIntervals}
        {#each sortedIntervals as interval, i (interval.id)}
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
              <span class="minus">
                <button class="icon primary" on:click={() => removeInterval(interval.id)}>
                  <MinusCircleSvg />
                </button>
              </span>
            {/if}
          </div>
        {/each}
      {/if}

      <div class="schudule__action">
        <button class="normal primary" on:click={addInterval}>
          <span class="summary">Add!</span>
          <span class="detail">Add Interval</span>
        </button>
      </div>
    </div>
  </div>

  <div class="container days">
    <div class="header">
      <h3>Days</h3>
    </div>

    <div class="content">
      {#if $week}
        <BeautifulCheckbox name="monday" label="M" checked={$week.monday} on:click={updateWeek} />

        <BeautifulCheckbox name="tuesday" label="T" checked={$week.tuesday} on:click={updateWeek} />

        <BeautifulCheckbox
          name="wednesday"
          label="W"
          checked={$week.wednesday}
          on:click={updateWeek}
        />

        <BeautifulCheckbox
          name="thursday"
          label="T"
          checked={$week.thursday}
          on:click={updateWeek}
        />

        <BeautifulCheckbox name="friday" label="F" checked={$week.friday} on:click={updateWeek} />

        <BeautifulCheckbox
          name="saturday"
          label="S"
          checked={$week.saturday}
          on:click={updateWeek}
        />

        <BeautifulCheckbox name="sunday" label="S" checked={$week.sunday} on:click={updateWeek} />
      {/if}
    </div>
  </div>
</div>

<style>
  h3 {
    font-size: var(--step-1);
  }

  .schedule {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .schedule .container:nth-child(2n) {
    margin-block-start: var(--space-m);
  }

  .schudule__action {
    margin-block-start: var(--space-m);
  }

  .header {
    padding: var(--space-xs) var(--space-m);
    background-color: var(--color-primary);
    color: var(--color-on-primary);
  }

  .content {
    padding: var(--space-m) var(--space-l);
  }

  .schedule__interval {
    display: flex;
    align-items: center;
    margin-block-end: var(--space-xs);
  }
</style>
