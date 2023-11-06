<script>
  import '@options/css/main.scss';
  import { toto } from '@options/js/store';
</script>

<main>
  <h1>DeepBlock</h1>
  <h2>blacklist</h2>
  <input type="text" name="" id="" placeholder="facebook.com" />
  <button>add</button>
  <ul class="blacklist">
    <li>{toto}</li>
    <!-- {#each $blacklist as item}
<li>{item}</li>
    {/each} -->
  </ul>
</main>
