<script setup lang="ts">
	import s from "@/components/page/message-page/dialog-window/DialogWindow.module.scss";
	const  currentUser=	null
	const currentMessage=[
		{id:1, owner:true,message:'hellohelhellohellohellohell hellohellohellohellohello hellohell ohelloohellohellohellohello lohellohellohellohellohellohello',time:new Date()},
		{id:1, owner:false,message:'hehellohellohellollo',time:new Date()},
		{id:1, owner:true,message:'hhellohelloello',time:new Date()},
		{id:1, owner:false,message:'hehellohellollo',time:new Date()},
		{id:1, owner:true,message:'hehellohellollo',time:new Date()},
		{id:1, owner:false,message:'hehellohellohellollo',time:new Date()},
		{id:1, owner:true,message:'hellhellohelloo',time:new Date()},
		{id:1, owner:false,message:'hellohelhellohellohellohell hellohellohellohellohellohe llohellohelloohellohellohellohello lohellohellohellohellohellohello',time:new Date()},	{id:1, owner:true,message:'hello',time:new Date()},
		{id:1, owner:false,message:'hello',time:new Date()},
		{id:1, owner:true,message:'hello',time:new Date()},
		{id:1, owner:false,message:'hello',time:new Date()},

	]
	const myInfo={photo:'https://static.1tv.ru/uploads/photo/image/2/huge/4062_huge_876c41f50e.jpg'}
</script>

<template>
	<ul :class="s.messageList" v-if="currentUser!=null">
		<li v-for="user in currentMessage" :key="user.id" :class="user.owner?s.myMessageItem:s.userMessageItem">
			<div v-if="user.owner"  :class="s.messageContainer" >
				<div>
					<div  :class="s.myMessage" >
						<span :class="s.name">You</span>
						<p>{{user.message}}</p>
					</div>
					{{ String(user.time.getHours()).padStart(2, '0') }}:
					{{ String(user.time.getMinutes()).padStart(2, '0') }}

				</div>

				<img :src="myInfo.photo" :class="s.userPhoto" />
			</div>

			<div v-else  :class="s.messageContainer" >
				<img :src="myInfo.photo" :class="s.userPhoto" />
				<div>
					<div  :class="s.userMessage" >
						<span :class="s.name">name</span>
						<p>{{user.message}}</p>
					</div>
					{{ String(user.time.getHours()).padStart(2, '0') }}:
					{{ String(user.time.getMinutes()).padStart(2, '0') }}
				</div>


			</div>


		</li>
	</ul>
	<div v-else :class="s.select">
		Select user
	</div>
</template>

<style scoped lang="scss">

</style>