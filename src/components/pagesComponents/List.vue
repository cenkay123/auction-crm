<template>
  <div>
      <v-data-table
          :headers="headers"
          :search="search"
          :items="$store.state.pages.pages"
          class="elevation-5"
      >
          <template v-slot:item.isMain="{ item }">
            <v-btn color="c00c292" small v-if="item.isMain" @click="updateStatus(item.id,false)">AKTİF</v-btn>
            <v-btn color="error" small v-if="!item.isMain" @click="updateStatus(item.id,true)">PASİF</v-btn>
          </template>
          <template v-slot:item.subPages="{ item }">
            <router-link tag="div" :to="'/subpages/' + item.id" class="text-decoration-underline"
                         style="cursor: pointer">
              Alt sayfalar({{ item.subPages.length }})
            </router-link>
          </template>
          <template v-slot:item.rank="{item}">
            <div class="rank-input">{{item.rank}}</div>

          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title class="d-none d-md-block">Sayfalar</v-toolbar-title>
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

              <v-btn class="mr-3" small color="blue-grey darken-4" dark>
                <span class="d-none d-md-inline">Sıralama kaydet</span>
                <v-icon small class="ml-0 ml-md-1">mdi-source-commit</v-icon>
              </v-btn>
              <v-btn class="mr-3" small color="blue-grey darken-4" dark @click="deleteAllClear(null)">
                <span class="d-none d-md-inline">Sıfırla</span>
                <v-icon small class="ml-0 ml-md-1">mdi-close-outline</v-icon>
              </v-btn>

              <download-excel :data="$store.state.pages.pages" name="Sayfalar.xls">
                <v-btn class="mr-3" small color="blue-grey darken-4" dark>
                  <span class="d-none d-md-inline">Export</span>
                  <v-icon small class="ml-0 ml-md-1">mdi-export</v-icon>
                </v-btn>
              </download-excel>
              <v-btn class="mr-3" small color="blue-grey darken-4" dark :to="{name: 'Create'}">Yeni Olustur
                <v-icon small class="ml-1">mdi-plus-outline</v-icon>
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon small color="teal darken-2
   accent-2" class="mr-2" v-bind="attrs" v-on="on"
                        @click="routeGalleryItem(item.id)">
                  mdi-image
                </v-icon>
              </template>
              <span>Galeri</span>
            </v-tooltip>
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
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      search: "",
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        {text: 'Baslik', value: 'title'},
        {text: 'Alt Sayfalar', value: 'subPages'},
        {text: 'Sayfa sırası', value: 'rank'},
        {text: 'Üst menu durum', value: 'isMain'},
        {text: 'İslemler', value: 'actions', sortable: false}
      ],
      snackbar: false,
      text: 'Bir sorun ile karsilasildi.',
      timeout: 2000,
    }
  },
  mounted() {
    this.fetchPages()
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
    deleteAllClear() {
      this.mixinDeleteItem('/pages/deleteall', {Id: null}, this.successDelete);
    },
    deleteItem(id) {
      this.mixinDeleteItem('/pages/delete/' + id, {Id: id}, this.successDelete);
    },
    successDelete() {
      this.fetchPages()
    },
    error(e) {
      console.log(e)
    },
    updateStatus(id, status) {
      this.mixinUpdateItem('/pages/ismainupdate', {
        page: {
          id: id,
          isMain: status,
        }
      }, this.successUpdate)
    },
    successUpdate() {
      this.fetchPages()
    },
    routeUpdateItem(id) {
      this.$router.push({name: 'Update', params: {id: id}})
    },
    routeGalleryItem(id) {
      this.$router.push({name: 'galleryPage', params: {page_id: id}})
    }

  }
}
</script>

<style scoped>

</style>
