<script context="module" lang="ts">
  export async function load({ page, fetch }) {
    const res = await fetch(`/README.json`)
    const item = await res.json()
    return {
      props: {
        content: item.html
      }
    }
  }
</script>

<script>
  export let content
</script>

{@html content}
