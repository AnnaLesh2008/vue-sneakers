<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import CardList from '@/components/CardList.vue'

const favItems = ref([])
const loading = ref(true)
const error = ref(null)

const fetchFavourites = async () => {
  try {
    const response = await axios.get('https://8074c38230e817ac.mokky.dev/items?isFavourite=true')
    favItems.value = response.data
  } catch (err) {
    error.value = err.message
    console.error('Ошибка загрузки избранного:', err)
  } finally {
    loading.value = false
  }
}

const toggleFavorite = async (item) => {
  try {
    item.isFavourite = !item.isFavourite
    await axios.patch(`https://8074c38230e817ac.mokky.dev/items/${item.id}`, {
      isFavourite: item.isFavourite
    })
    await fetchFavourites() 
  } catch (err) {
    console.error('Ошибка:', err)
    item.isFavourite = !item.isFavourite 
  }
}
const toggleInCart = async(item) => {
    
    try{
      item.inCart = !item.inCart
      await axios.patch(`https://8074c38230e817ac.mokky.dev/items/${item.id}`, {
        inCart: item.inCart,
      })
    }
    catch(err){
      item.inCart = !item.inCart;
      console.error('Ошибка:', err);
    }
  }

onMounted(() => {
  fetchFavourites()
})
</script>

<template>
  <div class="p-10">
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
    
    <h2 class="font-bold text-3xl mb-8">Избранное</h2>
    
    <div v-if="loading" class="text-center py-10">
      <p>Загрузка...</p>
    </div>
    
    <div v-else-if="error">
      <h1 class="text-center text-xl font-bold">
        Произошла ошибка загрузки товаров, попробуйте позже
      </h1>
    </div>
    
    <div v-else-if="favItems.length > 0">
      <CardList 
        :items="favItems" 
        :on-click-favourite="toggleFavorite"
        :on-click-add="toggleInCart"
      />
    </div>
    
    <div v-else class="text-center py-10">
      <img 
        class="m-auto mb-5" 
        src="/sad.png" 
        alt="Пусто" 
        width="100"
      >
      <p class="font-bold text-2xl">Закладок нет :(</p>
    </div>
  </div>
</template>