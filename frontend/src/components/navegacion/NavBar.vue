<script>
import { useAuthStore } from "@/stores/auth";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(useAuthStore, ["tipoUsuario", "esAdmin"]),

    isAdminModel: {
      get() {
        return this.esAdmin;
      },
      set() {
        this.cambiarNivel();
      },
    },
  },
  methods: {
    ...mapActions(useAuthStore, ['cambiarNivel'])
  }


};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-yellowgreen">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/home">HOME</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/equipos">Equipos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/listaeventos">Lista Eventos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/entradas">Entradas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/listaeventosAPI">Lista Eventos API</router-link>
          </li>
        </ul>
      </div>

      <div class="form-check form-switch form-check-reverse">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="isAdminModel"/>
        <label class="form-check-label" for="flexSwitchCheckDefault"> {{ tipoUsuario }} </label>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.bg-yellowgreen {
  background-color: yellowgreen;
}
</style>
