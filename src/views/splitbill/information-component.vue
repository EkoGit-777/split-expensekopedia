<script setup lang="ts">
import CardFrame from '@/components/container/card-container.vue'
import { useOrderStore } from '@/stores/order'

const order = useOrderStore()
</script>
<template>
  <card-frame :title="'Informasi'">
    <div class="flex justify-between text-sm">
      <div>Nomer Tagihan</div>
      <div>{{ order.orderNumber }}</div>
    </div>
    <div class="flex justify-between text-sm">
      <div>Nama Retoran</div>
      <div>{{ order.restaurantName }}</div>
    </div>
  </card-frame>
</template>