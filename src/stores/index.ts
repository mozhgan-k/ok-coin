import { defineStore } from 'pinia'

export const useStore = defineStore('mainStore', {
  state: () => {
    return {
      loading: false
    }
  },
  actions: {
    changeLoadingStatus(status: boolean) {
      this.loading = status;
    },
  }
})
