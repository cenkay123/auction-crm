<template>
  <div>
    <div>
      <v-data-table
          :headers="headers"
          :search="search"
          :items="$store.state.pages.pages"
          sort-by="id"
          class="elevation-5"
      >
        <template v-slot:item.isMain="{ item }">
          <v-btn color="c00c292" small v-if="item.isActive" @click="updateStatus(item.id,false)">AKTİF</v-btn>
          <v-btn color="error" small v-if="!item.isActive" @click="updateStatus(item.id,true)">PASİF</v-btn>
        </template>

        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Sayfalar</v-toolbar-title>
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

            <v-btn class="mr-3" small color="red" dark>Sıfırla
              <v-icon small class="ml-1">mdi-close-outline</v-icon>
            </v-btn>
            <v-btn class="mr-3" small color="warning" dark>Export
              <v-icon small class="ml-1">mdi-export</v-icon>
            </v-btn>
            <v-btn class="mr-3" small color="primary" dark :to="{name: 'Create'}">Yeni Olustur
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
      <v-snackbar v-model="snackbar" :timeout="timeout">{{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Kapat</v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "GalleryPage",
  data() {
    return {
      search: "",
      newData: [],
      headers: [
        {text: '#',align: 'start',sortable: false,value: 'id'},
        {text: 'Baslik', value: 'title_tr'},
        {text: 'Status', value: 'isMain'},
        {text: 'İslemler', value: 'actions', sortable: false}
      ],
      snackbar: false,
      text: 'Bir sorun ile karsilasildi.',
      timeout: 2000,
    }
  },

  methods: {
    fetchPages() {
      this.api_get('/pages', this.successFetchPages, this.errorPages)
    },
    successFetchPages(response) {
      this.$store.commit('successPages', response.data)
    },
    errorPages() {
      this.snackbar = true
    },
    deleteItem(id) {
      this.mixinDeleteItem('/pages/delete/' + id, {Id: id}, this.successDelete);
    },
    successDelete() {
      this.fetchPages()
    },
    updateStatus(id, status) {
      this.mixinUpdateItem('/pages/isactiveupdate', {
        id: id,
        isActive: status,
      }, this.successUpdate)
    },
    successUpdate() {
      this.fetchPages()
    },
    routeUpdateItem(id) {
      this.$router.push({name: 'Update', params: {id: id}})
    }
  }
}
</script>

<style scoped>

</style>