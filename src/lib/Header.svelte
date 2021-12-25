<script>
  const links = Object.keys(import.meta.glob('/*.md')).map(k => k.replace(/^\//,'').replace(/\.md$/, '').replace('README', '')).sort()
</script>

<div>
  {#each links as link}
    <a href="/{link}">{link || 'Home'}</a>
  {/each}
</div>

<style>
  div {
    padding: 1em 0;
    margin-bottom: 1em;
  }
  a {
    display:inline-block;
    font-size:larger;
    margin: 0 12px;
    padding: 4px 6px;
    text-decoration: none;
    border-bottom: 2px solid;
  }
  a:first-child {
    margin-left: 0;
  }
  a:last-child {
    margin-right: 0;
  }
</style>
