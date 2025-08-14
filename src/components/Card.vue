<script setup>
    defineProps({
        ImageUrl: String,
        SneakerName: String,
        SneakerPrice: Number,
        IsLiked: Boolean,
        IsAdded: Boolean,
        onClickAdd: Function,
        onClickFavourite: Function,
    })
</script>

<template>
    <div class="">
      <div class="relative border bg-white border-slate-100 rounded-3xl p-8 cursor-pointer hover:shadow-xl transition">
        <img  @click="onClickFavourite" :src="!IsLiked ? '/like-1.svg' : '/like-2.svg'" alt="Like" class="absolute top-8 left-8" />
        <img :src="ImageUrl" alt=""/>
        <p class="mt-1">{{ SneakerName }}</p>

        <div class="flex justify-between mt-5">
          <div class="flex flex-col">
            <span class="text-gray-400">ЦЕНА:</span>
            <b>{{ SneakerPrice }} руб.</b>
          </div>

          <img :src="!IsAdded ? '/plus.svg' : '/checked.svg'" alt="" @click="onClickAdd">
        </div>
      </div>
    </div>
</template>