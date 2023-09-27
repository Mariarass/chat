<script setup lang="ts">

import Input from "@/components/ui/input/Input.vue";
import {ref} from "vue";
import { useRouter } from 'vue-router';
import Form from "@/components/ui/form/Form.vue";
import s from "@/components/page/auth-page/Auth.module.scss";

const router = useRouter();
const login=ref('')
const password=ref('')
const confirmPassword=ref('')
const changeRout=(rout:string)=>{
	router.replace( rout)
}
</script>

<template>
	<Form>
		<h3 :class="s.header">SIGN IN</h3>
		<Input :class="s.input"   :value="login"  @change="(value)=>login=value" placeholder="Enter login"/>
		<Input :class="s.input"  :value="password"  @change="(value)=>password=value" placeholder="Enter password"/>
		<Input :class="s.input"  :value="confirmPassword"  @change="(value)=>confirmPassword=value" placeholder="Enter password"/>
		<button  :class="s.button"  @click="changeRout('/message')" >sign in</button>
		<p  :class="s.text"   @click="changeRout('/login')">
			Already have an account? Log in
		</p>
	</Form>
</template>

<style scoped lang="scss">

</style>