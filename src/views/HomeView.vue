<script setup>
  import { ref, onMounted, watch, reactive } from 'vue';
  import axios from 'axios';
  import Header from '../components/Header.vue'
  import Card  from '../components/Card.vue';
  import CardList from '../components/CardList.vue'
  import Drawer from '../components/Drawer.vue'

  const items = ref([])
  const loading = ref(true)
  const error = ref(null)
  const search_input = ref('')
  const filters = reactive({
    sortBy: '',
    searchQuery: '',
  })
  

  const toggleFavourite = async(item) => {
    
    try{
      item.isFavourite = !item.isFavourite
      await axios.patch(`https://8074c38230e817ac.mokky.dev/items/${item.id}`, {
        isFavourite: item.isFavourite,
      })
    }
    catch(err){
      item.isFavourite = !item.isFavourite;
      console.error('Ошибка:', err);
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

  const fetchAll = async() => {
    try{
      const response = await axios.get('https://8074c38230e817ac.mokky.dev/items')
      items.value = response.data
    }
    catch(err){
      error.value = err.message
    }
    finally{
      loading.value = false
    }
  }

  const onChangeSelect = (event) => {
    filters.sortBy = event.target.value
  }


  const sortSneakers = async() => {
    try{
      const response = await axios.get('https://8074c38230e817ac.mokky.dev/items?sortBy=' + filters.sortBy + '&name=*'+ search_input.value + '*')
      items.value = response.data
    }
    catch(err){
      error.value = err.message
    }
    finally{
      loading.value = false
    }
  }

  const searchCross = async() => {
    try{
      const response = await axios.get('https://8074c38230e817ac.mokky.dev/items?name=*' + search_input.value + '*&sortBy=' + filters.sortBy)
      items.value = response.data
    }
    catch(err){
      error.value = err.message
    }
    finally{
      loading.value = false
    }
  }

  onMounted(()=> {
    fetchAll()
  })

  watch(
    filters, sortSneakers
  )

  watch(search_input, searchCross)


</script>

<template>
    <div class="flex justify-between items-center">
        <h2 class="font-bold text-3xl mb-8">Все кроссовки</h2>

        <div class="flex gap-2">
          <select @change="onChangeSelect" class="py-2 outline-none border px-3 rounded-mb">
          <option value="name">По названию</option>
          <option value="price">По цене (дешёвые)</option>
          <option value="-price">По цене(дорогие)</option>
        </select>
        <div class="relative">
          <img class="absolute left-4 top-3" src="/search.svg" alt="">
          <input type="text" v-model="search_input"
          class="outline-none border py-2 rounded-md pl-11 pr-4 focus:border-gray-400"
          placeholder="Поиск...">
        </div>
        </div>
        
      </div>
      <div class="mt-10" v-if="error">
        <h1 class="text-center text-xl font-bold">Произошла ошибка загрузки товаров, попробуйте позже(</h1>
      </div>
      <div class="mt-10" v-else>
        <CardList :items="items" :on-click-favourite="toggleFavourite" :on-click-add="toggleInCart"/>
      </div>
    
</template>

<style scoped>

</style>
