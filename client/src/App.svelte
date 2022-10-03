<script lang="ts">
  import SearchPage from "./components/SearchPage.svelte";
  import Button from "./components/Button.svelte";
  import Footer from "./components/Footer.svelte";
  import {theme} from "./lib/theme.js";

</script>

<main>

  <h1>Find directors</h1>
  <div class="top-bar">
    <Button label="Toggle theme" on:click={theme.toggle} variant="secondary"/>
  </div>

  <hr/>

  <SearchPage/>

  <hr/>

  <Footer/>

  <link href="themes/{$theme}.css" rel="stylesheet"/>
</main>

<style>

  h1{
    font-size: 4rem;
  }

  div.top-bar{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 2rem;
    font-size: smaller;
  }

  main{
    display: grid;
    place-items: stretch;
    max-width: 60rem;
    margin: auto;
  }

</style>
