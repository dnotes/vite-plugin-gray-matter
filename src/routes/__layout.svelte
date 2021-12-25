<script>
  import Header from '$lib/Header.svelte';
import '../app.css'
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css">
</svelte:head>

<div id="page">
  <div id="header">
    <Header/>
  </div>
  <div id="content">
    <slot />
  </div>
</div>

<style>
  #page {
    display: flex;
    flex-direction: column;
    max-width:960px;
    margin: 0 auto;
  }
  #content {
    flex-grow: 1;
  }
</style>