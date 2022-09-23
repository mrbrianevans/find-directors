<script lang="ts">
  import {callFunction} from "./lib/callFunction.js";

  const FUNCTION_API_URL = import.meta.env.VITE_FUNCTION_API_URL;

  let typedCompanyName = '', results
  async function findDirectors(){
    results = await callFunction('ch', 'searchForCompany', {urlSearchParams:{companyName: typedCompanyName}})
    console.log(results)
  }

  async function typeahead(){
    // get suggestions for company name based on what's been typed
  }
</script>

<main>

  <h1>Find directors</h1>

  <pre>
    GET {FUNCTION_API_URL}
  </pre>

  <input type="text" placeholder="Company name" bind:value={typedCompanyName}/>
  <button on:click={findDirectors}>Find</button>


  <pre>
    {JSON.stringify(results??{})}
  </pre>
</main>

<style>

</style>
