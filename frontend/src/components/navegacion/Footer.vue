<template>
   <footer>
    <p class="fw-bold">MARCA</p>
    <p class="fw-bold">
        <a href="https://marca.com" target="blank" title="Web de marca">Web de Marca</a>
    </p>
    <font-awesome-icon :icon="['fab', 'facebook']" class="me-3" size="lg" />
    <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
   </footer>
</template>
<style scoped>
footer {
    background-color: yellowgreen;
    padding: 10px 0;
    text-align: center;
    color: black;
}
p {
    margin: 0;
    font-size: 14 px;
}
</style>