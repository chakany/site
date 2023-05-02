<script lang="ts">
	import "../app.css";
    import { tweened } from "svelte/motion"

    const firstRow = tweened(0, {
        duration: 900,
    });
    const secondRow = tweened(0, {
        duration: 900,
        delay: 150,
    })

    let showNpub = false;
</script>

<div class="px-24 py-4">
    <div class="flex text-5xl font-bold gap-3 justify-center">
        <div class="flex my-auto">
           👋 Hello i'm
        </div>
        <div class="flex flex-col gap-5" on:mouseleave={() => firstRow.set(0) && secondRow.set(0)}>
            <div class="subtext" style="opacity: {$secondRow};">
                a Programmer
            </div>
            <div class="subtext" style="opacity: {$firstRow};">
                a Web Developer
            </div>
            <div class="p-3 bg-gray-200 border-gray-400 dark:bg-slate-800 dark:border-slate-600 border-2 border-solid rounded" on:mouseover={() => firstRow.set(1) && secondRow.set(1)}>
                Jack Chakany
            </div>
            <div class="subtext" style="opacity: {$firstRow};">
                a Student
            </div>
            <div class="subtext" style="opacity: {$secondRow};">
                a ???
            </div>
        </div>
        <span class="-rotate-45 translate-y-32 translate-x-5 text-2xl">Hover me!</span>
    </div>

    <h2 class="header">About me</h2>
    <p>
        Hi, I'm Jack. I'm a Web Developer from the <span class="text-red-500">U</span>S<span class="text-blue-500">A</span>. As of right now i'm currently working on various hobby projects, and my studies.
        I'm best in Web Development, but I know a variety of languages including C# and Go.
    </p>

    <h2 class="header">Projects</h2>
    <ul class="list-disc list-inside">
        <li><a class="underline" href="https://nosbin.com">nosbin.com</a> - a censorship-resistant alternative to GitHub Gists</li>
        <li><a class="underline" href="https://github.com/jacany/nblog">nblog</a> - self-host your own nostr-based ghost blog</li>
    </ul>

    <h2 class="header">Connect</h2>
    <ul class="list-disc list-inside">
        <li><a class="underline" href="https://github.com/jacany">GitHub</a></li>
        <li><a class="underline" href="https://twitter.com/@jacanyyy">Twitter</a></li>
        <li>Contact me on nostr</li>
        <ul class="list-disc list-inside pl-6   ">
            <li><a class="underline" href="https://nosta.me/jack@jacany.com">Profile on nosta.me</a></li>
            <li>
                Pubkey:
                {#if showNpub}
                    npub1chakany8dcz93clv4xgcudcvhnfhdyqutprq2yh72daydevv8zasmuhf02
                {:else}
                    <span class="cursor-pointer" on:click={() => showNpub = true}>Click to Show</span>
                {/if}
            </li>
        </ul>
        <li>email: jack (at) chaker (dot) net</li>
    </ul>

    <h2 class="header">What are you currently involved in?</h2>
    Currently, i'm involved in creating censorship-resisitant apps that are based on the <a class="underline" href="https://nostr.com">nostr protocol</a>.

    <h2 class="header">Donate</h2>
    Donating to support me or my projects is very generous. Thank you!
    <ul>
        <li>On-chain: bc1q49f4sffeldlwc5dj8m6rxygnul52rvstqlpm2w</li>
        <li>Lightning: donate@jacany.com</li>
    </ul>
</div>

<style lang="postcss">
	:global(html) {
		@apply text-black dark:text-white bg-white dark:bg-slate-900;
	}

    .header {
        @apply text-3xl font-semibold mt-8
    }

    .subtext {
        @apply text-gray-600 dark:text-slate-300
    }
</style>
