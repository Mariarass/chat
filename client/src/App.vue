<script setup lang="ts">
import {useStore} from "vuex";
import {onMounted} from "vue";
import  {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

const changeRout=(rout:string)=>{
	router.replace( rout)
}

onMounted(async ()=>{
	if (localStorage.getItem('token')) {
	const isSuccess =await store.dispatch('checkAuth')
		if(isSuccess){
			changeRout( '/message')
		}
}})


</script>

<template>
	<router-view/>
</template>

<style>

</style>
