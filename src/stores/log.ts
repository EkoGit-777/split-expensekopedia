import { defineStore } from 'pinia'

export const useLogStore = defineStore('Log', {
  state: () => ({
    // format log :
    // version => (string) version of app
    // date => (string date) date when version is released yyyy-mm-dd
    // changes => (array of string) list of changes
    logs: [
      {
        version: '1.1.1',
        date: '2024-03-31',
        changes: [
          'Add order list',
          'Minor fix',
        ],
      },
      {
        version: '1.1.0',
        date: '2023-07-15',
        changes: [
          'Add login screen',
          'Redesign interface',
        ],
      },
      {
        version: '1.0.0',
        date: '2022-10-09',
        changes: [
          'Initial releas',
        ],
      },
    ],
  }),
  getters: {
  },
  actions: {
  },
})