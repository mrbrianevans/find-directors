<script lang="ts">
  const FUNCTION_API_URL = import.meta.env.VITE_FUNCTION_API_URL;

  let output, duration, value = 'Svelte'
  async function get(lang='js'){
    const startTime = performance.now()
    const path = lang === 'js' ? '/sample/hellojs?name=' : '/sample/hello?name='
    const res = await fetch(FUNCTION_API_URL + path + value)
    duration = performance.now() - startTime
    output = await res.text()
  }
</script>

<main>

  <h1>Find directors</h1>

  <pre>
    GET {FUNCTION_API_URL}
  </pre>

  <input type="text" placeholder="Name" bind:value/>
  <button on:click={()=>get('js')}>GET (JS)</button>
  <button on:click={()=>get('go')}>GET (Go)</button>

  {#if output}
    <pre>{output}</pre>
    <p>In {duration} milliseconds</p>
  {/if}
</main>

<style>

</style>
