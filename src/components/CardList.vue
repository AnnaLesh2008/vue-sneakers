<script setup>
    import Card from './Card.vue'

    

    defineProps({
        items: Array,
        onClickFavourite: Function,
        onClickAdd: Function
    })
</script>

i
<template>
    <div class="grid grid-cols-4 gap-4">
        <Card 
        v-for="item in items"
        :key="item.id"
        :ImageUrl="item.imageUrl" 
        :SneakerName="item.name" 
        :SneakerPrice="item.price"
        :IsLiked="item.isFavourite"
        :IsAdded="item.inCart"
        :onClickFavourite="() => onClickFavourite(item)"
        :onClickAdd="() => onClickAdd(item)"
        />
        
      </div>
</template>