<script lang="ts">
  import {callFunction} from "../lib/callFunction.js";
  import TextBox from "./TextBox.svelte";
  import Button from "./Button.svelte";
  import Message from "./Message.svelte";
  import {company, companyNameSearch, directors} from "../lib/companyStore.js";

  //todo: onMount, get the company name in the URL search bar and set it to the search query to allow redirects here

  async function findCompany(){
    company.reset()
    directors.reset()
    $company = await callFunction('ch', 'searchForCompany', {urlSearchParams:{companyName: $companyNameSearch}})
  }
  async function findDirectors(companyNumber){
    $directors = await callFunction('ch', 'getDirectors', {urlSearchParams: {companyNumber}})
  }
  $: if($company?.company_number) findDirectors($company.company_number) // whenever company number changes, find the directors
  function getAge(dateOfBirth: {year: number, month: number, day?: number}){
    dateOfBirth.day ??= 1
    const born = new Date(dateOfBirth.year, dateOfBirth.month-1, dateOfBirth.day)
    const differenceMs = Date.now() - born.getTime()
    return Math.floor(differenceMs / 1000 / 86400 / 365)
  }

  function startsWithVowel(str: string){
    return /^[aeiou]/i.test(str)
  }
</script>

<div class="container">



    <div class="inputArea">
        <TextBox placeholder="Company name" bind:value={$companyNameSearch} on:enter={()=>findCompany()}/>
        <Button on:click={()=>findCompany()} label="Find"></Button>
    </div>

    {#if $company}
        <Message>
            <h2>Directors of <a href="https://find-and-update.company-information.service.gov.uk/company/{$company.company_number}">{$company.company_name}</a></h2>

            {#each $directors.items as director}
                <p>
                    <a href="https://find-and-update.company-information.service.gov.uk{director.linkPath}">{director.name.join(' ')}</a> is {getAge(director.dateOfBirth)} years old.
                    {#if director.nationality && director.occupation}
                        {director.name[0].split(' ')[0]} is a{startsWithVowel(director.nationality)?'n':''} {director.nationality} {director.occupation}.
                    {/if}
                </p>
            {/each}
        </Message>
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
