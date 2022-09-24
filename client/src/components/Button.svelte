<script lang="ts">

    import {createEventDispatcher} from "svelte";

    export let variant: 'primary'|'secondary'|'dangerous' = 'primary'

    export let label: string

    const dispatch = createEventDispatcher()

    function onClick(){
      dispatch('click')
    }

</script>

<button class="{variant}" on:click={onClick}>{label}</button>

<style>
    button{
        border-radius: 0;
        border: none;
        cursor: pointer;
        font-size: inherit;
        padding: 0.25rem 1rem;
    }

    button.primary{
        background: VAR(--main-color);
        color: VAR(--bg-color);
    }
    button.primary:hover{
        background: VAR(--main-color-dimmed);
    }

    button.secondary{
        background: transparent;
        color: VAR(--main-color);
    }
    button.secondary:hover{
        background: VAR(--bg-color-dimmed);
    }
    button:focus{
        outline: 2px solid VAR(--sub-color);
    }
    button.dangerous{
        background: VAR(--error-color);
        color: VAR(--text-color);
    }
</style>
