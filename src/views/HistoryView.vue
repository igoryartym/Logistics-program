<template>
  <div class="history-view">
    <h2>Історія замовлень</h2>
    <div class="inputs">
      <ul v-if="acceptedOrders.length">
        <li v-for="order in acceptedOrders" :key="order.id">
          {{ order.date }} {{ order.time }} <br /><br />
          {{ order.startLocation }} - {{ order.endLocation }}
        </li>
      </ul>
      <p v-else>Тут будуть ваші замовлення</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HistoryView",
  computed: {
    ...mapGetters(["acceptedOrders"]),
  },
};
</script>

<style scoped>
.history-view {
  margin: 20px;
  font-family: Arial, sans-serif;
}

.history-view h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.history-view ul {
  list-style-type: none;
}

.history-view li {
  font-size: 1.2rem;
  background-color: #f4f4f4;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 5px;
}

.inputs {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #37474f;
  cursor: pointer;
  transition: transform 0.3s;
}

.inputs p {
  text-align: center;
  color: #f4f4f4;
}
</style>
