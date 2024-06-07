<template>
  <div class="detail-view">
    <div class="info">
      <h2>Налаштування</h2>
      <div class="form">
        <form @submit.prevent="saveSettings">
          <div class="form-group">
            <label for="username">Ім'я користувача</label>
            <input type="text" id="username" v-model="settings.username" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="settings.email" />
          </div>
          <div class="form-group">
            <label for="notifications">Повідомляти про новини</label>
            <input
              type="checkbox"
              id="notifications"
              v-model="settings.notifications"
            />
          </div>
          <div class="form-group">
            <label for="language">Мова інтерфейсу</label>
            <select v-model="settings.language" id="language">
              <option value="uk">Українська</option>
              <option value="en">Англійська</option>
              <option value="ru">Російська</option>
            </select>
          </div>
          <div class="form-group">
            <label for="unit">Одиниці вимірювання</label>
            <select v-model="settings.unit" id="unit">
              <option value="metric">Метрична система (км)</option>
              <option value="imperial">Імперська система (миля)</option>
            </select>
          </div>
          <button type="submit">Зберегти</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsView",
  data() {
    return {
      settings: {
        username: "",
        email: "",
        notifications: true,
      },
    };
  },
  methods: {
    saveSettings() {
      alert("Налаштування збережено", this.settings);
    },
  },
};
</script>

<style scoped>
.detail-view {
  font-family: Arial, sans-serif;
  display: flex;
}

.info {
  width: 100%;
  padding: 20px;
}

.info h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}
.form {
  padding: 8px 0 10px 10px;
  border-radius: 8px;
  background-color: #37474f; /* Заливка картки */
}
.form-group {
  margin: 20px 10px 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: white;
}

input[type="text"],
input[type="email"] {
  width: 70%;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 5px;
}

input[type="checkbox"] {
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 18px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #4caf50;
  color: #4caf50;
  padding: 10px 20px;
  border-radius: 10px;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #4caf50;
    color: white;
  }
  &:active {
    background-color: #38833a;
  }
}
</style>
