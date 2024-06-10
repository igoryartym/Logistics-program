<template>
  <div class="card" @click="openDetailView">
    <div class="price-info" :style="{ backgroundColor: '#ffeb3b' }">
      <p>{{ place.price }} ₴</p>
      <div v-if="distance !== null" class="distance-info">
        <p>{{ distance }} км</p>
      </div>
    </div>
    <div class="location-info">
      <p>{{ startLocation }} - {{ endLocation }}</p>
    </div>
    <p>Вантаж: {{ cargo }}, {{ weight }} кг</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    place: {
      type: Object,
      required: true,
    },
    map: {
      required: true,
    },
  },
  data() {
    return {
      userLocation: null,
      startLocation: this.place.startLocation,
      endLocation: this.place.endLocation,
      weight: this.place.weight,
      cargo: this.place.cargo,
      price: this.place.price,
      description: this.place.description,
      distance: null,
    };
  },
  methods: {
    openDetailView() {
      this.$router.push({
        name: "DetailView",
        params: {
          id: this.place.id,
          startLocation: this.place.startLocation,
          endLocation: this.place.endLocation,
          weight: this.place.weight,
          cargo: this.place.cargo,
          price: this.place.price,
          description: this.place.description,
        },
      });
    },
    acceptOrder() {
      this.$emit("orderAccepted", this.place.id);
    },
    calculateDistance() {
      if (!this.userLocation) return;

      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: new google.maps.LatLng(
            this.userLocation.lat,
            this.userLocation.lng
          ),
          destination: this.endLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            const route = response.routes[0];
            const distanceInMeters = route.legs[0].distance.value;
            this.distance = (distanceInMeters / 1000).toFixed(2); // Конвертуємо метри у кілометри
          } else {
            window.alert("Directions request failed due to " + status);
          }
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
            this.calculateDistance();
          },
          () => {
            window.alert("Geolocation failed");
          }
        );
      } else {
        window.alert("Geolocation is not supported by this browser.");
      }
    },
  },
  async mounted() {
    this.setUserLocation();
  },
};
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 20px;
  background-color: #37474f; /* Заливка картки */
  color: #ffffff; /* Колір тексту */
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.price-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
}

.price-info p {
  font-size: 1.2em;
  margin: 0;
  color: #000000; /* Колір тексту ціни */
}

.location-info p,
.distance-info p {
  margin: 5px 0;
}

.distance-info {
  font-weight: bold;
}

button {
  background-color: #4caf50; /* Зелений колір кнопки */
  color: white; /* Колір тексту */
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049; /* Темніший зелений при наведенні */
  }
}
</style>
