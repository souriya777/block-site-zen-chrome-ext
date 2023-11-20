<script>
  import { onMount } from 'svelte';
  import Interval from '@options/lib/Interval.svelte';

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
    intervals = [...intervals, { id: uuid, component: Interval }];
    console.log('add interval', uuid);
  }

  function removeInterval(uuid) {
    intervals = [...intervals.filter((item) => item?.id !== uuid)];
    console.log('remove interval', uuid);
  }

  onMount(() => {
    addInterval();
  });
</script>

<fieldset>
  <legend>interval : </legend>
  {#each intervals as interval, i (interval.id)}
    <div>
      <Interval id={interval.id} value="09:00" />
      {#if i > 0}
        <button on:click={() => removeInterval(interval.id)}>➖</button>
      {/if}
    </div>
  {/each}
  <button on:click={addInterval}>➕</button>
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
