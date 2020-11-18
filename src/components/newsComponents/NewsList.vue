<template>
  <div>
    <v-data-table
        :headers="headers"
        :search="search"
        :items="$store.state.storeData.news"
        sort-by="id"
        class="elevation-5"
    >
      <template v-slot:item.isActive="{ item }">
        <v-btn color="c00c292" small v-if="item.isActive" @click="updateStatus(item.id,false)">AKTİF</v-btn>
        <v-btn color="error" small v-if="!item.isActive" @click="updateStatus(item.id,true)">PASİF</v-btn>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Haberler</v-toolbar-title>
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

          <v-btn class="mr-3" small color="red" dark @click="deleteAllClear()">Sıfırla
            <v-icon small class="ml-1"  >mdi-close-outline</v-icon>
          </v-btn>
          <v-btn class="mr-3" small color="warning" dark>Export
            <v-icon small class="ml-1">mdi-export</v-icon>
          </v-btn>
          <v-btn class="mr-3" small color="primary" dark :to="{name: 'NewsCreate'}">Yeni Olustur
            <v-icon small class="ml-1">mdi-plus-outline</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.createdAt="{item}">
        <div>{{ item.createdAt | moment("dddd, MMMM Do YYYY") }}</div>
      </template>
      <template v-slot:item.endDate="{item}">
        <div>{{ item.endDate | moment("dddd, MMMM Do YYYY") }}</div>
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
  name: "NewsList",
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
        {text: 'Baslik', value: 'title_tr'},
        {text: 'Status', value: 'isActive'},
        {text: 'Yayinlanma tarihi', value: 'createdAt', sortable: false},
        {text: 'Sonlanacagi tarihi', value: 'endDate', sortable: false},
        {text: 'İslemler', value: 'actions'}
      ],
    }
  },
  mounted() {
    this.fetchNews()
  },
  methods: {
    fetchNews() {
      this.api_get('/news', this.successNews)
    },
    updateStatus(id, status) {
      this.mixinUpdateItem('/news/isactiveupdate', {
       news: {Id: id, IsActive: status}
      }, this.fetchNews)
    },
    deleteItem(id) {
      this.mixinDeleteItem('/news/delete/' + id, {
        news: {Id: id}
      }, this.fetchNews);
    },
    deleteAllClear() {
      this.mixinDeleteItem('/news/deleteall', {Id: null}, this.fetchNews);
    },
    routeUpdateItem(id) {
      this.$router.push({name: 'NewsUpdate', params: {id: id}})
    },
     successNews(response) {
      this.$store.commit('successNews', response.data)
    },
  }
}
</script>

<style scoped>

</style>
