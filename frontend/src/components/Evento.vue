<script>
export default {
  props: ["partidosss"],
  emits: ["incrementar-goles-local", "incrementar-goles-visitante", "resetear-goles"],
  // data() {
  //   return {
  //     golesLocal: 0,
  //     golesVisitante: 0,
  //   };
  // },
  methods: {
    incrementarGolesLocal() {
      // this.golesLocal++;
      // console.log(this.golesLocal);
      this.$emit("incrementar-goles-local", this.partidosss._links.self.href);
    },
    incrementarGolesVisitante() {
      // this.golesVisitante++;
      // console.log(this.golesVisitante);
      this.$emit("incrementar-goles-visitante", this.partidosss._links.self.href);
    },
    resetearGoles() {
      console.log("click ok");
      this.$emit("resetear-goles", this.partidosss._links.self.href);
    },
  },
};
</script>

<template>





  <div class="card text-center">
    <div class="card-header">Champions League</div>
    <div class="card-body">

      <div class="container text-center">
        <div class="row justify-content-end">
          <div class="col-4 text-nowrap">
            <h3>{{ partidosss.idLocal }} VS {{ partidosss.idVisitante }}</h3>
          </div>
          <div class="col-4 icono-papelera">
            <font-awesome-icon :icon="['fas', 'trash']" class= "me-3" size="xl" />
            <font-awesome-icon :icon="['fas', 'pen-to-square']" size="xl" />
      </div>
    </div>
  </div>


      <span @click="resetearGoles">
        <font-awesome-icon :icon="['fas', 'arrows-spin']" size="xl" />
      </span>

      <p>Fecha del partido: {{ new Date(partidosss.timestamp).toLocaleDateString() }}</p>
      <span @click="incrementarGolesLocal">
        <font-awesome-icon :icon="['fas', 'futbol']" class="me-3" size="xl" />
      </span>
      <span @click="incrementarGolesVisitante">
        <font-awesome-icon :icon="['fas', 'futbol']" size="xl" style="color: #e01b24" />
      </span>
      <h1>{{ partidosss.golesLocal }} | {{ partidosss.golesVisitante }}</h1>
    </div>
    <div class="card-footer text-body-secondary">2 days ago</div>
  </div>
</template>
<style scoped>
.icono-papelera {
  text-align: right;
}
</style>
