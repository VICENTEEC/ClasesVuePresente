<script>
// import partidos from "@/assets/partidos.json"
import Evento from "@/components/Evento.vue"
import { mapState, mapActions } from 'pinia'
import { usePartidosStore } from '@/stores/partidos'

export default {
  components: { Evento },

  // data() {
  //   return {
  //     eventos: partidos._embedded.partidos,
  //   };
  // },

  computed: {
    ...mapState(usePartidosStore, ['partidos'])
  },

  methods: {
    ...mapActions(usePartidosStore, ['actualizarGoles', 'reiniciarGoles']),

    incrementarGolesLocal(partidoHref) {
      console.log(partidoHref)
      this.actualizarGoles(partidoHref, 1, 0)
    },
    incrementarGolesVisitante(partidoHref) {
      console.log(partidoHref)
      this.actualizarGoles(partidoHref, 0, 1)
    },
    resetearGoles(partidoHref) {
      console.log("Estoy en ListaEventos metodo resetearGoles")
      this.reiniciarGoles(partidoHref)
    }
  }
};
</script>

<template>
  <div class="container">
    <h1 class="titulo p-4">LISTA EVENTOS</h1>
    <ul>
      <div v-for="partido in partidos" :key="partido._links.self.href" class="mb-3">
          <Evento :partidosss="partido"
          @incrementar-goles-local = "incrementarGolesLocal"
          @incrementar-goles-visitante = "incrementarGolesVisitante"
          @resetear-goles = "resetearGoles"
          ></Evento>
      </div>
    </ul>
  </div>
  
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul {
  width: 100%;
}
</style>
