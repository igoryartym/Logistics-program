import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      places: [
        {
          id: 0,
          startLocation: "Ужгород, вул.Собранецька 160",
          endLocation: "Перечин, вул.Гагаріна 10",
          weight: "30",
          cargo: "Піддон з фруктами",
          price: "1050",
          description:
            "Піддон загрузять робітники, але вигрузку потрібно робити самому",
        },
        {
          id: 1,
          startLocation: "Ужгород, вул.Гойди 10",
          endLocation: "Мукачево, вул.Духновича 10",
          weight: "40",
          cargo: "Будівельні матеріали",
          price: "2125",
          description:
            "Транспортування важких будівельних матеріалів для нового будівництва в Мукачево.",
        },
        {
          id: 2,
          startLocation: "Ужгород,вул.Університетська 12",
          endLocation: "Свалява, вул.Київська 1",
          weight: "25",
          cargo: "Скло пакети",
          price: "3158",
          description:
            "Перевезення крихких скло пакетів для монтажу в новому офісному центрі в Сваляві.",
        },
        {
          id: 3,
          startLocation: "Ужгород, вул.Минайська 10",
          endLocation: "Берегово, вул.Стефаника 22",
          weight: "40",
          cargo: "Меблі",
          price: "2904",
          description:
            "Доставка меблів для облаштування нової квартири в Берегово.",
        },
        {
          id: 4,
          startLocation: "Ужгород, вул.Бабяка 48",
          endLocation: "Великі Лучки, вул.Миру 4",
          weight: "15",
          cargo: "Пластикові труби",
          price: "1739",
          description:
            "Постачання пластикових труб для водопровідної системи в Великі Лучки.",
        },
      ],
      acceptedOrders: [],
    };
  },
  mutations: {
    REMOVE_ORDER(state, orderId) {
      state.places = state.places.filter((place) => place.id !== orderId);
    },
    ACCEPT_ORDER(state, order) {
      const currentDateTime = new Date();
      order.date = currentDateTime.toLocaleDateString();
      order.time = currentDateTime.toLocaleTimeString();
      state.acceptedOrders.push(order);
      state.places = state.places.filter((place) => place.id !== order.id);
    },
  },
  actions: {
    removeOrder({ commit }, orderId) {
      commit("REMOVE_ORDER", orderId);
    },
    acceptOrder({ commit }, order) {
      commit("ACCEPT_ORDER", order);
    },
  },
  getters: {
    places: (state) => state.places,
    acceptedOrders: (state) => state.acceptedOrders,
  },
});

export default store;
