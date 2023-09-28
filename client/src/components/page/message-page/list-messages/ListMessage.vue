<script setup lang="ts">
	import s from './ListMessage.module.scss';
	import { ref, computed } from 'vue'
	import Input from "@/components/ui/input/Input.vue";
	import { useRouter } from 'vue-router';
	import {useStore} from "vuex";
	import { LogoutOutlined } from '@ant-design/icons-vue';
	const router = useRouter();
	const store = useStore();

	const searchQuery = ref('');

	const users = [
		{ id: 1, name: 'Иван Иванов', photo: 'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' },
		{ id: 2, name: 'Петр Петров', photo: 'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' },
		{ id: 3, name: 'Алексей Алексеев', photo: 'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' },
		{ id: 4, name: 'Сергей Сергеев', photo: 'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' },
		{ id: 5, name: 'Елена Еленова', photo: 'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' },
		{ id: 6, name: 'Ольга Олегова', photo: 'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' },
		{ id: 7, name: 'Дмитрий Дмитриев', photo: 'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' },
		{ id: 8, name: 'Анна Аннова', photo: 'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' },
		{ id: 9, name: 'Михаил Михайлов', photo: 'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' },
		{ id: 10, name: 'Наталья Натальева', photo: 'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg' }
	];
	const filteredUsers = computed(() => {
		return users.filter(user => user.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
	});

	const changeRout=(rout:string)=>{
		router.replace( rout)
	}
	const logout=async ()=>{
		console.log('LOG')
		const isSuccess= await store.dispatch('logout')
		if(isSuccess){
			changeRout( '/login')
		}

	}


</script>

<template>
	<div :class="s.container">
		<Input :class="s.input" :value="searchQuery"  @change="(value)=>searchQuery=value" placeholder="Search"/>
		<ul :class="s.userList">
			<li v-for="user in filteredUsers" :key="user.id" :class="s.userItem">
				<img :src="user.photo" :alt="user.name" :class="s.userPhoto" />
				<div :class="s.info">
					<span :class="s.name">{{ user.name }}</span>
				</div>
			</li>
		</ul>
		<div :class="s.logout" @click="logout()">
			LOGOUT
			<LogoutOutlined />
		</div>

	</div>

</template>

<style scoped lang="scss">

</style>