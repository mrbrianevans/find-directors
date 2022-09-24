<script lang="ts">
  import {callFunction} from "../lib/callFunction.js";
  import TextBox from "./TextBox.svelte";
  import Button from "./Button.svelte";
  import Message from "./Message.svelte";

  let typedCompanyName = '', company, directors
  async function findCompany(){
    company = await callFunction('ch', 'searchForCompany', {urlSearchParams:{companyName: typedCompanyName}})
  }
  async function findDirectors(){
    directors = await callFunction('ch', 'getDirectors', {urlSearchParams: {companyNumber: company.company_number}})
  }
</script>

<div class="container">



    <div class="inputArea">
        <TextBox placeholder="Company name" bind:value={typedCompanyName} />
        <Button on:click={findCompany} label="Find"></Button>
    </div>


    {#if company}
        <Message>
            <p>Are you looking for {company.company_name}?</p>
            <Button on:click={findDirectors} label="Confirm"></Button>
        </Message>
    {/if}

    {#if directors}
        <div>
            <pre>
                {JSON.stringify(directors, null, 2)}
            </pre>
        </div>
    {/if}

</div>


<style>

    div.inputArea{
        display: grid;
        grid-template-columns: 8fr 2fr;
        grid-template-rows: 3rem;
        justify-items: stretch;
        align-items: stretch;
        font-size: x-large;
    }

    div.container{
        margin: 2rem 0;
    }

</style>
