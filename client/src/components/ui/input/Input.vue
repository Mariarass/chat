<script setup lang="ts">
	import { defineProps, defineEmits } from 'vue';

	const props = defineProps(['value','inputStyle','placeholder']);
	const emits = defineEmits(['change']);

	const handleChange = (event) => {
		console.log(event)
		emits('change', event.target.value);
	};
</script>

<template>
	<input :value="value" @input="handleChange" :class="inputStyle" :placeholder="placeholder" />
</template>

<style scoped lang="scss">

</style>