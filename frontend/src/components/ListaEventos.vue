<script>
import partidos from "@/assets/partidos.json";
import Evento from "@/components/Evento.vue";

export default {
  components: { Evento },

  data() {
    return {
      eventos: partidos._embedded.partidos,
    };
  },
};
</script>

<template>
  <div class="container">
    <h1 class="titulo p-4">LISTA EVENTOS</h1>
    <ul>
      <div v-for="partido in eventos" :key="partido._links.self.href" class="mb-3">
          <Evento :partidosss="partido"></Evento>
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
</style>
