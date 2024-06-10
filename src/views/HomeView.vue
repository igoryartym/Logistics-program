<template>
  <section class="top_section">
    <div id="map" class="map"></div>
    <div class="inputs">
      <Card
        v-for="place in places"
        :place="place"
        :key="place.id"
        :map="map"
        @orderAccepted="removeOrder"
      />
    </div>
  </section>
</template>

<script>
import Card from "../components/Card.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeView",
  components: {
    Card,
  },
  computed: {
    ...mapGetters(["places"]),
  },
  methods: {
    ...mapActions(["removeOrder"]),
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: { lat: 48.61984320316955, lng: 22.29390605180414 },
      });
      this.setUserLocation();
    },
    setUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.map.setCenter(this.userLocation);

          if (this.userMarker) {
            this.userMarker.setPosition(this.userLocation);
          } else {
            this.userMarker = new google.maps.Marker({
              position: this.userLocation,
              map: this.map,
              title: "Your location",
            });
          }
        });
      } else {
        window.alert("Geolocation is not supported by this browser.");
      }
    },
  },
  data() {
    return {
      map: null,
      userLocation: { lat: null, lng: null },
      userMarker: null,
    };
  },
  mounted() {
    window.initMap = this.initMap;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAMA0bfOw8alpNOiDVZ3YeJzoaXQGLCyS4&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Reddit+Mono:wght@200..900&display=swap");

.top_section {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  height: calc(100vh - 72px);

  .map {
    margin-left: 10px;
    flex: 1 1 60%;
    height: 80vh;
    border-radius: 10px;
    overflow: hidden;
    -webkit-box-shadow: 5px -5px 25px -20px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px -5px 25px -20px rgba(0, 0, 0, 0.75);
    box-shadow: 5px -5px 25px -20px rgba(0, 0, 0, 0.75);
  }

  .inputs {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column; /* Вертикальне розташування */
    overflow-y: auto; /* Додаємо вертикальну прокрутку */
    padding: 20px; /* Додаємо відступи */
    box-sizing: border-box; /* Встановлюємо box-sizing для правильного обчислення відступів */
    font-family: "Raleway", sans-serif;
  }

  .card {
    margin-bottom: 20px; /* Відступ між картками */
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    cursor: pointer;
  }
}
</style>
