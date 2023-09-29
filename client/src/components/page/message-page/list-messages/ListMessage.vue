<script setup lang="ts">
	import s from './ListMessage.module.scss';
	import {ref, computed, onMounted} from 'vue'
	import Input from "@/components/ui/input/Input.vue";
	import { useRouter } from 'vue-router';
	import {useStore} from "vuex";
	import { LogoutOutlined } from '@ant-design/icons-vue';
	import {IUser} from "@/scripts/types/users/types";
	import MessageItem
		from "@/components/page/message-page/list-messages/message-item/MessageItem.vue";
	const router = useRouter();
	const store = useStore();

	const searchQuery = ref('');

	 onMounted(async()=>{
		await store.dispatch('getUsers')
	})

	const userList = computed(() => store.state.userList);
	const filteredUsers = computed(() => {
		return userList.value.filter(user => user.username.toLowerCase().includes(searchQuery.value.toLowerCase()));
	});

	const changeRout=(rout:string)=>{
		router.replace( rout)
	}
	const logout=async ()=>{
		const isSuccess= await store.dispatch('logout')
		if(isSuccess){
			changeRout( '/login')
		}

	}

	const changeDialog=(user:IUser)=>{

		store.commit('setArrivedMessage',{id:user._id,uniq:false})
		store.commit('setCurrentDialogUser',user)
		store.dispatch('getAllMessages')

	}


</script>

<template>
	<div :class="s.container">
		<Input :class="s.input" :value="searchQuery"  @change="(value)=>searchQuery=value" placeholder="Search"/>
		<div :class="s.common">common chat</div>
		<ul :class="s.userList">
			<li v-for="user in filteredUsers" :key="user._id" :class="s.userItem"  @click="changeDialog(user)">
				<MessageItem :user="user"/>
			</li>
		</ul>
		<div :class="s.logout" @click="logout()">
			LOGOUT
			<LogoutOutlined />
		</div>

	</div>

</template>

<style scoped lang="scss">

</style>