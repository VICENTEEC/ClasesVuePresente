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
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.bg-yellowgreen{
  background-color: yellowgreen;
}
</style>
