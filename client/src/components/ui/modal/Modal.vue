<script setup lang="ts">
import {useStore} from "vuex";
import {computed,ref} from "vue";
const store = useStore();
const  {title}=defineProps(['title'])
const isError = computed(()=> store.state.isError) ;

const message = ref('Notification Title');
const description = ref('description');


const handleOk=()=>{
	store.commit('setIsError', '')
}
</script>

<template>
	<a-modal :centered="true"  :open="isError.length!=0" :title="title" @ok="handleOk" @close="handleOk"  :cancelButtonProps="{ style: { display: 'none' } }" >
	{{isError}}
	</a-modal>
</template>

<style scoped lang="scss">
.custom-modal {

	background-color: mediumvioletred;

}
</style>