import { reactive, ref } from 'vue'
import { useApi } from '@/functions/api'
import { useToastStore } from '@/stores/toast'
import { CustomerOrderType } from '@/types/customer-order'

export function useCustomerOrderModel () {
  const api = useApi()
  const toast = useToastStore()
  const loading = ref(false)
  const errors = ref<FormError>({})
  const customerOrders = ref<CustomerOrderType[]>([])
  const customerOrder = ref<CustomerOrderType>()

  const form = reactive({
    customer_id: <number|null>null,
    order_id: <number|null>null,
  })

  const getData = async () => {
    loading.value = true
    try {
      const response = await api.GET<ApiCollection<CustomerOrderType>>('splitbill/customerOrder')
      customerOrders.value = response.data
    } finally {
      loading.value = false
    }
  }
  const viewData = async (id: number) => {
    loading.value = true
    try {
      const response = await api.GET<CustomerOrderType>('splitbill/customerOrder/' + id)
      customerOrder.value = response
      form.customer_id = response.customer_id
      form.order_id = response.order_id
    } finally {
      loading.value = false
    }
  }
  const postData = async (): Promise<null | CustomerOrderType> => {
    loading.value = true
    try {
      const response = await api.POST<CustomerOrderType>('splitbill/customerOrder', form)
      return response
    } catch (error) {
      errors.value = api.formErrors(error)
      return null
    } finally {
      loading.value = false
    }
  }
  const putData = async (id: number): Promise<null | CustomerOrderType> => {
    loading.value = true
    try {
      const response = await api.PUT<CustomerOrderType>('splitbill/customerOrder/' + id, form)
      return response
    } catch (error) {
      errors.value = api.formErrors(error)
      return null
    } finally {
      loading.value = false
    }
  }
  const deleteData = async () => {
    loading.value = true
    let status = false
    try {
      await api.DELETE('splitbill/customerOrder/' + customerOrder.value?.id)
      toast.add('Data berhasil dihapus')
      status = true
    } catch (error) {
      errors.value = api.formErrors(error)
    } finally {
      loading.value = false
      return status
    }
  }
  const clearItem = async (id: number) => {
    loading.value = true
    let status = false
    try {
      await api.DELETE('splitbill/customerOrder/clearItem/' + id)
      toast.add('Item berhasil dihapus')
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
    customerOrder,
    customerOrders,
    getData,
    viewData,
    postData,
    putData,
    deleteData,
    clearItem,
  }
}