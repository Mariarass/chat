<script setup lang="ts">

</script>

<template>
	<div class="form">
		<slot></slot>
	</div>

</template>

<style scoped lang="scss">
.form{
	background: red;
	background: #212135;
	border-radius: 10px;
	max-width: 500px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	padding: 10px;
	gap:10px;
	min-width: 300px;

}

</style>