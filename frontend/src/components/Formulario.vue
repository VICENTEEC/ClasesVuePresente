<script>
export default {
  emits: ['formulario-relleno'],
  data() {
    return {
      idLocal: '',
      idVisitante: '',
      golesLocal: null,
      golesVisitante:null,
      timestamp: ''
    }
  },
  methods: {
    rellenarFormulario() {
      const nuevoObjetoPartido = {
        idLocal: this.idLocal,
        idVisitante: this.idVisitante,
        golesLocal: this.golesLocal,
        golesVisitante:this.golesVisitante,
        timestamp:this.timestamp
      }
      this.$emit('formulario-relleno', nuevoObjetoPartido)
    }
  }
}

</script>
<template>
  <form @submit.prevent="rellenarFormulario" class="row g-3 needs-validation" novalidate>
    <div class="col-md-6">
      <label for="idLocal" class="form-label">Equipo Local</label>
      <input type="text" class="form-control" id="idLocal" v-model="idLocal" required />
      <div class="valid-feedback">Looks good!</div>
    </div>
    <div class="col-md-6">
      <label for="idVisitante" class="form-label">Equipo Visitante</label>
      <input type="text" class="form-control" id="idVisitante" v-model="idVisitante" required />
      <div class="valid-feedback">Looks good!</div>
    </div>
    <div class="col-md-6">
      <label for="golesLocal" class="form-label">Goles Local</label>
      <input type="number" class="form-control" id="golesLocal" v-model="golesLocal" required />
      <div class="valid-feedback">Looks good!</div>
    </div>
    <div class="col-md-6">
      <label for="golesVisitante" class="form-label">Goles Visitante</label>
      <input type="number" class="form-control" id="golesVisitante" v-model="golesVisitante" required />
      <div class="valid-feedback">Looks good!</div>
    </div>
    <div class="col-md-6">
      <label for="timestamp" class="form-label">Fecha-Hora</label>
      <input type="datetime-local" class="form-control" id="timestamp" v-model="timestamp" required />
      <div class="valid-feedback">Looks good!</div>
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit">Submit form</button>
    </div>
  </form>
</template>
