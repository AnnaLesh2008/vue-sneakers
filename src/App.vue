<script setup>
  import { ref, onMounted, watch, reactive } from 'vue';
  import axios from 'axios';
  import Header from './components/Header.vue'
  import Drawer from './components/Drawer.vue';
  const cart = ref(false)
  const handleMessage = (msg) => {
    cart.value = !cart.value
  }
  const closeCart = (msg) => {
    cart.value = false
  }
  
</script>

<template>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header @message-sent="handleMessage"/>
    
    <div class="p-10">
      <router-view/>
     
    </div>
    <Drawer v-if="cart" @close-cart="closeCart"/>
    
    
  </div>
  
</template>

<style scoped>

</style>
