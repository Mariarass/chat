<script setup>
	import ListMessages from '../components/page/message-page/list-messages/ListMessage.vue';
	import DialogWindow from "@/components/page/message-page/dialog-window/DialogWindow.vue";
	import {computed, onMounted, watch,onUnmounted} from "vue";
	import io from "socket.io-client";
	import {useStore} from "vuex";
	import {useRouter} from "vue-router";

	const router = useRouter();
	const store=useStore()

	const user = computed(() => store.state.user);


	const socket = io('http://localhost:5000')
	socket.on("connect", () => {
		console.log('Успешное подключение');
	});
	socket.on("online-users-list", (onlineUserIds) => {
		store.commit('setOnlineList',onlineUserIds)

		console.log("Список онлайн пользователей:", onlineUserIds);
	});

	onMounted(()=>{
		console.log('user',user)
		if(user.value){
			addUser()
		}
		else{
			router.replace( '/login')
		}
	})

	onUnmounted(()=>{
		socket.disconnect();
	})

	watch(user,()=>{
		addUser()
	})

	const addUser=()=>{
		socket.emit('add-user', user.value._id);
	}


</script>
<template>
  <div class="message-page">
		<ListMessages/>
		<DialogWindow :socket="socket"/>
	</div>
</template>
<style scoped>
	.message-page{

		width:100%;
		display: flex;
		height: 100%;
	}
</style>
