// import App from './App.svelte';
let App = require('./App.svelte');

const app = new App({
  target: document.getElementById('app'),
});

export default app;
