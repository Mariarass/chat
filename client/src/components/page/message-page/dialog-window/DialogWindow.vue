<script setup lang="ts">
import DialogHeader
	from "@/components/page/message-page/dialog-window/dialog-header/DialogHeader.vue";
import DialogBody from "@/components/page/message-page/dialog-window/dialog-body/DialogBody.vue";
import s from './DialogWindow.module.scss'

import { SendOutlined, } from '@ant-design/icons-vue';

import {computed, ref} from "vue";
import {useStore} from "vuex";


const message=ref('')
const store=useStore()
const currentUser = computed(() => store.state.currentDialogUser);
const sendMessage=async ()=>{
	await store.dispatch('addMessage',message.value)
}

</script>

<template>
	<div :class="s.container">
		<DialogHeader v-if="currentUser"/>
		<DialogBody/>

		<a-input-group compact v-if="currentUser" :class="s.input_group">
			<a-input :class="s.input" v-model:value="message" style="width: calc(100% - 200px)"  placeholder="Your message"  />
				<a-button @click="sendMessage()">
					<template #icon><SendOutlined /></template>
				</a-button>
		</a-input-group>

	</div>
</template>

