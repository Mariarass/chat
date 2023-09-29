<script setup lang="ts">
import { message } from 'ant-design-vue';
import {onMounted} from "vue";
const [messageApi, contextHolder] = message.useMessage();

const {text}=defineProps(['text'])

const info = () => {
	messageApi.info(text);
};
onMounted(()=>{
	info()
})

</script>

<template>
	<context-holder />
</template>

<style scoped lang="scss">

</style>