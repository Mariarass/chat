<script setup lang="ts">
	import s from "@/components/page/message-page/dialog-window/DialogWindow.module.scss";
	import {useStore} from "vuex";
	import {computed} from "vue";

	const store=useStore()
	const currentUser = computed(() => store.state.currentDialogUser);
	const currentMessage = computed(() => store.state.currentMessageList);


	const myInfo={photo:'https://static.1tv.ru/uploads/photo/image/2/huge/4062_huge_876c41f50e.jpg'}
</script>

<template>
	<ul :class="s.messageList" v-if="currentUser!=null">
		<li v-for="message in currentMessage" :key="message.id" :class="message.fromSelf?s.myMessageItem:s.userMessageItem">
			<div v-if="message.fromSelf"  :class="s.messageContainer" >
				<div>
					<div  :class="s.myMessage" >
						<span :class="s.name">You</span>
						<p>{{message.message}}</p>
					</div>
<!--					{{ String(user.time.getHours()).padStart(2, '0') }}:-->
<!--					{{ String(user.time.getMinutes()).padStart(2, '0') }}-->

				</div>

				<img :src="myInfo.photo" :class="s.userPhoto" />
			</div>

			<div v-else  :class="s.messageContainer" >
				<img :src="myInfo.photo" :class="s.userPhoto" />
				<div>
					<div  :class="s.userMessage" >
						<span :class="s.name">{{ currentUser.username }}</span>
						<p>{{message.message}}</p>
					</div>
<!--					{{ String(user.time.getHours()).padStart(2, '0') }}:-->
<!--					{{ String(user.time.getMinutes()).padStart(2, '0') }}-->
				</div>


			</div>


		</li>
	</ul>
	<div v-else-if="currentUser!=null&&currentMessage.length===0" :class="s.select">
		no messages yet
	</div>
	<div v-else :class="s.select">
		Select user
	</div>
</template>

<style scoped lang="scss">

</style>