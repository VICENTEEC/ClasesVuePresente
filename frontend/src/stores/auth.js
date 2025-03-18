import { defineStore } from 'pinia'

export const useAuthStore = defineStore('autenticacion', {
  state: () => ({
    tipoUsuario: 'Basico'

  }),

  getters: {
    esAdmin: (state) => state.tipoUsuario === 'Administrador'

  },
  
  actions: {
    cambiarNivel() {
      this.tipoUsuario = this.esAdmin ? 'Basico' : 'Administrador'
    }
  },
})
