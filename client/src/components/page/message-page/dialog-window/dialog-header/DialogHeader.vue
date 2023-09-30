<script setup lang="ts">

	import s from "@/components/page/message-page/dialog-window/DialogWindow.module.scss";
	import {useStore} from "vuex";
	import {computed} from "vue";
	import {WechatOutlined} from "@ant-design/icons-vue";

	const store=useStore()
	const currentUser = computed(() => store.state.currentDialogUser);
	const isGeneralChat = computed(() => store.state.isGeneralChat);
</script>

<template>
	<div :class="s.header" v-if="!isGeneralChat">
		<img src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" :class="s.userPhoto" />
		<h3>{{currentUser.username}}</h3>
	</div>
	<div v-else :class="s.header">
		<WechatOutlined :class="s.icon"/>
		general chat
	</div>

</template>

<style scoped lang="scss">

</style>