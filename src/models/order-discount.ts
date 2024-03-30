import { reactive, ref } from 'vue'
import { useApi } from '@/functions/api'
import { useToastStore } from '@/stores/toast'

export function useOrderDiscountModel () {
  const api = useApi()
  const toast = useToastStore()
  const loading = ref(false)
  const errors = ref<FormError>({})
  const orderDiscounts = ref<OrderDiscountType[]>([])
  const orderDiscount = ref<OrderDiscountType>()

  const form = reactive({
    order_id: <number|null>null,
    nominal: 0,
    percentage: 0,
  })

  const getData = async () => {
    loading.value = true
    try {
      const response = await api.GET<ApiCollection<OrderDiscountType>>('splitbill/orderDiscount')
      orderDiscounts.value = response.data
    } finally {
      loading.value = false
    }
  }
  const viewData = async (id: number) => {
    loading.value = true
    try {
      const response = await api.GET<OrderDiscountType>('splitbill/orderDiscount/' + id)
      orderDiscount.value = response
      form.order_id = response.order_id
      form.nominal = response.nominal
      form.percentage = response.percentage
    } finally {
      loading.value = false
    }
  }
  const postData = async (): Promise<null | OrderDiscountType> => {
    loading.value = true
    try {
      const response = await api.POST<OrderDiscountType>('splitbill/orderDiscount', form)
      return response
    } catch (error) {
      errors.value = api.formErrors(error)
      return null
    } finally {
      loading.value = false
    }
  }
  const putData = async (id: number): Promise<null | OrderDiscountType> => {
    loading.value = true
    try {
      const response = await api.PUT<OrderDiscountType>('splitbill/orderDiscount/' + id, form)
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
      await api.DELETE('splitbill/orderDiscount/' + id)
      toast.add('Diskon berhasil dihapus')
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
    orderDiscount,
    orderDiscounts,
    getData,
    viewData,
    postData,
    putData,
    deleteData,
  }
}