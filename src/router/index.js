import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailView from "../views/DetailView.vue";
import SettingsView from "../views/SettingsView.vue";
import StatisticView from "../views/StatisticView.vue";
import HistoryView from "../views/HistoryView.vue";
import MessageView from "../views/MessageView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/details/:startLocation/:endLocation/:weight/:cargo/:price/:description",
    name: "DetailView",
    component: DetailView,
    props: true,
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsView,
  },
  {
    path: "/statistic",
    name: "Statistic",
    component: StatisticView,
  },
  {
    path: "/history",
    name: "History",
    component: HistoryView,
  },
  {
    path: "/messages",
    name: "Messages",
    component: MessageView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
