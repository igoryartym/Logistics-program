<template>
  <header>
    <nav>
      <router-link to="/">Головна</router-link>
      <router-link to="/history">Історія замовлень</router-link>
      <router-link to="/messages">Повідомлення</router-link>
      <router-link to="/settings">Налаштування</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped land="Sass">
header {
  background-color: #2c3e50;
  color: white;
  padding: 10px;
  text-transform: uppercase;
  font-family: "Raleway", sans-serif;

  letter-spacing: 1.5px;
}
/* nav a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
} */
nav {
  display: flex;
  justify-content: space-around;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
}

nav a:hover {
  background-color: #ddd;
  color: black;
}
</style>
