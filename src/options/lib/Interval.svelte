<script>
  export let id;

  let time;
  $: console.log(time);
</script>

<input type="time" name={id} {id} bind:value={time} />
