<script>
// import partidos from "@/assets/partidos.json"
import Evento from "@/components/Evento.vue"
import Formulario from "@/components/Formulario.vue"
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import ProgressSpinner from "primevue/progressspinner";
import { mapState, mapActions } from 'pinia'
import { usePartidosAPIStore } from '@/stores/partidosAPI'
import { Modal } from 'bootstrap'

export default {
  components: { Evento, Formulario, ConfirmDialog, Toast, ProgressSpinner },

  // data() {
  //   return {
  //     eventos: partidos._embedded.partidos,
  //   };
  // },

  data() {
    return {
      partidoAEditar: '',
      editando: false,
      cargando: false
    }
  },
  computed: {
    ...mapState(usePartidosAPIStore, ['partidos'])
  },

  methods: {
    ...mapActions(usePartidosAPIStore, ['actualizarGoles', 'reiniciarGoles','suprimirPartido', 'anadirPartido', 'actualizarPartido']),

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
    async borrarPartido(partidoHref) {
      this.$confirm.require({
        message: '¿Estás seguro de que quieres eliminar este partido?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Eliminar',
        rejectLabel: 'Cancelar',
        acceptClass: 'p-button-danger',
        rejectClass: 'p-button-secondary p-button-outlined',

        accept: async () => {
          this.cargando = true
          try {
            await this.suprimirPartido(partidoHref)
            const eliminado = !this.partidos.find(
              (p) => p._links.self.href === partidoHref
            )

            if (eliminado) {
              this.$toast.add({
                severity: 'info',
                summary: 'Eliminado',
                detail: 'Partido eliminado correctamente',
                life: 3000,
              })
            } else {
              this.$toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el partido',
                life: 3000,
              })
            }
          } catch (error) {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Hubo un problema al eliminar el partido',
              life: 3000,
            })
          } finally {
            this.cargando = false
          }
        },

        reject: () => {
          this.$toast.add({
            severity: 'warn',
            summary: 'Cancelado',
            detail: 'Eliminación cancelada',
            life: 3000,
          })
        },
      })
    },

    enviarFormulario(partido) {
      this.$confirm.require({
        message: '¿Deseas añadir este nuevo partido?',
        header: 'Confirmación',
        icon: 'pi pi-question-circle',
        acceptLabel: 'Sí, añadir',
        rejectLabel: 'Cancelar',
        acceptClass: 'p-button-success',
        rejectClass: 'p-button-secondary p-button-outlined',

        accept: async () => {
          this.cargando = true
          try {
            const totalAntes = this.partidos.length
            await this.anadirPartido(partido)

            const totalDespues = this.partidos.length
            const partidoAgregado = totalDespues > totalAntes

            if (partidoAgregado) {
              this.$toast.add({
              severity: 'success',
              summary: 'Añadido',
              detail: 'Partido añadido correctamente',
              life: 3000,
              })

          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo añadir el partido',
              life: 3000,
            })
          }
        } catch (error) {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un problema al añadir el partido',
            life: 3000,
        })
        } finally {
          this.cargando = false
          this.editando = false
          this.partidoAEditar = null
        }
      },

      reject: () => {
        this.$toast.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Añadido cancelado',
          life: 3000,
        })
      }
      })
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
      this.partidoAEditar = { idLocal:'', idVisitante: '', golesLocal: 0, golesVisitante: 0}
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
    <Toast />
    <ConfirmDialog></ConfirmDialog>
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
  <div v-if="cargando" class="spinner-overlay">
    <ProgressSpinner />
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
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}
</style>
