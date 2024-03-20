<script lang="ts">
	import ProductCard from "$lib/productCard.svelte";
	import {get} from "svelte/store";
	import {cartItems} from '../cart';
	const products : Product []=[
		{
		id:"price_1OrZedSDVB6Dnlatjftya9db",
		name:"coffee",
		price:50 ,
		},
		{
		id:"price_1OrZfMSDVB6DnlatJE4Pbp6r",
		name:"Tea",
		price:30 ,
		},
		{
		id:"price_1OrZgCSDVB6DnlatzcEpCOLp",
		name:"Green tea",
		price:40 ,
		},

	]
    async function checkout() {
		await fetch("api/stripecheckout",{
			method:"POST",
			headers:{
				"content-type":"application/json"
			},
			body:JSON.stringify(
				{items:get(cartItems)}
			)
		}).then((data)=>{
			return data.json()
		}).then((data)=>{
			data.url
			window.location.replace(data.url);
		});
		
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4" >
		<div class="col-span-3">
		    <h1 class="h1"> Svelte Store</h1>
	    </div>
		{#each products as product}
		<ProductCard product={product}/>
		{/each}
		<div class="col-span-3">
			<button class="btn variant-filled-primary"on:click={()=>checkout()}> Chectout with stripe</button>
		</div>




	</div>
	
</div>
