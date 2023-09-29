<script setup lang="ts">
	import s from "@/components/page/message-page/dialog-window/DialogWindow.module.scss";
	import {useStore} from "vuex";
	import {computed, onMounted, ref, watch} from "vue";
	import {IMessage, IUser} from "@/scripts/types/users/types";

	const scrollRef = ref<HTMLElement | null>(null);

	const store=useStore()
	const currentUser = computed(():IUser|null => store.state.currentDialogUser);
	const currentMessage = computed(():IMessage[] => store.state.currentMessageList);
	const messageList = computed(()=> store.state.currentMessageList);

	watch(messageList, (newValue, oldValue) => {
		scrollRef.value?.scrollIntoView({ behavior: "smooth",block: 'end', inline: 'nearest' })
	});
	onMounted(()=>
		scrollRef.value?.scrollIntoView({ behavior: "smooth",block: 'end', inline: 'nearest' }))

</script>

<template>
	<ul :class="s.messageList" v-if="currentUser!=null&&currentMessage.length!=0">
		<li v-for="message in currentMessage" :key="message.id" :class="message.fromSelf?s.myMessageItem:s.userMessageItem"  >
			<div v-if="message.fromSelf"  :class="s.messageContainer" >
				<div>
					<div  :class="s.myMessage" >
						<p>{{message.message}}</p>
					</div>
					<span :class="s.time" >
							{{ String(new Date(message.time).getHours()).padStart(2, '0') }}:
							{{ String(new Date(message.time).getMinutes()).padStart(2, '0') }}
					</span>
				</div>

			</div>

			<div v-else  :class="s.messageContainer" >
				<div>
					<div  :class="s.userMessage" >
						<p>{{message.message}}</p>
					</div>
					<span :class="s.time">
							{{ String(new Date(message.time).getHours()).padStart(2, '0') }}:
							{{ String(new Date(message.time).getMinutes()).padStart(2, '0') }}
					</span>

				</div>


			</div>


		</li>
		<div ref="scrollRef" >
		</div>
	</ul>
	<div v-else-if="currentUser!=null&&currentMessage.length===0" :class="s.select">
		No messages yet. Say hello !
	</div>
	<div v-else :class="s.select">
		Select user
	</div>
</template>

<style scoped lang="scss">

</style>