<script setup lang="ts">

import Input from "@/components/ui/input/Input.vue";
import {ref} from "vue";
import { useRouter } from 'vue-router';
import Form from "@/components/ui/form/Form.vue";
import s from "@/components/page/auth-page/Auth.module.scss";

const router = useRouter();
const login=ref('')
const password=ref('')
const changeRout=(rout:string)=>{
	router.replace( rout)
}
</script>

<template>
	<Form>
		<h3 :class="s.header">LOGIN</h3>
		<Input :class="s.input"  :value="login"  @change="(value)=>login=value" placeholder="Enter login"/>
		<Input :class="s.input"  :value="password"  @change="(value)=>password=value" placeholder="Enter password"/>
		<button  :class="s.button" @click="changeRout('/message')" >login</button>
		<p :class="s.text" @click="changeRout('/registration')">
			Don't have an account? Create an account
		</p>
	</Form>


</template>

<style scoped lang="scss">

</style>