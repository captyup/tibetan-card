import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return { count: 0,selected:['cardset-01'] }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})