<script>
import participantes from "@/assets/participantes.json";

export default {
  data() {
    return {
      equipos: participantes._embedded.participantes,
      mostrarTotalEquipos: false,
      mostrarEquipos: false,
      enfrentamiento: "",
      numPartidos: 0,
    };
  },
  computed: {
    estadoEnfrentamiento() {
      return this.enfrentamiento.includes("Real Madrid") ? "El Real Madrid juega hoy" : "Hoy no juega";
    },
    avisoPartidos() {
      return this.numPartidos > 5 ? `Has generado ${this.numPartidos}` : `No has generado más de 5 partidos`;
    },
  },
  watch: {
    numPartidos(nuevoValor) {
      if (nuevoValor === 15) {
        this.$router.push({ name: "home" });
      }
    },
  },
  methods: {
    calcularEnfrentamiento() {
      if (this.equipos.length >= 2) {
        const indice1 = Math.floor(Math.random() * this.equipos.length);
        let indice2 = Math.floor(Math.random() * this.equipos.length);

        while (indice1 === indice2) {
          indice2 = Math.floor(Math.random() * this.equipos.length);
        }
        const equipo1 = this.equipos[indice1].nombre;
        const equipo2 = this.equipos[indice2].nombre;
        this.enfrentamiento = `${equipo1} VS ${equipo2}`;
        this.numPartidos++;
      } else {
        this.enfrentamiento = "No hay suficientes equipos para calcular un enfrentamiento.";
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <h1 class="titulo p-4">EQUIPOS</h1>
    <!-- <h1 :class="{'titulo-rojo':equipos.length > 19, 'titulo-azul':equipos.length <=19, 'p-4':true}">EQUIPOS</h1> -->
    <!-- <h1 :title="'Total de equipos' + equipos.length">EQUIPOS</h1> -->
    <!-- <ul :style="{fontSize: equipos.length < 30 ? '14px' : '40px'}"> -->
    <div class="container text-center mt-3">
      <div class="row">
        <div v-for="equipo in equipos" :key="equipo.id" class="col-md-3 mb-3">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ equipo.nombre }}</h5>
              <a :href="equipo._links.self.href" class="btn btn-primary btn-sm">Ver más</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <button type="button" class="btn btn-info me-3 mb-3" @click="mostrarTotalEquipos = !mostrarTotalEquipos">Número de equipos</button>
      <span v-if="mostrarTotalEquipos">{{ equipos.length }}</span>
    </div>

    <div>
      <button type="button" class="btn btn-success me-3" @click="calcularEnfrentamiento()">Calcular Enfrentamiento</button>
      <span v-if="enfrentamiento">{{ enfrentamiento }}</span>
    </div>

    <div v-if="equipos.length > 5">
      <h2>Más de 5 equipos</h2>
    </div>
    <div v-else-if="equipos.length < 5">
      <h2>Menos de 5 equipos</h2>
    </div>
    <div v-else>
      <h2>No hay equipos</h2>
    </div>

    <h2>{{ estadoEnfrentamiento }}</h2>
    <h2>{{ avisoPartidos }}</h2>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.titulo-rojo {
  color: red;
}

.titulo-azul {
  color: blue;
}

.card {
  text-align: center;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}
</style>
