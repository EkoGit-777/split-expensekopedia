import { reactive, ref } from 'vue'
import { useApi } from '@/functions/api'

export function useCustomerModel () {
  const api = useApi()
  const loading = ref(false)
  const errors = ref<FormError>({})
  const customers = ref<CustomerType[]>([])

  const form = reactive({
    number: '',
    restaurant_name: '',
  })

  const getData = async () => {
    loading.value = true
    try {
      const response = await api.GET<ApiCollection<CustomerType>>('splitbill/customer')
      customers.value = response.data
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    errors,
    form,
    customers,
    getData,
  }
}