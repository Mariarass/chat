<script setup lang="ts">

	import s from "@/components/page/message-page/dialog-window/DialogWindow.module.scss";
	import {useStore} from "vuex";
	import {computed} from "vue";

	const store=useStore()
	const currentUser = computed(() => store.state.currentDialogUser);
</script>

<template>
	<div :class="s.header">
		<img src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" :class="s.userPhoto" />
		<h3>{{currentUser.username}}</h3>
	</div>

</template>

<style scoped lang="scss">

</style>