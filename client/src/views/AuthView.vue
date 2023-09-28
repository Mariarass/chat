<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Registration from "@/components/page/auth-page/registration/Registration.vue";
import Login from "@/components/page/auth-page/login/Login.vue";


const route = useRoute();

const isLoginRoute = computed(() => route.name === 'login');
</script>

<template>
  <div class="auth-page">

		<Login v-if="isLoginRoute"/>
		<Registration v-else/>

  </div>
</template>
<style scoped>

.auth-page{
	display: flex;
	justify-content: center;
	align-items:  center;
	height: 100vh;
}
</style>

