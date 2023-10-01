<script setup lang="ts">
	import s from "@/components/page/message-page/dialog-window/DialogWindow.module.scss";
	import {useStore} from "vuex";
	import {computed,  ref, watch} from "vue";
	import {IMessage, IUser} from "@/scripts/types/users/types";


	const scrollRef = ref<HTMLElement | null>(null);

	const store=useStore()
	const currentUser = computed(():IUser|null => store.state.currentDialogUser);
	const currentMessage = computed(():IMessage[] => store.state.currentMessageList);
	const messageList = computed(()=> store.state.currentMessageList);
	const userList = computed(()=> store.state.userList);
	const isGeneralChat = computed(()=> store.state.isGeneralChat);
	const isLoading = computed(()=> store.state.isLoading);


	const scroll=()=>{

		setTimeout(()=>{
			scrollRef.value?.scrollIntoView({ behavior: "smooth",block: 'end', inline: 'nearest' })
		},100)


	}

	watch(messageList, () => {
		scroll()
	});
	const getUserName=(id:string)=>{
		const user = userList.value.find(user => user._id === id);
		return user ? user.username : null;
	}

</script>

<template>
	<a-spin :class="s.spinner" v-if="isLoading" />
	<template v-else>
		<ul :class="s.messageList" v-if="currentUser!=null&&currentMessage.length!=0||isGeneralChat&&currentMessage.length!=0">
			<li v-for="message in currentMessage" :key="message._id" :class="message.fromSelf?s.myMessageItem:s.userMessageItem"  >
				<div :class="s.messageContainer" >
					<div>

						<div  :class=" message.fromSelf?s.myMessage:s.userMessage" >
							<span v-if="isGeneralChat&&!message.fromSelf">{{ getUserName(message.sender) }}</span>
							<p>{{message.message}}</p>
						</div>
						<span :class="s.time" >
							{{ String(new Date(message.time).getHours()).padStart(2, '0') }}:
							{{ String(new Date(message.time).getMinutes()).padStart(2, '0') }}
					</span>
					</div>
				</div>
			</li>
			<div ref="scrollRef" >
			</div>
		</ul>
		<div v-else-if="currentUser!=null&&currentMessage.length===0||isGeneralChat&&currentMessage.length===0" :class="s.select">
			No messages yet. Say hello !
		</div>
		<div v-else :class="s.select">
			Select user
		</div>
	</template>

</template>

<style scoped lang="scss">

</style>