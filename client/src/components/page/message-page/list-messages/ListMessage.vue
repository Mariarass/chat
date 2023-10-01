<script setup lang="ts">
	import s from './ListMessage.module.scss';
	import {ref, computed, onMounted} from 'vue'
	import { useRouter } from 'vue-router';
	import {useStore} from "vuex";
	import { LogoutOutlined } from '@ant-design/icons-vue';
	import {IUser} from "@/scripts/types/users/types";
	import MessageItem
		from "@/components/page/message-page/list-messages/message-item/MessageItem.vue";
	import {WechatOutlined,RedoOutlined} from '@ant-design/icons-vue'

	const router = useRouter();
	const store = useStore();

	const searchQuery = ref('');

	 onMounted(async()=>{
		await store.dispatch('getUsers')
	})

	const userList = computed(() => {
		return store.state.userList
	});
	const filteredUsers = computed(() => {

		return userList.value.filter(user => user.username.toLowerCase().includes(searchQuery.value.toLowerCase()));
	});

	const currentDialog = computed(() => store.state.currentDialogUser);
	const isGeneralChat = computed(() => store.state.isGeneralChat);

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

		store.commit('setIsGeneralChat',false)
		store.commit('setArrivedMessage',{id:user._id,uniq:false})
		store.commit('setCurrentDialogUser',user)
		store.dispatch('getAllMessages')


	}

	const getGeneralMessage=()=>{
		store.commit('setIsGeneralChat',true)
		store.commit('setCurrentDialogUser',null)
		store.dispatch('getAllMessages')
	}

	const refresh=()=>{
		store.dispatch('getUsers')
	}


</script>

<template>
	<div  :class="[s.container,{'list-container': currentDialog!=null||isGeneralChat}]" >
		<a-input
			:class="s.input"
			v-model:value="searchQuery"
			placeholder="Search"
		/>

		<div :class="s.common" @click="getGeneralMessage()">
			<WechatOutlined />
			common chat
		</div>
		<ul :class="s.userList">
			<li v-for="user in filteredUsers" :key="user._id" :class="s.userItem"  @click="changeDialog(user)">
				<MessageItem :user="user"/>
			</li>
		</ul>
		<div :class="s.logout" >
			<span @click="logout()">
				LOGOUT
				<LogoutOutlined />
			</span>

			<RedoOutlined @click="refresh()"/>
		</div>

	</div>

</template>

<style scoped lang="scss">
@media (max-width: 600px) {
	.list-container {
		background:mediumvioletred ;
		display: none;
	}

}
</style>