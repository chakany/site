<script lang="ts">
	import "../app.css";
	import Clock from "../Clock.svelte";
	import { tweened } from "svelte/motion";
	import { onMount } from "svelte";
	import { nostr } from "../lib/stores";
	import ListPost from "../lib/ListPost.svelte";
	import type { Event } from "nostr-tools";
	import { getTagValues, removeDuplicates } from "../lib/util";

	let posts: Event[] = [];

	const firstRow = tweened(0, {
		duration: 900,
	});
	const secondRow = tweened(0, {
		duration: 900,
		delay: 150,
	});

	const progressValue = tweened(0, {
		duration: 1500,
	});

	onMount(() => {
		setTimeout(() => {
			firstRow.set(1);
			secondRow.set(1);
			progressValue.set(100);
		}, 1000);

		$nostr.connect($nostr.relays);
		const sub = $nostr.sub($nostr.relays, [
			{
				kinds: [30023],
				authors: $nostr.pubkeys
			}
		]);

		let tempPosts: Event[] = [];
		sub.on("event", (event: Event) => {
			tempPosts.push(event);
		});

		sub.on("eose", () => {
			// sub.unsub(); 
			if (tempPosts.length > 0) {
				tempPosts = removeDuplicates(tempPosts);
				tempPosts.sort((a, b) => {
					const aPub = getTagValues(a.tags, "published_at");
					const bPub = getTagValues(b.tags, "published_at");
					if (!aPub || !bPub) return 0; 
					return Number(bPub[0]) - Number(aPub[0]);
				});
				posts = tempPosts;
			}
		});
	});

	let showNpub = false;
</script>

<div class="p-4">
	<div class="flex justify-between items-center text-2xl">
                <Clock />
		<div>{new Date().toLocaleDateString()}</div>
	</div>

	<div class="eva-container">
		<h1 class="text-4xl mb-3 font-bold uppercase">JACK CHAKANY</h1>
		<p class="mb-4 normal-case">
			I'm a programmer from New Jersey. Right now, i'm building Hoot Mail at <a target="_blank" href="https://chakany.systems">Chakany Systems</a>
		</p>
	</div>

	<div class="mx-auto max-w-3xl">
		<h2 class="text-xl font-bold mt-6 mb-2 uppercase">PROJECTS</h2>
		<ul class="space-y-2">
			<li class="eva-terminal">
				<div class="font-bold uppercase">HOOT MAIL</div>
				<div class="normal-case">
					<a href="https://hoot.sh" target="_blank">https://hoot.sh</a> - Nostr Email, coming soon.
				</div>
			</li>
			<li class="eva-terminal">
				<div class="font-bold uppercase">NOSBIN.COM</div>
				<div class="normal-case">
					<a href="https://nosbin.com" target="_blank">https://nosbin.com</a> - a censorship-resistant alternative to GitHub Gists
				</div>
			</li>
		</ul>

		<h2 class="text-xl font-bold mt-6 mb-2 uppercase">CONNECT</h2>
		<ul class="space-y-2">
			<li class="eva-terminal">
				<div class="font-bold uppercase">GITHUB</div>
				<div class="normal-case">
					<a href="https://github.com/chakany">https://github.com/chakany</a>
				</div>
			</li>
			<li class="eva-terminal">
				<div class="font-bold uppercase">TWITTER</div>
				<div class="normal-case">
					<a href="https://twitter.com/@ghestnor">@ghestnor</a>
				</div>
			</li>
			<li class="eva-terminal">
				<div class="font-bold uppercase">NOSTR</div>
				<div class="mt-1 normal-case">
					<a href="https://nosta.me/jack@chakany.systems">Profile</a>
				</div>
				<div class="mt-1 normal-case">
					<a href="/nostr">Open in your client</a>
				</div>
				<div class="mt-1 normal-case">
					Pubkey:
					{#if showNpub}
						<span class="break-all">npub1chakany8dcz93clv4xgcudcvhnfhdyqutprq2yh72daydevv8zasmuhf02</span>
					{:else}
						<button class="eva-button text-sm uppercase" on:click={() => (showNpub = true)}>SHOW KEY</button>
					{/if}
				</div>
			</li>
			<li class="eva-terminal">
				<div class="font-bold uppercase">EMAIL</div>
				<div class="normal-case">
					jack (at) chakany (dot) systems
				</div>
			</li>
		</ul>

		<h2 class="text-xl font-bold mt-6 mb-2 uppercase">CURRENT FOCUS</h2>
		<div class="eva-terminal normal-case mb-6">
			Currently, I'm involved in creating censorship-resistant apps that are based on the <a href="https://nostr.com">nostr protocol</a>.
		</div>

		<!-- Insert Blog Posts Section Here -->
		<h2 class="text-xl font-bold mt-6 mb-2 uppercase">LATEST POSTS</h2>
		{#if posts.length > 0}
			{#each posts as post (post.id)}
				<ListPost {post} />
				<!-- No <hr> as ListPost has margin and eva-terminal styling -->
			{/each}
		{:else}
			<div class="eva-terminal normal-case p-4 my-2">
				<p>No posts found yet. Stay tuned!</p>
			</div>
		{/if}
		<!-- End of Blog Posts Section -->
	</div>
</div>

<style lang="postcss">

	:global(a) {
		@apply underline hover:text-eva-light transition-colors;
	}
</style>
