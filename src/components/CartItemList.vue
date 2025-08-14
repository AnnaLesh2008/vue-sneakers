<script setup>
import CartItem from './CartItem.vue'

defineProps({
  items: Array,
  DeleteItem: Function,
})
</script>

<template>
  <div class="flex flex-col flex-1 justify-between gap-5">
    <CartItem 
      v-for="item in items" 
      :key="item.id"
      :SneakerName="item.name" 
      :SneakerPrice="item.price" 
      :ImageUrl="item.imageUrl" 
      :DeleteItem="() => DeleteItem(item)"
    />
  </div>
</template>