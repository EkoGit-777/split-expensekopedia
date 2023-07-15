import { reactive, ref } from 'vue'
import { useApi } from '@/functions/api'
import { useToastStore } from '@/stores/toast'
import { OrderType } from '@/types/order'
import { useOrderStore } from './../stores/order'
import { OrderFullType } from './../types/order-full.d'

export function useOrderModel () {
  const api = useApi()
  const orderStore = useOrderStore()
  const toast = useToastStore()
  const loading = ref(false)
  const errors = ref<FormError>({})
  const orders = ref<OrderType[]>([])
  const order = ref<OrderType>()

  const form = reactive({
    number: '',
    restaurant_name: '',
  })

  const getData = async () => {
    loading.value = true
    try {
      const response = await api.GET<ApiCollection<OrderType>>('splitbill/order')
      orders.value = response.data
    } finally {
      loading.value = false
    }
  }
  const viewData = async (id: number) => {
    loading.value = true
    try {
      const response = await api.GET<OrderFullType>('splitbill/order/' + id)
      order.value = response
      orderStore.initOrder(response)
      form.number = response.number
      form.restaurant_name = response.restaurant_name
    } finally {
      loading.value = false
    }
  }
  const postData = async (): Promise<null | OrderType> => {
    loading.value = true
    try {
      const response = await api.POST<OrderType>('splitbill/order', form)
      return response
    } catch (error) {
      errors.value = api.formErrors(error)
      return null
    } finally {
      loading.value = false
    }
  }
  const putData = async () => {
    loading.value = true
    let status = false
    try {
      await api.PUT('splitbill/order/' + order.value?.id, form)
      toast.add('Data berhasil disimpan')
      status = true
    } catch (error) {
      errors.value = api.formErrors(error)
    } finally {
      loading.value = false
      return status
    }
  }
  const deleteData = async () => {
    loading.value = true
    let status = false
    try {
      await api.DELETE('splitbill/order/' + order.value?.id)
      toast.add('Data berhasil dihapus')
      status = true
    } catch (error) {
      errors.value = api.formErrors(error)
    } finally {
      loading.value = false
      return status
    }
  }

  return {
    loading,
    errors,
    form,
    order,
    orders,
    getData,
    viewData,
    postData,
    putData,
    deleteData,
  }
}