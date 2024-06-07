<template>
  <div class="detail-view">
    <div id="map" class="map"></div>
    <div class="info">
      <h2>{{ startLocation }} - {{ endLocation }}</h2>
      <p v-if="distanceToStart !== null">
        Відстань до початкової точки: {{ distanceToStart }} км
      </p>
      <p v-if="distanceToEnd !== null">
        Відстань до кінцевої точки: {{ distanceToEnd }} км
      </p>
      <p>Ціна: {{ price }} ₴</p>
      <p>Вантаж: {{ cargo }}, {{ weight }} кг</p>
      <p>Опис: {{ description }}</p>
      <button @click="acceptOrder" class="accept-button">Прийняти</button>
    </div>
  </div>
</template>

<script>
import { store } from "./store";

export default {
  name: "DetailView",
  data() {
    return {
      directionsRendererToStart: null,
      directionsRendererToEnd: null,
      directionsService: null,
      startLocation: this.$route.params.startLocation,
      endLocation: this.$route.params.endLocation,
      weight: this.$route.params.weight,
      cargo: this.$route.params.cargo,
      price: this.$route.params.price,
      description: this.$route.params.description,
      distanceToStart: null,
      distanceToEnd: null,
      userLocation: null,
      map: null,
    };
  },
  methods: {
    calculateAndDisplayRoute(renderer, origin, destination, callback) {
      this.directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            callback(response);
            renderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    },
    calculateDistances() {
      if (!this.userLocation || !this.directionsService) return;

      this.calculateAndDisplayRoute(
        this.directionsRendererToStart,
        new google.maps.LatLng(this.userLocation.lat, this.userLocation.lng),
        this.startLocation,
        (response) => {
          const route = response.routes[0];
          const distanceInMeters = route.legs[0].distance.value;
          this.distanceToStart = (distanceInMeters / 1000).toFixed(2);

          this.calculateAndDisplayRoute(
            this.directionsRendererToEnd,
            this.startLocation,
            this.endLocation,
            (response) => {
              const route = response.routes[0];
              const distanceInMeters = route.legs[0].distance.value;
              this.distanceToEnd = (distanceInMeters / 1000).toFixed(2);
            }
          );
        }
      );
    },
    setUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            this.map.setCenter(this.userLocation);
            this.calculateDistances();
          },
          () => {
            window.alert("Geolocation failed");
          }
        );
      } else {
        window.alert("Geolocation is not supported by this browser.");
      }
    },
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: 48.61984320316955, lng: 22.29390605180414 },
      });
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRendererToStart = new google.maps.DirectionsRenderer({
        map: this.map,
        polylineOptions: {
          strokeColor: "blue",
        },
      });
      this.directionsRendererToEnd = new google.maps.DirectionsRenderer({
        map: this.map,
        polylineOptions: {
          strokeColor: "green",
        },
      });
      this.setUserLocation();
    },
    loadGoogleMaps() {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAMA0bfOw8alpNOiDVZ3YeJzoaXQGLCyS4`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.head.appendChild(script);
      });
    },
    acceptOrder() {
      const now = new Date();
      const order = {
        startLocation: this.startLocation,
        endLocation: this.endLocation,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        status: "Прийнято",
      };
      store.addOrder(order);
      alert("Замовлення прийнято");
    },
  },
  async mounted() {
    await this.loadGoogleMaps();
    this.initMap();
  },
};
</script>

<style scoped lang="scss">
.detail-view {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px;
  font-family: Arial, sans-serif;
}

.map {
  flex: 1 1 60%;
  height: 80vh;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.info {
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 20px;
  background-color: #37474f;
  color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  flex: 1 1 35%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.info p {
  margin: 10px 0;
  font-size: 1rem;
}
.accept-button {
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 50px;
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
