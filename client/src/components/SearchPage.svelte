<script lang="ts">
  import {callFunction} from "../lib/callFunction.js";
  import TextBox from "./TextBox.svelte";
  import Button from "./Button.svelte";
  import Message from "./Message.svelte";

  let typedCompanyName = '', company, directors
  async function findCompany(){
    company = undefined
    directors = undefined
    company = await callFunction('ch', 'searchForCompany', {urlSearchParams:{companyName: typedCompanyName}})
  }
  async function findDirectors(){
    directors = await callFunction('ch', 'getDirectors', {urlSearchParams: {companyNumber: company.company_number}})
  }

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
        <Message>
            <h2>Directors of {company.company_name}</h2>

            {#each directors.items as director}
                <p>
                    {director.name.join(' ')} is {getAge(director.dateOfBirth)} years old.
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
