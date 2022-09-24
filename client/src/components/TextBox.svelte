<script lang="ts">


    export let value
    export let placeholder = ''

</script>

<input type="text" bind:value placeholder="{placeholder}"/>

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
