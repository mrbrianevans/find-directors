<script lang="ts">
  const FUNCTION_API_URL = "%%FUNCTION_API_URL%%";

  let output, duration
  async function get(){
    const startTime = performance.now()
    const res = await fetch(FUNCTION_API_URL + '/sample/hello?name=Svelte')
    duration = performance.now() - startTime
    output = await res.json()
  }
</script>

<main>

  <h1>Find directors</h1>

  <pre>
    GET {FUNCTION_API_URL}
  </pre>

  <button on:click={get}>GET</button>

  {#if output}
    <pre>{JSON.stringify(output, null, 2)}</pre>
    <p>In {duration} milliseconds</p>
  {/if}
</main>

<style>

</style>
