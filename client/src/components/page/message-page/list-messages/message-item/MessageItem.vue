<script setup lang="ts">

import s from "@/components/page/message-page/list-messages/ListMessage.module.scss";

import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const {user}=defineProps(['user'])

const unreadMessages = computed(() => store.state.arrivedMessage);
const onlineList = computed(() => store.state.online);

const isUserUnread = (userId) => {
	return unreadMessages.value.includes(userId);
};

const isOnline = (userId) => {
	return onlineList.value.includes(userId);
};

</script>

<template>
	<img src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" :alt="user.name" :class="s.userPhoto" />
	<div :class="s.info">
		<div :class="s.name">{{ user.username }} <div  v-if="isOnline(user._id)" :class="s.online"></div></div>
		<div v-if="isUserUnread(user._id)" :class="s.unread"></div>
	</div>
</template>

<style scoped lang="scss">

</style>