<script setup>
	import ListMessages from '../components/page/message-page/list-messages/ListMessage.vue';
	import DialogWindow from "@/components/page/message-page/dialog-window/DialogWindow.vue";

</script>
<template>
  <div class="message-page">
		<ListMessages/>
		<DialogWindow/>
	</div>
</template>
<style scoped>
	.message-page{

		width:100%;
		display: flex;
		height: 100%;
	}
</style>
