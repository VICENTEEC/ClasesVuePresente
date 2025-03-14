import { defineStore } from 'pinia'
import partidosDatos from '@/assets/partidos.json'

export const usePartidosStore = defineStore('partidos', {
  state: () => ({
    partidos: partidosDatos._embedded.partidos.map((partido) => ({
      ...partido,
      golesLocal: 0,
      golesVisitante: 0
    }))

  }),
  getters: {


  },
  actions: {
    actualizarGoles(partidoId, golesLocal, golesVisitante) {
      const partidoIndex = this.partidos.findIndex(p => p._links.self.href === partidoId)
      if (partidoIndex !== -1) {
        this.partidos[partidoIndex].golesLocal += golesLocal
        this.partidos[partidoIndex].golesVisitante += golesVisitante
      }
    },
    reiniciarGoles(partidoId) {
      console.log("Estoy en el store en reiniciar goles")
      const partidoIndex = this.partidos.findIndex(p => p._links.self.href === partidoId)
      if (partidoIndex !== -1) {
        this.partidos[partidoIndex].golesLocal = 0
        this.partidos[partidoIndex].golesVisitante = 0
      }
    },
    suprimirPartido(partidoHref) {
      console.log("Borrando desde el store el partido: ", partidoHref)
      const partidoIndex = this.partidos.findIndex(p => p._links.self.href === partidoHref)
      console.log("en el store, el partido que se va a borar tiene el indice: ", partidoIndex)

      if(partidoIndex !== -1) {
        this.partidos.splice(partidoIndex, 1)
      }
    },
    anadirPartido(nuevoPartido) {
      console.log("En el store recibo este partido: ", nuevoPartido)

      const nuevoHref = `http://pruebaapi1-lonchezas.b4a.run/api/partidos/${this.partidos.length +1}`
      const partidoConLinks = {
        ...nuevoPartido,
        _links: {
          self: {
            href: nuevoHref
          },
          partido : {
            href: nuevoHref
          },
          sucesos: {
            href:`${nuevoHref}/sucesos`
          }
        }
      }

      this.partidos.unshift(partidoConLinks)
    }
  },
})
