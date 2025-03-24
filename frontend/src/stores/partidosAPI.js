import { defineStore } from "pinia"
import { getPartidos, postPartidos, deleteEntidad, putEntidad } from "@/stores/api-service.js"

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
    },

    async anadirPartido(nuevoPartido) {
      console.log("En el store, lo que recibe: ", nuevoPartido)
      try {
        const responsePartidos = await postPartidos(nuevoPartido)
        console.log("La respuesta de la API es: ", responsePartidos)
        if (responsePartidos.status === 200) {
          const partidoAgregado = { ...nuevoPartido, _links: responsePartidos.data._links }
          this.partidos.unshift(partidoAgregado)
        }
      } catch (error) {
        console.error("Error: ", error)
      }
    },

    async suprimirPartido(partidoId) {
      console.log("En el store, lo que recibe: ", partidoId)
      try {
        const response = await deleteEntidad(partidoId)
        if (response.status === 200) {
          const index = this.partidos.findIndex(p => p._links.self.href === partidoId)
          if (index !== -1) {
            this.partidos.splice(index, 1)
          }
        }
      } catch (error) {
        console.error("Error: ", error)
      }
    },

    async actualizarPartido(partidoId) {
      console.log("Desde el store, partido a actualizar", partidoId)
      const index = this.partidos.findIndex(p => p._links.self.href === partidoId.url)
      console.log("Desde el store, índice del partido a actualizar", index)
      if (index !== -1) {
        try {
          const datosActualizados = {
            idLocal: partidoId.idLocal,
            idVisitante: partidoId.idVisitante,
            golesLocal: partidoId.golesLocal,
            golesVisitante: partidoId.golesVisitante
          }
          const response = await putEntidad(this.partidos[index]._links.self.href, datosActualizados)

          if (response.status === 200) {
            this.partidos[index] = { ...this.partidos[index], ...datosActualizados }
            console.log("Partido actualizado correctamente en el store", partidoId.url)
          } else {
            console.error("Error al actualizar el partido")
          }
        } catch (error) {
          console.error("Error: ", error)
        }
      } else {
        console.log("Partido no encontrado")
      }
    },

    async actualizarGoles(partidoId, golesLocal, golesVisitante) {
      console.log("En el store, actualizando goles: ", partidoId, golesLocal, golesVisitante)
      const partidoIndex = this.partidos.findIndex(p => p._links.self.href === partidoId)
      if (partidoIndex !== -1) {
        try {
          const datosActualizados = {
            idLocal: this.partidos[partidoIndex].idLocal,
            idVisitante: this.partidos[partidoIndex].idVisitante,
            golesLocal: this.partidos[partidoIndex].golesLocal + golesLocal,
            golesVisitante: this.partidos[partidoIndex].golesVisitante + golesVisitante,
          }

          const response = await putEntidad(this.partidos[partidoIndex]._links.self.href, datosActualizados)

          if (response.status === 200) {
            this.partidos[partidoIndex].golesLocal = datosActualizados.golesLocal
            this.partidos[partidoIndex].golesVisitante = datosActualizados.golesVisitante
            console.log("Goles actualizados en API y en el store", partidoId)
          } else {
            console.error("la petición PUT no fue exitosa")
          }
        } catch (error) {
          console.error("Error: ", error)
        }
      }
    },

     // MALA PRÁCTICA. HABRÍA QUE REUTILIZAR el código de actualizarGoles ¡¡¡Y NO HACER reiniciarGoles!!!
     async reiniciarGoles(partidoId) {
      const partidoIndex = this.partidos.findIndex(p => p._links.self.href === partidoId)
      if (partidoIndex !== -1) {
        try {
          const datosActualizados = {
            idLocal: this.partidos[partidoIndex].idLocal,
            idVisitante: this.partidos[partidoIndex].idVisitante,
            golesLocal: 0,
            golesVisitante: 0
          }

          const response = await putEntidad(this.partidos[partidoIndex]._links.self.href, datosActualizados)

          if (response.status === 200) {
            this.partidos[partidoIndex] = { ...this.partidos[partidoIndex], ...datosActualizados }
            console.log("Goles reiniciados en el store", partidoId)
          } else {
            console.error("error al reiniciar los goles.")
          }
        } catch (error) {
          console.error("Error: ", error)
        }
      } else {
        console.log("Partido no encontrado")
      }
    }
  },
})