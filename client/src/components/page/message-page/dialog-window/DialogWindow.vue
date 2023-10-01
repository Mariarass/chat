<script setup lang="ts">
import DialogHeader from "@/components/page/message-page/dialog-window/dialog-header/DialogHeader.vue";
import DialogBody from "@/components/page/message-page/dialog-window/dialog-body/DialogBody.vue";
import s from './DialogWindow.module.scss'
import { SendOutlined, } from '@ant-design/icons-vue';
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {IUser} from "@/scripts/types/users/types";
import Alert from "@/components/ui/alert/Alert.vue";

const message=ref('')
const notification=ref(false)
const store=useStore()
const {socket}=defineProps(['socket'])

const currentUser = computed(():IUser|null => store.state.currentDialogUser);
const currentDialog = computed(() => store.state.currentMessageList);
const user = computed(():IUser|null => store.state.user);
const isGeneralChat = computed(()=> store.state.isGeneralChat);

const changeNotification=(value:boolean)=>{
	notification.value=value
	setTimeout(()=>{

		notification.value=false
	},2000)
}
const sendMessage=async ()=>{
	if(message.value.length>0){

		await store.dispatch('addMessage',message.value)

		socket.emit('send-message',{
			to:currentUser.value?._id,
			from:user.value?._id,
			message:message.value,
			isGeneralChat:isGeneralChat.value
		})
		message.value=''
	}

}

socket.on('message-receive',async (data)=>{
	changeNotification(true)
	const setMessageList=  ()=>{
		 store.commit('setCurrentMessageList', [...currentDialog.value,{_id: Math.random(),
			fromSelf:false,
			message:data.message,
			time:new Date(),
			sender: data.from}])

	}

	if(currentUser.value?._id===data.from&&data.to!=null){
		setMessageList()
	}
	else{
		if(data.to==null&&currentUser.value===null){
			setMessageList()
		}
		else {
			if(data.to!=null) await store.commit('setArrivedMessage',{id:data.from,uniq:true})
		}

	}
})



</script>

<template>
	<div :class="[s.container,{'dialog-container': !(currentUser || isGeneralChat)}]" >
		<DialogHeader v-if="currentUser||isGeneralChat"/>
		<DialogBody />
		<a-input-group compact v-if="currentUser||isGeneralChat" :class="s.input_group">
			<a-input @keydown.enter="sendMessage()" :class="s.input" v-model:value="message" style="width: calc(100% - 200px)"   placeholder="Your message"  />
				<a-button @click="sendMessage()" :class="s.button" >
					<template #icon><SendOutlined /></template>
				</a-button>
		</a-input-group>

	</div>
	<Alert  v-if="notification" text="New message" />
</template>
<style scoped>
@media (max-width: 600px) {
	.dialog-container{
		display: none;
	}
}
</style>

