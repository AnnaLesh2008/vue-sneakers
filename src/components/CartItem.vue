<script setup>
defineProps({
  ImageUrl: String,
  SneakerName: String,
  SneakerPrice: Number,
  DeleteItem: Function
})
</script>

<template>
  <div class="relative flex w-full border border-slate-100 rounded-xl p-4 gap-4">
    <img :src="ImageUrl" class="w-16 h-16" alt="Sneaker" />
    <div class="flex flex-col w-full">
      <p>{{ SneakerName }}</p>
      <div class="flex justify-between mt-5">
        <span class="font-bold">{{ SneakerPrice }} руб.</span>
        <img 
          @click="DeleteItem" 
          src="../../close.svg" 
          alt="Удалить"
          class="cursor-pointer"
        >
      </div>
    </div>
  </div>
</template>