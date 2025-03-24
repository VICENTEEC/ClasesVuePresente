<script>
import NavBar from "@/components/navegacion/NavBar.vue"
import Footer from "@/components/navegacion/Footer.vue"
import { mapState, mapActions } from 'pinia'
import { usePartidosAPIStore } from '@/stores/partidosAPI'

export default {
  components: { NavBar, Footer },
  computed: {
    ...mapState(usePartidosAPIStore, ['partidos'])
  },
  methods: {
    ...mapActions(usePartidosAPIStore, ['cargarPartidos'])
  },
  mounted() {
    this.cargarPartidos()
  }
}
</script>
<template>
  <div class="app-container">
    <NavBar></NavBar>
    <main>
      <router-view></router-view>
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
</style>
