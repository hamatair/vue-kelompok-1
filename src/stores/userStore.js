import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Muhamad Raffi',
    email: 'raffi@example.com',
    birthDate: '15 April 2000',
    gender: 'Pria',
    height: 172,
    role: 'admin',
    weight: 68.5,
    activity: 'Olahraga ringan',
    photo: 'https://i.pravatar.cc/150?img=12',
  }),

  actions: {
    updateUser(data) {
      this.$state = { ...this.$state, ...data }
    },
    updatePhoto(photoUrl) {
      this.photo = photoUrl
    },
  },
})
