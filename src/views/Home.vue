<template>
  <v-row class="home">
    <v-col md="10" sm="12" style="padding: 0" class="home-left-content">
      <div class="banner">
        <h2>Hoşgeldin, {{ $store.state.auth.userInfo.firstName }}!</h2>
        <p>{{ $store.state.auth.userInfo.userName }}, {{ $store.state.auth.userInfo.cityName }}</p>
      </div>
      <v-row style="padding:0 15px">
        <v-col cols="12">
          <v-tabs>
            <v-tab class="home-tab-text">Genel</v-tab>
            <v-tab>Analitik</v-tab>
            <v-tab>Moduler</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row class="px-3">
        <v-col cols="6" md="3">
          <v-card class="mx-auto count-card">
            <v-list-item>
              <v-list-item-content class="count-card-header">
                <v-list-item-title class="count-card-title">Ürünler</v-list-item-title>
                <v-list-item-title class="count-card-title text-right">
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div class="count-card-body">
              <h3 class="blue-grey--text">12</h3>
              <p>Toplam urun</p>
            </div>
            <v-card-actions class="count-card-footer">
              <v-btn color="indigo white--text" class="count-card-button">Goruntule</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card class="mx-auto count-card">
            <v-list-item>
              <v-list-item-content class="count-card-header">
                <v-list-item-title class="count-card-title">Ürünler</v-list-item-title>
                <v-list-item-title class="count-card-title text-right">
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div class="count-card-body">
              <h3 class="blue-grey--text">12</h3>
              <p>Toplam urun</p>
            </div>
            <v-card-actions class="count-card-footer">
              <v-btn color="indigo white--text" class="count-card-button">Goruntule</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card class="mx-auto count-card">
            <v-list-item>
              <v-list-item-content class="count-card-header">
                <v-list-item-title class="count-card-title">Ürünler</v-list-item-title>
                <v-list-item-title class="count-card-title text-right">
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div class="count-card-body">
              <h3 class="blue-grey--text">12</h3>
              <p>Toplam urun</p>
            </div>
            <v-card-actions class="count-card-footer">
              <v-btn color="indigo white--text" class="count-card-button">Goruntule</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card class="mx-auto count-card">
            <v-list-item>
              <v-list-item-content class="count-card-header">
                <v-list-item-title class="count-card-title">Ürünler</v-list-item-title>
                <v-list-item-title class="count-card-title text-right">
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div class="count-card-body">
              <h3 class="blue-grey--text">12</h3>
              <p>Toplam urun</p>
            </div>
            <v-card-actions class="count-card-footer">
              <v-btn color="indigo white--text" class="count-card-button">Goruntule</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="px-3">
        <v-col cols="12" md="6">
          <v-card>
          <div id="chart">
            <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
          </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <NewsList></NewsList>
        </v-col>
      </v-row>

    </v-col>
    <v-col cols="12" md="2">
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto count-card">
            <v-list-item>
              <v-list-item-content class="count-card-header">
                <v-list-item-title class="count-card-title" style="font-size: 13px">{{
                    currentTime | moment("dddd, HH:mm:ss")
                  }}
                </v-list-item-title>
                <v-list-item-title class="count-card-title text-right">
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div class="count-card-body" style="padding-bottom: 20px">
              <h1 class="blue-grey--text text-center">{{ currentTime | moment("MMMM") }}</h1>
              <h3 class="blue-grey--text">{{ currentTime | moment("DD") }}</h3>
              <h2 class="blue-grey--text text-center">{{ currentTime | moment("YYYY") }}</h2>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="mx-auto">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline">{{ weather.location.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ currentTime | moment("dddd, HH:mm") }}, {{ weather.current.condition.text }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-text>
              <v-row align="center">
                <v-col class="display-1" cols="6">
                  {{ weather.current.temp_c }}&deg;C
                </v-col>
                <v-col cols="6">
                  <v-img
                      :src="weather.current.condition.icon"
                      alt="Sunny image"
                      width="92"
                  ></v-img>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn text class="last_weather">son guncelleme: {{ weather.current.last_updated | moment("dddd, HH:mm") }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import NewsList from "@/components/newsComponents/NewsList";
export default {
  name: 'Home',
  components: {
    NewsList,
    apexchart: VueApexCharts,
  },
  data() {
    return {
      currentTime: new Date(),
      weather: {},

      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          type: 'donut',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 400
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    }
  },
  created() {
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },
  mounted() {
    this.havaDurumu()
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = new Date();
    },
    havaDurumu() {
      fetch("http://api.weatherapi.com/v1/current.json?key=5f531f228a864fcc96735903210801&q=istanbul", {
        "method": "GET",
        "content-type": 'application/json'
      }).then(response => response.text()).then(text => {
        try {
          this.weather = JSON.parse(text)
        } catch (err) {
          console.error(err)
        }
      })
    }
  },

}
</script>

<style>
.banner {
  color: #fff;
  min-height: 120px;
  display: grid;
  background: linear-gradient(to left, #122230 0%, #192d3e 100%);
  min-height: 120px;
  background-size: cover;
  background-color: #122230;
  padding: 2rem;
}

.banner h2 {
  font-size: 2.2rem;
  padding-top: 0.5rem;
  padding-bottom: .5rem;
  line-height: 1.2;
  font-weight: 400;
}

.home {
  margin-top: -12px;
}

.count-card-title {
  font-size: 14px;
  font-weight: 600;
  flex: 0 0 50% !important;
}

.count-card-body {
  display: grid;
  margin: 0 auto;
  justify-content: center;
}

.count-card-body h3 {
  font-size: 4rem;
  text-align: center;
  line-height: 1;
}

.count-card-footer {
  border-top: 1px solid #ccc;
}

.count-card-button {
  font-size: 12px !important;
  font-weight: bold !important;
}

.home-left-content {
  border-right: 1px solid #ccc;
}

.home-tab-text {
  font-size: 13px !important;
  font-weight: 800 !important;
}

.last_weather {
  font-size: 11px!important;
}
</style>
