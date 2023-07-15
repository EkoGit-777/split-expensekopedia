<script setup lang="ts">
import CardFrame from '@/components/container/card-container.vue'
import { useOrderStore } from '@/stores/order'

const order = useOrderStore()
</script>
<template>
  <card-frame :title="'Informasi'">
    <div class="flex text-sm justify-between">
      <div>Nomer Tagihan</div>
      <div>{{ order.orderNumber }}</div>
    </div>
    <div class="flex text-sm justify-between">
      <div>Nama Retoran</div>
      <div>{{ order.restaurantName }}</div>
    </div>
  </card-frame>
</template>