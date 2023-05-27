<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleKeydown(e){
    if(e.code.toUpperCase() === 'ENTER') dispatch('enter')
  }

    export let value
    export let placeholder = ''

</script>

<input type="text" bind:value placeholder="{placeholder}" on:keydown={handleKeydown}/>

<style>
input{
    border: none;
    background: transparent;
    color: VAR(--text-color);
    font-size: inherit;
}

input:focus{
    outline: none;
    background: VAR(--bg-color-dimmed);
}
</style>
