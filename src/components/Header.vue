<script setup>
  import {RouterLink} from 'vue-router'
  import { ref } from 'vue'

  const cart = ref(false);
  const emit = defineEmits(['messageSent'])
  const cartValue = () =>{
    cart.value = !cart.value
    emit('messageSent', cart.value)
  }
</script>
<template>
    <header class="flex justify-between border-b border-slate-300 px-8 py-8">
      <div class="flex items-center gap-4">
        <div>
          <img src="/logo.png" alt="Logo" class="w-10">
        </div>
          <div>
            <h2 class="font-bold uppercase text-xl">Vue Sneakers</h2>
            <p class="text-gray-500">Кроссовки, дада кроссовки а вы что думали?</p>
          </div>
        
      </div>
        <ul class="flex items-center gap-10">
          <li class="flex items-center gap-3 text-gray-500 font-semibold hover:text-black cursor-pointer">
            <img src="/cart.svg" alt="">
            <span @click="cartValue">Корзина</span>
          </li>
          <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
            <img src="/heart.svg" alt="">
          <RouterLink to="/like"><span>Закладки</span></RouterLink>
          </li>
          <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
            <img src="/profile.svg" alt="">
            <RouterLink to="/orders"><span>Заказы</span></RouterLink>
          </li>
        </ul>
      
    </header>
</template>