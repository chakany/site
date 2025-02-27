<script lang="ts">
	import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    import "../../app.css";

	export const prerender = true;

	if (browser)
        goto("nostr:npub1chakany8dcz93clv4xgcudcvhnfhdyqutprq2yh72daydevv8zasmuhf02");
</script>

<div class="flex items-center justify-center h-screen">
    <div class="eva-container w-full max-w-lg text-center">
        <div class="eva-progress mt-2">
            <div class="eva-progress-bar animate-pulse" style="width: 75%"></div>
            <div class="eva-progress-scan"></div>
        </div>
        <p class="my-4 uppercase">INITIATING NOSTR PROTOCOL...</p>
        <p class="my-2 uppercase">REDIRECTING TO EXTERNAL CLIENT</p>
        
        <div class="eva-terminal mt-4">
            <span class="uppercase">TARGET:</span> 
            <span class="break-all normal-case">npub1chakany8dcz93clv4xgcudcvhnfhdyqutprq2yh72daydevv8zasmuhf02</span>
        </div>
    </div>
</div>
