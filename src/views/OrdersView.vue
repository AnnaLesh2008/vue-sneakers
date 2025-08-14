<script setup>
    import axios from 'axios'
    import { ref, onMounted } from 'vue'
    import OrderCard from '../components/OrderCard.vue'

    const order_items = ref([])
    const error = ref('')
    const loading = ref(true)
    const names = ref([])
    const fetchOrders = async() =>{
        try{
        const response = await axios.get('https://8074c38230e817ac.mokky.dev/orders')
        order_items.value = response.data
        }
        catch(err){
            error.value = err
        }
        finally{
            loading.value = false
        }
    }
    onMounted(fetchOrders)
</script>
<template>
    <RouterLink 
      to="/" 
      class="flex items-center gap-2 text-gray-500 hover:text-black mb-5"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6667 8H3.33337" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 12.6667L3.33333 8.00004L8 3.33337" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span>Назад</span>
    </RouterLink>
    <h2 class="font-bold text-3xl mb-8">Заказы</h2>
    <div v-if="order_items.length">
        <div v-for="item in order_items" :key="item.id">
    <OrderCard :SneakersName="item.names" :SneakersPrice="item.price" :Date="item.date"/></div></div>
    <div v-else>
        <p class="text-center text-7xl mb-5">😟</p>
        <p class="font-medium text-xl text-center">Вы нищеброд?</p>
        <p class="text-center">Оформите хотя бы один заказ...</p>
    </div>
    

</template>