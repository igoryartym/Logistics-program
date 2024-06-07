<template>
  <div class="message-view">
    <div class="info">
      <h2>Повідомлення</h2>
      <ul>
        <li v-for="message in messages" :key="message.id">
          {{ message.date }} <br /><br />
          {{ message.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageView",
  data() {
    return {
      messages: [
        {
          id: 1,
          date: "01.05.2024 18:00:27",
          text: "Увага! Маршрут Ужгород, вул.Загорська 175 - Мукачево, вул.Масарика 5 скасовано. Служба підтримки ",
        },
        {
          id: 2,
          date: "27.05.2024 10:52:02",
          text: "Ви отримали нове замовлення! Початкова точка: Ужгород, кінцева точка: Львів. Вантаж: Електроніка, 500 кг. Ціна: 7000 ₴. Прийміть, будь ласка, замовлення, якщо воно підходить.",
        },
        {
          id: 2,
          date: "27.05.2024 10:52:02",
          text: "Шановні водії! Логістична компанія оголошує розіграш пального від WOG! Умови прості: приймайте та виконуйте замовлення в період з 10 по 30 червня, і автоматично беріть участь у розіграші 100 літрів пального. Переможця буде визначено випадковим чином 1 липня. Бажаємо удачі та безпечних доріг!",
        },
      ],
    };
  },
};
</script>

<style scoped>
.message-view {
  margin: 20px;
  font-family: Arial, sans-serif;
}

.message-view h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}
.info ul {
  height: 100%;
  display: flex;
  list-style-type: none;
  flex-direction: column; /* Вертикальне розташування */
  overflow-y: auto; /* Додаємо вертикальну прокрутку */
  padding: 20px; /* Додаємо відступи */
  box-sizing: border-box; /* Встановлюємо box-sizing для правильного обчислення відступів */
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #37474f; /* Заливка картки */
  cursor: pointer;
  transition: transform 0.3s;
}

.message-view li {
  font-size: 1.2rem;
  background-color: #f4f4f4;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 5px;
}
</style>
