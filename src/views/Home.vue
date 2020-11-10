<template>
  <v-row dense>
    <v-col cols="12">
      <v-alert color="primary" dark icon="mdi-vuetify" border="left" prominent>
        Praesent congue erat at massa. Nullam vel sem. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
        Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros.
        Curabitur at lacus ac velit ornare lobortis.
      </v-alert>
    </v-col>
    <v-col cols="4">
      <v-card class="mt-4 mx-auto">
        <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12" max-width="calc(100% - 32px)">
          <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
        </v-sheet>
        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2">User Registrations</div>
          <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
          <v-divider class="my-2"></v-divider>
          <v-icon class="mr-2" small>mdi-clock</v-icon>
          <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card class="mx-auto">
        <v-card-title class="pa-2 text--darken-1">
          <h3 class="c-title font-weight-bold text-left grow">Aktivite</h3>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>
        <v-timeline dense>
          <v-timeline-item color="pink" small class="pb-0">
            <v-row class="pt-1">
              <v-col>
                <div class="c-timeline-title">New Icon</div>
                <div class="c-caption">
                  <div>Chat App</div>
                  <div class="grey--text">4pm</div>
                </div>
              </v-col>
            </v-row>
          </v-timeline-item>
          <v-timeline-item color="orange" small class="pb-0">
            <v-row class="pt-1">
              <v-col>
                <div class="c-timeline-title">New Icon</div>
                <div class="c-caption">
                  <div>Chat App</div>
                  <div class="grey--text">4pm</div>
                </div>
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card
          class="mt-4 mx-auto"
      >
        <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
        >
          <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
          ></v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2">
            User Registrations
          </div>
          <div class="subheading font-weight-light grey--text">
            Last Campaign Performance
          </div>
          <v-divider class="my-2"></v-divider>
          <v-icon
              class="mr-2"
              small
          >
            mdi-clock
          </v-icon>
          <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card class="mt-4 mx-auto pa-5">
        <v-card-title class="pa-2 text--darken-1">
          <h3 class="c-title font-weight-bold text-left grow">Sayfalar</h3>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
        ></v-data-table>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card class="mt-4 mx-auto pa-5">
        <v-card-title>
          <v-icon
              :color="checking ? 'red lighten-2' : 'cyan'"
              class="mr-12"
              size="170"
              @click="takePulse"
          >
            mdi-account-arrow-left
          </v-icon>
          <v-row align="start">
            <div class="caption grey--text text-uppercase">
              TOPLAM
            </div>
            <div>
          <span
              class="display-2 font-weight-black"
              v-text="avg || '—'"
          ></span>
              <strong v-if="avg">musteri</strong>
            </div>
          </v-row>

          <v-spacer></v-spacer>

          <v-btn
              icon
              class="align-self-start"
              size="28"
          >
            <v-icon>mdi-arrow-right-thick</v-icon>
          </v-btn>
        </v-card-title>

        <v-sheet color="transparent">
          <v-sparkline
              :key="String(avg)"
              :smooth="16"
              :gradient="['#f72047', '#ffd200', '#1feaea']"
              :line-width="3"
              :value="heartbeats"
              auto-draw
              stroke-linecap="round"
          ></v-sparkline>
        </v-sheet>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const exhale = ms =>
    new Promise(resolve => setTimeout(resolve, ms))

export default {
  name: 'Home',
  data() {
    return {
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ],
      checking: false,
      heartbeats: [],

    }
  },
  computed: {
    avg () {
      const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0)
      const length = this.heartbeats.length

      if (!sum && !length) return 0

      return Math.ceil(sum / length)
    },
  },
  created () {
    this.takePulse(false)
  },
  methods: {
    heartbeat () {
      return Math.ceil(Math.random() * (120 - 80) + 80)
    },
    async takePulse (inhale = true) {
      this.checking = true

      inhale && await exhale(1000)

      this.heartbeats = Array.from({ length: 20 }, this.heartbeat)

      this.checking = false
    },
  },

}
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}

.c-timeline-title {
  font-size: .875rem;
  font-weight: bold;
  line-height: 1.375rem;
  letter-spacing: .0071428571em;
  color: rgba(0, 0, 0, .6);
}

.c-caption {
  font-size: .75rem!important;
  letter-spacing: .0333333333em!important;
  line-height: 1.25rem;
}

.c-title {
  font-size: 18px!important;
  padding-left: 10px;
}
</style>
