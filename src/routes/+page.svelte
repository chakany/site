<script lang="ts">
	import "../app.css";
	import { tweened } from "svelte/motion";

	const firstRow = tweened(0, {
		duration: 900,
	});
	const secondRow = tweened(0, {
		duration: 900,
		delay: 150,
	});

	setTimeout(() => {
		firstRow.set(1);
		secondRow.set(1);
	}, 2000);

	let showNpub = false;
</script>

<div class="my-4">
	<div class="flex justify-center gap-3 text-lg font-bold sm:text-xl md:text-3xl lg:text-5xl">
		<div class="my-auto flex">👋 Hello i'm</div>
		<div class="flex flex-col gap-5">
			<div class="subtext" style="opacity: {$secondRow};">a Programmer</div>
			<div class="subtext" style="opacity: {$firstRow};">a Web Developer</div>
			<div
				class="rounded border-2 border-solid border-gray-400 bg-gray-200 p-3 dark:border-slate-600 dark:bg-slate-800"
			>
				Jack Chakany
			</div>
			<div class="subtext" style="opacity: {$firstRow};">a Student</div>
			<div class="subtext" style="opacity: {$secondRow};">a ???</div>
		</div>
	</div>

	<div class="mx-6 sm:mx-24 lg:mx-44 2xl:mx-72">
		<h2 class="header">About me</h2>
		<p>
			Hi, I'm Jack. I'm a Web Developer from the <span class="text-red-500">U</span>S<span
				class="text-blue-500">A</span
			>. As of right now i'm currently working on various hobby projects, and my studies. I'm
			best in Web Development, but I know a variety of languages including C# and Go.
		</p>

		<h2 class="header">Projects</h2>
		<ul class="list-inside list-disc">
			<li>
				<a href="https://nosbin.com">nosbin.com</a> - a censorship-resistant alternative to GitHub
				Gists
			</li>
			<li>
				<a href="https://github.com/jacany/nblog">nblog</a> - self-host your own nostr-based
				ghost blog
			</li>
		</ul>

		<h2 class="header">Connect</h2>
		<ul class="list-inside list-disc">
			<li><a href="https://github.com/jacany">GitHub</a></li>
			<li><a href="https://twitter.com/@jacanyyy">Twitter</a></li>
			<li>Contact me on nostr</li>
			<ul class="list-inside list-disc pl-6">
				<li><a href="https://nosta.me/jack@jacany.com">Profile on nosta.me</a></li>
				<li><a href="/nostr">Open in your client</a></li>
				<li>
					Pubkey:
					{#if showNpub}
						npub1chakany8dcz93clv4xgcudcvhnfhdyqutprq2yh72daydevv8zasmuhf02
					{:else}
						<span class="cursor-pointer" on:click={() => (showNpub = true)}
							>Click to Show</span
						>
					{/if}
				</li>
			</ul>
			<li>email: jack (at) chaker (dot) net</li>
		</ul>

		<h2 class="header">What are you currently involved in?</h2>
		Currently, i'm involved in creating censorship-resisitant apps that are based on the<a
			class="underline"
			href="https://nostr.com">nostr protocol</a
		>.

		<h2 class="header">Donate</h2>
		Donating to support me or my projects is very generous. Thank you!
		<ul>
			<li>Bitcoin On-chain: bc1q49f4sffeldlwc5dj8m6rxygnul52rvstqlpm2w</li>
			<li>Lightning: donate@jacany.com</li>
		</ul>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		@apply bg-white text-black dark:bg-slate-900 dark:text-white;
	}

	:global(a) {
		@apply underline decoration-purple-500;
	}

	.header {
		@apply mt-8 text-3xl font-semibold;
	}

	.subtext {
		@apply text-gray-600 dark:text-slate-300;
	}
</style>
