<script lang="ts">

import GitHubIcon from "./GitHubIcon.svelte";
</script>

<footer>


    <a href="https://github.com/mrbrianevans/find-directors" class="icon-link">
        Source code <GitHubIcon size="{20}"/>
    </a>

    <div>
        Made with ❤ by <a href="https://brianevans.tech">Brian Evans</a>
    </div>

    <div>
        Backend deployed on <a href="https://www.digitalocean.com/">Digital Ocean</a>
    </div>
</footer>


<style>
footer{
    margin-top: 1rem;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
}

.icon-link{
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
}
</style>
