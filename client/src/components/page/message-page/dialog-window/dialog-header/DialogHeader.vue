<script setup lang="ts">
	import { defineProps, defineEmits } from 'vue';
	import s from "@/components/page/message-page/dialog-window/DialogWindow.module.scss";

	const  currentUser=	{ id: 1, name: 'Иван Иванов', photo: 'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' }
</script>

<template>
	<div :class="s.header">
		<img :src="currentUser.photo" :class="s.userPhoto" />
		<h3>{{currentUser.name}}</h3>
	</div>

</template>

<style scoped lang="scss">

</style>