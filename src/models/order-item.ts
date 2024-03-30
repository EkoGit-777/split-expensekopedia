import { reactive, ref } from 'vue'
import { useApi } from '@/functions/api'
import { useToastStore } from '@/stores/toast'

export function useOrderItemModel () {
  const api = useApi()
  const toast = useToastStore()
  const loading = ref(false)
  const errors = ref<FormError>({})
  const orderItems = ref<OrderItemType[]>([])
  const orderItem = ref<OrderItemType>()

  const form = reactive({
    customer_order_id: <number|null>null,
    name: '',
    price: 0,
  })

  const getData = async () => {
    loading.value = true
    try {
      const response = await api.GET<ApiCollection<OrderItemType>>('splitbill/orderItem')
      orderItems.value = response.data
    } finally {
      loading.value = false
    }
  }
  const viewData = async (id: number) => {
    loading.value = true
    try {
      const response = await api.GET<OrderItemType>('splitbill/orderItem/' + id)
      orderItem.value = response
      form.customer_order_id = response.customer_order_id
      form.name = response.name
      form.price = response.price
    } finally {
      loading.value = false
    }
  }
  const postData = async (): Promise<null | OrderItemType> => {
    loading.value = true
    try {
      const response = await api.POST<OrderItemType>('splitbill/orderItem', form)
      return response
    } catch (error) {
      errors.value = api.formErrors(error)
      return null
    } finally {
      loading.value = false
    }
  }
  const putData = async (id: number): Promise<null | OrderItemType> => {
    loading.value = true
    try {
      const response = await api.PUT<OrderItemType>('splitbill/orderItem/' + id, form)
      return response
    } catch (error) {
      errors.value = api.formErrors(error)
      return null
    } finally {
      loading.value = false
    }
  }
  const deleteData = async (id: number) => {
    loading.value = true
    let status = false
    try {
      await api.DELETE('splitbill/orderItem/' + id)
      toast.add('Item berhasil dihapus')
      status = true
    } catch (error) {
      errors.value = api.formErrors(error)
    } finally {
      loading.value = false
    }
    return status
  }

  return {
    loading,
    errors,
    form,
    orderItem,
    orderItems,
    getData,
    viewData,
    postData,
    putData,
    deleteData,
  }
}