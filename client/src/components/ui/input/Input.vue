<script setup lang="ts">
	import { defineProps, defineEmits } from 'vue';

	const {value,inputStyle,placeholder,type} = defineProps<{
		value: string
		inputStyle?: number
		placeholder?:string
		type?:string

	}>()
	const emits = defineEmits(['change']);

	const handleChange = (event) => {
		emits('change', event.target.value);
	};
</script>

<template>
	<input :value="value" @input="handleChange" :class="inputStyle" :placeholder="placeholder"  :type="type"/>
</template>

<style scoped lang="scss">

</style>