<script>
  import { createEventDispatcher } from 'svelte';
  import { getTimestamp } from '@common/js/svelte-utils';
  import Time from '@options/lib/Time.svelte';

  export let id;
  export let timestamp;

  const dispatch = createEventDispatcher();

  export let startHours;
  export let startMinutes;
  export let endHours;
  export let endMinutes;

  function updateStart(customEvent) {
    const { hours, minutes } = customEvent.detail;

    endHours = hours < 23 ? hours + 1 : hours;
    endMinutes = minutes;
    timestamp = getTimestamp();

    dispatch('update', {
      id,
      startHours: hours,
      startMinutes: minutes,
      endHours,
      endMinutes,
    });
  }

  function updateEnd(customEvent) {
    const { hours, minutes } = customEvent.detail;

    dispatch('update', {
      id,
      startHours,
      startMinutes,
      endHours: hours,
      endMinutes: minutes,
    });
  }
</script>

<div class="interval">
  <Time
    id={`start_${id}`}
    initHours={startHours}
    initMinutes={startMinutes}
    on:update={updateStart}
    {timestamp}
  />
  <Time
    id={`end_${id}`}
    initHours={endHours}
    initMinutes={endMinutes}
    minHours={startHours}
    minMinutes={startMinutes}
    on:update={updateEnd}
    {timestamp}
  />
</div>
