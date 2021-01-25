<template>
  <div>
    <v-data-table
        :headers="headers"
        :search="search"
        :items="artists"
        sort-by="id"
        class="elevation-5"
    >
      <template v-slot:item.isActive="{ item }">
        <v-btn color="c00c292" small v-if="item.isActive" @click="updateStatus(item.id,false)">AKTİF</v-btn>
        <v-btn color="error" small v-if="!item.isActive" @click="updateStatus(item.id,true)">PASİF</v-btn>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="d-none d-md-block">Sanatcilar</v-toolbar-title>
          <v-divider class="mx-4 d-none d-md-inline-flex" inset vertical></v-divider>
          <v-text-field
              v-model="search"
              label="Ara"
              hide-details
              outlined
              dense
              style="font-size: 12px; max-width: 300px"
              placeholder="Bu alandan arama yapabilirsiniz.."
              class="d-none d-md-flex"
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-btn class="mr-3" small color="blue-grey darken-4" dark @click="deleteAllClear()">Sıfırla
            <v-icon small class="ml-1">mdi-close-outline</v-icon>
          </v-btn>
          <download-excel :data="$store.state.storeData.artists" name="Sanatcilar.xls">
            <v-btn class="mr-3" small color="blue-grey darken-4" dark>Export
              <v-icon small class="ml-1">mdi-export</v-icon>
            </v-btn>
          </download-excel>
          <v-btn class="mr-3" small color="blue-grey darken-4" dark :to="{name: 'ArtistsCreate'}">Yeni Olustur
            <v-icon small class="ml-1">mdi-plus-outline</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.rank="{item}">
            <div class="rank-input">{{item.rank}}</div>
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
  name: "ArtistsList",
  data() {
    return {
      search: '',
      artists:[],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        {text: 'Ad Soyad', value: 'nameSurname'},
        {text: 'Status', value: 'isActive'},
        {text: 'Sayfa Sırası', value: 'rank'},
        {text: 'İslemler', value: 'actions'}
      ],
    }
  },
  mounted() {
    this.fetchArtists()
  },
  methods: {
    fetchArtists() {
      this.api_get('/artists', this.successArtists)
    },
    updateStatus(id, status) {
      this.mixinUpdateItem('/artists/isactiveupdate', {
        Artist: {Id: id, IsActive: status}
      }, this.fetchArtists)
    },
    deleteItem(id) {
      this.mixinDeleteItem('/artists/delete/' + id, {
        Artist: {Id: id}
      }, this.fetchArtists);
    },
    deleteAllClear() {
      this.mixinDeleteItem('/artists/deleteall', {Id: null}, this.fetchArtists);
    },
    successArtists(response) {
      this.artists=response.data;
    },
    routeUpdateItem(id) {
      this.$router.push({name: 'ArtistsUpdate', params: {id: id}})
    }
  }
}
</script>

<style scoped>

</style>
