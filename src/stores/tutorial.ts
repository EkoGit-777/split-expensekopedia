import { defineStore } from 'pinia'

export const useTutorialStore = defineStore('Tutorial', {
  state: () => ({
    showHelp: false,
    activeState: 0,
    tutorials: [
      [
        'Pertama, klik tombol + Customer untuk menambahkan data customer',
      ],
      [
        'Setelah berhasil input Customer, akan muncul daftar pesanan',
        'Klik Tambah Item untuk menambahkan pesanan pada customer',
      ],
      [
        'Bila terdapat kesalahan pada pesanan, informasi item bisa diubah atau dihapus menggunakan tombol ubah dan hapus',
      ],
      [
        'Untuk menambahkan biaya tambahan, bisa menggunakan tombol + Biaya',
        'Total biaya ini akan didistribusikan secara prorate pada semua customer',
        'Semakin besar total pesanan customer, maka akan dibebankan biaya lebih besar dibanding customer lainnya',
      ],
      [
        'Untuk menambahkan diskon, bisa menggunakan tombol + Diskon',
        'Diskon bisa diinputkan menggunakan nominal diskon, persentase, atau keduanya',
        'Apabila kedua input diisi, maka hitungan diskon akan berdasarkan persentase lebih dulu',
        'Diskon yang ada pada kolom nominal, akan menjadi total maksimum diskon yang bisa didapatkan',
        'Diskon juga akan didistribusikan secara prorate seperti biaya',
      ],
      [
        'Bila semua informasi sudah selesai ditambahkan, rangkuman pesanan bisa dilihat pada informasi customer',
      ],
      [
        'Detil pesanan bisa dilihat dengan cara klik tombol detil pesanan',
        'Bila ingin mengubah customer dan isi pesanan, klik tombol ubah',
        'Bila ingin menghapus customer, klik tombol hapus',
        'Namun perlu diperhatikan, aksi ini juga akan menghapus semua pesanan pada customer tersebut',
      ],
    ],
  }),
  getters: {
    getActiveHelp (): Array<string> {
      return this.tutorials[this.activeState]
    },
  },
  actions: {
    showHelpPage () {
      this.showHelp = true
    },
    closeHelpPage () {
      this.activeState = 0
      this.showHelp = false
    },
    nextState () {
      this.activeState++
      if (this.activeState == this.tutorials.length) {
        this.closeHelpPage()
      }
    },
  },
})