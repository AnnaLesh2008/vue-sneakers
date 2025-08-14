<script setup>
    defineProps({
        SneakersName: String,
        SneakersPrice: Number,
        Date: String
    })
</script>

<template>
        <div class="w-full border border-gray-300 p-8 rounded-xl mb-5">
        <p><span class="font-bold">Заказ от: </span>{{ Date }}</p>
        <p><span class="font-bold">Детали: </span>{{ SneakersName }}</p>
        <p><span class="font-bold">Сумма заказа:</span> {{ SneakersPrice }} руб.</p>
    </div>
    
</template>