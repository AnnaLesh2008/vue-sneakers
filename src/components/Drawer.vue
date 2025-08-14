<script setup>
    import axios from 'axios'
    import { ref, onMounted, watch, reactive } from 'vue';
    import CartItem from './CartItem.vue'
    import CartItemList from './CartItemList.vue'

    const emit = defineEmits(['closeCart'])
    const closeCartF = () =>{
        emit('closeCart', false)
    }
    const dr_items = ref([])
    const error = ref('')
    const loading = ref(true)
    const sum = ref(0)
    const nalog = ref(0)
    const create_order = ref(false)
    const fetchDrawerItems = async() => {
  try {
    const response = await axios.get('https://8074c38230e817ac.mokky.dev/items?inCart=true')
    dr_items.value = response.data
    for (let item = 0; item < dr_items.value.length; item++) {
    sum.value += dr_items.value[item].price}
    nalog.value = sum.value/100 * 5
    console.log(sum.value)
  } catch (err) {
    console.error('Ошибка загрузки корзины:', err)
  }
}

const DeleteItem = async(item) => {
  try {
    await axios.patch(`https://8074c38230e817ac.mokky.dev/items/${item.id}`, {
      inCart: false
    })
    await fetchDrawerItems()
    sum.value = 0
    for (let item = 0; item < dr_items.value.length; item++) {
    sum.value += dr_items.value[item].price}
    nalog.value = sum.value/100 * 5
  } catch (err) {
    console.error('Ошибка удаления:', err)
  }

}
const createOrder = () => {
  let names_arr = []
  let total = sum.value + nalog.value
  for (let item = 0; item < dr_items.value.length; item++) {
    names_arr.push(dr_items.value[item].name)}
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '.' + dd + '.' + yyyy;
    try{
      axios.post('https://8074c38230e817ac.mokky.dev/orders',{
        names: names_arr.join(', '),
        price: Math.round(total),
        date: today,

      })
      clearCart()
      fetchDrawerItems()
      create_order.value = true
    }
    catch(err){
      console.log(err)
    }

}
const clearCart = async () => {
  try {
    const requests = dr_items.value.map(item => 
      axios.patch(`https://8074c38230e817ac.mokky.dev/items/${item.id}`, {
        inCart: false
      })
    );
    
    await Promise.all(requests);
    
    await fetchDrawerItems();
    sum.value = 0;
    nalog.value = 0;
  } catch (err) {
    console.error('Ошибка очистки корзины:', err);
  }
};

  


onMounted(fetchDrawerItems)

</script>


<template>
    <div class="fixed top-0 left-0 w-full h-full z-10 bg-black opacity-60"></div>
  <div class="fixed top-0 right-0 bg-white h-full w-96 z-20 p-8">
        <div class="flex items-center gap-5 mb-5">
            <svg @click="closeCartF" style="transform: rotate(180deg)" class="opacity-30 cursor-pointer hover:opacity-100 transtition" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <h2 class="text-2xl font-bold">Корзина</h2>
        </div>
        <div v-if="dr_items.length">
          <CartItemList :items="dr_items" :DeleteItem="DeleteItem"/>
        <div class="my-6">
            <div class="flex gap-2">
                <span>Итого:</span>
                <div class="flex-1 border-b border-dashed"></div>
                <b>{{ sum }} ₽</b>
            </div>

            <div class="flex gap-2">
                <span>Налог 5%:</span>
                <div class="flex-1 border-b border-dashed"></div>
                <b>{{ Math.round(nalog) }} ₽</b>
            </div>

            <button style="background-color: limegreen;" class="rounded-xl py-3 w-full text-white mt-5" @click="createOrder">
                Оформить заказ
            </button>
        </div></div>
        
        <div v-else>
          <div v-if="create_order">
            <p class="m-0 text-6xl text-center mb-5">🤩</p>
          <p class="font-medium text-center text-xl">Ура, вы совершили заказ!</p>
          <p class="text-center">Скоро он появится в разделе заказов</p>
        </div>
        <div v-else>
          <p class="text-center">Вы еще не добавили ничего в корзину</p>
        </div>
          
        </div>
       

        
    </div>

</template>