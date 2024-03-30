import { reactive, ref } from 'vue'
import { useApi } from '@/functions/api'
import { useToastStore } from '@/stores/toast'

export function useOrderCostModel () {
  const api = useApi()
  const toast = useToastStore()
  const loading = ref(false)
  const errors = ref<FormError>({})
  const orderCosts = ref<OrderCostType[]>([])
  const orderCost = ref<OrderCostType>()

  const form = reactive({
    order_id: <number|null>null,
    name: '',
    cost: 0,
  })

  const getData = async () => {
    loading.value = true
    try {
      const response = await api.GET<ApiCollection<OrderCostType>>('splitbill/orderCost')
      orderCosts.value = response.data
    } finally {
      loading.value = false
    }
  }
  const viewData = async (id: number) => {
    loading.value = true
    try {
      const response = await api.GET<OrderCostType>('splitbill/orderCost/' + id)
      orderCost.value = response
      form.order_id = response.order_id
      form.name = response.name
      form.cost = response.cost
    } finally {
      loading.value = false
    }
  }
  const postData = async (): Promise<null | OrderCostType> => {
    loading.value = true
    try {
      const response = await api.POST<OrderCostType>('splitbill/orderCost', form)
      return response
    } catch (error) {
      errors.value = api.formErrors(error)
      return null
    } finally {
      loading.value = false
    }
  }
  const putData = async (id: number): Promise<null | OrderCostType> => {
    loading.value = true
    try {
      const response = await api.PUT<OrderCostType>('splitbill/orderCost/' + id, form)
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
      await api.DELETE('splitbill/orderCost/' + id)
      toast.add('Biaya berhasil dihapus')
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
    orderCost,
    orderCosts,
    getData,
    viewData,
    postData,
    putData,
    deleteData,
  }
}