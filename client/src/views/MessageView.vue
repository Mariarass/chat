<script setup lang="ts">
	import ListMessages from '../components/page/message-page/list-messages/ListMessage.vue';
	import DialogWindow from "@/components/page/message-page/dialog-window/DialogWindow.vue";
	import {computed, onMounted, watch,onUnmounted} from "vue";
	import io from "socket.io-client";
	import {useStore} from "vuex";
	import {useRouter} from "vue-router";

	const router = useRouter();
	const store=useStore()

	const user = computed(() => store.state.user);



	const socket = io(import.meta.env.VITE_API_URL)
	socket.on("connect", () => {
		console.log('Успешное подключение');
	});
	socket.on("online-users-list", (onlineUserIds) => {
		store.commit('setOnlineList',onlineUserIds)
		console.log("Список онлайн пользователей:", onlineUserIds);
	});

	onMounted(()=>{
		user.value?addUser():router.replace( '/login')
	})

	onUnmounted(()=>{
		socket.disconnect();
	})

	watch(user,()=>{
		if(user.value!=null) addUser()
	})

	const addUser=()=>{
		socket.emit('add-user', user.value._id);
	}


</script>
<template>
  <div class="message-page">

		<ListMessages />
		<DialogWindow :socket="socket"/>
	</div>
</template>
<style scoped>
	.message-page{

		width:100%;
		display: flex;
		height: 100%;
	}
	@media (max-width: 500px) {
		.list-container {
			background:mediumvioletred ;
			display: none; /* Скрываем ListMessages при ширине экрана менее 500 пикселей */
		}
		.dialog-container{
			display: none;
		}
	}


</style>
