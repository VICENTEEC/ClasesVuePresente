import { defineStore } from "pinia"
import { getPartidos } from "@/stores/api-service.js"

export const usePartidosAPIStore = defineStore("partidosAPI", {
  state: () => ({
    partidos: [],
    // partidos: partidosData._embedded.partidos.map((partido) => ({
    //   ...partido,
    //   golesLocal: 0,
    //   golesVisitante: 0,
    // })),
  }),

  getters: {},

  actions: {
    async cargarPartidos() {
      this.partidosCargados = false
      await getPartidos().then((response) => {
        if (response.data._embedded) {
          const partidos = response.data._embedded.partidos
          this.partidos = partidos
        }
        this.partidosCargados = true
        console.log("En el store: ", this.partidos)
      })
    }
  }
})