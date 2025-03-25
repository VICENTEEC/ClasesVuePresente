<script>
import NavBar from "@/components/navegacion/NavBar.vue";
import Footer from "@/components/navegacion/Footer.vue";
import { mapState, mapActions } from "pinia";
import { usePartidosAPIStore } from "@/stores/partidosAPI";
import ProgressSpinner from "primevue/progressspinner";

export default {
  components: { NavBar, Footer, ProgressSpinner },
  computed: {
    ...mapState(usePartidosAPIStore, ["partidosCargados", "partidos"]),
  },
  methods: {
    ...mapActions(usePartidosAPIStore, ["cargarPartidos"]),
  },
  mounted() {
    this.cargarPartidos();
  },
};
</script>
<template>
  <div class="app-container">
    <NavBar></NavBar>
    <main>
      <div v-if="!partidosCargados" class="spinner-container">
        <ProgressSpinner />
      </div>
      <router-view v-else></router-view>
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 99vh;
}
main {
  flex: 1;
}
.spinner-container {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
