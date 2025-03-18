<script>
// import partidos from "@/assets/partidos.json"
import Evento from "@/components/Evento.vue"
import Formulario from "@/components/Formulario.vue"
import { mapState, mapActions } from 'pinia'
import { usePartidosStore } from '@/stores/partidos'
import { Modal } from 'bootstrap'

export default {
  components: { Evento, Formulario },

  // data() {
  //   return {
  //     eventos: partidos._embedded.partidos,
  //   };
  // },

  data() {
    return {
      partidoAEditar: '',
      editando: false
    }
  },
  computed: {
    ...mapState(usePartidosStore, ['partidos'])
  },

  methods: {
    ...mapActions(usePartidosStore, ['actualizarGoles', 'reiniciarGoles','suprimirPartido', 'anadirPartido', 'actualizarPartido']),

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
    },
    borrarPartido(partidoHref) {
      console.log("componente padre. Se va a leiminar el partido: ", partidoHref)
      this.suprimirPartido(partidoHref)
    },
    enviarFormulario(partido) {
      console.log("Partido creado recibido en ListaEventos.vue", partido)
      this.anadirPartido(partido)
      this.editando = false,
      this.partidoAEditar = null
    },
    editarPartido(partido){
      console.log("Estoy en componente ListaEventos.vue, voy a editar: ", partido)
      this.partidoAEditar = partido,
      this.editando = true
      let modalElement = this.$refs.formularioModal
      let bsModal = new Modal(modalElement)
      bsModal.show()
    },
    actualizarFormulario (partidoActualizado) {
      console.log("partido a actualizar: ", partidoActualizado)
      this.actualizarPartido(partidoActualizado)
      this.editando = false,
      this.partidoAEditar = null
    },
    abrirModalNuevoPartido() {
      this.partidoAEditar = { idLocal:'', idVisitante: '', golesLocal: 0, golesVisitante: 0, timestamp:''}
      this.editando= false
      let modalElement = this.$refs.formularioModal
      let bsModal = new Modal(modalElement)
      bsModal.show()
    },
    resetarPartidoyEditar(){
      this.editando = false,
      this.partidoAEditar = null
    }
  }
};
</script>

<template>
  <div class="container">
    <h1 class="titulo p-4">LISTA EVENTOS</h1>
    <!-- <button type="button" class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> -->
      <button type="button" class="btn btn-success mb-3" @click="abrirModalNuevoPartido">
      Añadir
    </button>    
    <ul>
      <div v-for="partido in partidos" :key="partido._links.self.href" class="mb-3">
          <Evento :partidosss="partido"
          @incrementar-goles-local = "incrementarGolesLocal"
          @incrementar-goles-visitante = "incrementarGolesVisitante"
          @resetear-goles = "resetearGoles"
          @eliminarPartido = "borrarPartido"
          @editar-partido = "editarPartido"
          ></Evento>
      </div>
    </ul>
  </div>
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>
<!-- Modal -->
<div class="modal fade" id="staticBackdrop" ref = "formularioModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetarPartidoyEditar"></button>
      </div>
      <div class="modal-body">
        <Formulario
        :partido="partidoAEditar"
        :editando="editando"
        @formulario-actualizado = actualizarFormulario
        @formulario-relleno=enviarFormulario></Formulario>
      </div>
    
    </div>
  </div>
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
