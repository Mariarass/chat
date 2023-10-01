<script setup lang="ts">

import {ref} from "vue";
import { useRouter } from 'vue-router';
import Form from "@/components/ui/form/Form.vue";
import s from "@/components/page/auth-page/Auth.module.scss";
import {useStore} from "vuex";
import Spinner from "@/components/ui/spinner/Spinner.vue";
import Modal from "@/components/ui/modal/Modal.vue";
import {validationEmail, validationPassword} from "@/scripts/utils/validation";

const store = useStore();
const router = useRouter();

const username=ref('')
const email=ref('')
const password=ref('')
const confirmPassword=ref('')

const userNameError=ref('')
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError=ref('')


const isVisiblePassword=ref(false)
const isVisibleConfirmPassword=ref(false)

const isLoading=ref(false)
const changeRout=(rout:string)=>{
	router.replace( rout)
}

const  sendRegistration=async ()=>{

	emailError.value=validationEmail(email.value)?'':'Email is wrong'
	passwordError.value=validationPassword(password.value)?'Password must be at least 8 characters long':''
	confirmPasswordError.value=password.value===confirmPassword.value?'':'Password does not match'
	userNameError.value=username.value.length>1?'':'Username is req'

	if(!emailError.value&&!passwordError.value&&!confirmPasswordError.value){
		isLoading.value=true
		const isSuccess=await store.dispatch('registerUser', {email:email.value,password:password.value,username:username.value})
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
		<h3 :class="s.header">SIGN UP</h3>

		<a-input
			:class="s.input"
			:status="userNameError&&'error'"
			v-model:value="username"
			placeholder="USERNAME"
		/>

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

		<a-input-password
			:class="s.input"
			:status="confirmPasswordError&&'error'"
			v-model:value="confirmPassword"
			v-model:visible="isVisibleConfirmPassword"
			placeholder="Confirm password"
		/>
		<span v-if="confirmPasswordError" :class="s.error">{{ confirmPasswordError }}</span>
		<a-button  :class="s.button" @click="sendRegistration()" >sign in</a-button>
		<p  :class="s.text"   @click="changeRout('/login')">
			Already have an account? Log in
		</p>
	</Form>
	<Modal title="Error"/>
</template>

<style scoped lang="scss">

</style>