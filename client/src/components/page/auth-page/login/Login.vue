<script setup lang="ts">

import {ref} from "vue";
import { useRouter } from 'vue-router';
import Form from "@/components/ui/form/Form.vue";
import s from "@/components/page/auth-page/Auth.module.scss";
import {useStore} from "vuex";
import Spinner from "@/components/ui/spinner/Spinner.vue";
import {validationEmail, validationPassword} from "@/scripts/utils/validation";
import Modal from "@/components/ui/modal/Modal.vue";

const router = useRouter();
const store = useStore();

const email=ref('')
const password=ref('')
const isLoading=ref(false)
const isVisiblePassword=ref(false)

const emailError = ref('');
const passwordError = ref('');
const changeRout=(rout:string)=>{
	router.replace( rout)
}
const sendLogin=async ()=>{

	emailError.value=validationEmail(email.value)?'':'Email is wrong'
	passwordError.value=validationPassword(password.value)?'Password must be at least 8 characters long':''

	if(!emailError.value&&!passwordError.value){
		 isLoading.value=true
		 const isSuccess = await store.dispatch('loginUser', {email:email.value,password:password.value})
		 if(isSuccess){
			 changeRout('/message')
		 }
		 isLoading.value=false
	 }

}
</script>

<template>

	<Form>
		<Spinner v-if="isLoading"/>
		<h3 :class="s.header">SIGN IN</h3>

		<a-input
			:class="s.input"
			:status="emailError&&'error'"
			v-model:value="email"
			placeholder="Enter login"
		/>
		<span v-if="emailError" :class="s.error">{{ emailError }}</span>
		<a-input-password
			:class="s.input"
			:status="passwordError&&'error'"
			v-model:value="password"
			v-model:visible="isVisiblePassword"
			placeholder="Enter password"
		/>
		<span v-if="passwordError" :class="s.error">{{ passwordError }}</span>
		<a-button  :class="s.button" @click="sendLogin()" >login</a-button>
		<p :class="s.text" @click="changeRout('/registration')">
				Don't have an account? Create an account
		</p>
	</Form>
	<Modal title="Error"/>

</template>

<style scoped lang="scss">

</style>