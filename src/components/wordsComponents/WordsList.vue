<template>
  <div>
    <v-data-table
        :headers="headers"
        :search="search"
        :items="$store.state.storeData.words"
        sort-by="id"
        class="elevation-5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Kelimeler</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
              v-model="search"
              label="Ara"
              hide-details
              outlined
              dense
              style="font-size: 12px; max-width: 300px"
              placeholder="Bu alandan arama yapabilirsiniz.."
          ></v-text-field>
          <v-spacer></v-spacer>

          <download-excel :data="$store.state.storeData.slayts" name="Slaytlar.xls">
            <v-btn class="mr-3" small color="warning" dark>Export
              <v-icon small class="ml-1">mdi-export</v-icon>
            </v-btn>
          </download-excel>
          <v-btn class="mr-3" small color="primary" dark :to="{name: 'WordCreate'}">Yeni Olustur
            <v-icon small class="ml-1">mdi-plus-outline</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small color="orange lighten-1" class="mr-2" v-bind="attrs" v-on="on"
                    @click="routeUpdateItem(item.id)">
              mdi-pencil
            </v-icon>
          </template>
          <span>Duzenle</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small color="red lighten-1" v-bind="attrs" v-on="on" @click="deleteItem(item.id)">mdi-delete
            </v-icon>
          </template>
          <span>Sil</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "WordsList",
  data() {
    return {
      search: '',
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        {text: 'Sef', value: 'sef'},
        {text: 'Değer TR', value: 'value_tr'},
        {text: 'Değer EN', value: 'value_en'},
        {text: 'İslemler', value: 'actions'}
      ],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.api_get('/words', this.fetchSuccess);
    },
    fetchSuccess(response) {
      this.$store.commit('successWords', response.data)
    },
    deleteItem(id) {
      this.mixinDeleteItem('/words/delete/' + id, {
        Id: id
      }, this.fetchData);
    },
    routeUpdateItem(id) {
      this.$router.push({name: 'WordUpdate', params: {id: id}})
    }

  }
}
</script>

<style scoped>

</style>
