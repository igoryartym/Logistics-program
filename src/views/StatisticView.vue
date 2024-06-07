<template>
  <div class="detail-view">
    <div class="info">
      <h2>Статистика замовлень</h2>
      <p>Виконані замовлення: {{ completedOrders.length }}</p>
      <p>Невиконані замовлення: {{ pendingOrders.length }}</p>
    </div>
    <div class="chart">
      <!-- Місце для майбутніх графіків чи іншої статистичної інформації -->
    </div>
  </div>
</template>

<script>
export default {
  name: "StatisticView",
  data() {
    return {
      orders: [
        { id: 1, status: "completed" },
        { id: 2, status: "pending" },
        { id: 3, status: "completed" },
        { id: 4, status: "pending" },
      ],
    };
  },
  computed: {
    completedOrders() {
      return this.orders.filter((order) => order.status === "completed");
    },
    pendingOrders() {
      return this.orders.filter((order) => order.status === "pending");
    },
  },
};
</script>

<style scoped>
.detail-view {
  display: flex;
}

.info {
  width: 40%;
  padding: 20px;
}

.chart {
  width: 60%;
  height: 100vh;
  /* Додайте свої стилі для графіків чи інших елементів */
}
</style>
