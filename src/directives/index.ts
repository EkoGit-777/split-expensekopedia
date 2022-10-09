import vClickOutside from 'click-outside-vue3'

/**
 * Trigger focus event when component is loaded.
 */
const focus = {
  mounted (el) {
    if (el instanceof HTMLDivElement) {
      const component = el.querySelector('input, textarea') as HTMLElement | null
      if (component != null) {
        component.focus()
      }
    } else {
      el.focus()
    }
  },
}

export default {
  install (Vue) {
    Vue.directive('focus', focus)
    Vue.directive('click-outside', vClickOutside.directive)
  },
}