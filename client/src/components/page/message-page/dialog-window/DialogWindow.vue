<script setup lang="ts">
import DialogHeader
	from "@/components/page/message-page/dialog-window/dialog-header/DialogHeader.vue";
import DialogBody from "@/components/page/message-page/dialog-window/dialog-body/DialogBody.vue";
import s from './DialogWindow.module.scss'
import Input from "@/components/ui/input/Input.vue";
import {ref} from "vue";
const message=ref('')

</script>

<template>
	<div :class="s.container">
		<DialogHeader/>
		<DialogBody/>
		<Input :class="s.input" :value="message"  @change="(value)=>message=value" placeholder="Your message"/>
	</div>
</template>

