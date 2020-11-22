<template>
  <div>
    <div>
      <v-data-table
          :headers="headers"
          :search="search"
          :items="gallerys"
          sort-by="id"
          class="elevation-5"
      >

        <template v-slot:item.isMain="{ item }">
          <v-btn color="c00c292" small v-if="item.isMain" @click="updateStatus(item.id,false)">AKTİF</v-btn>
          <v-btn color="error" small v-if="!item.isMain" @click="updateStatus(item.id,true)">PASİF</v-btn>
        </template>


        <template v-slot:item.pageBanners="{ item }">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-width="200"
              max-height="160"
              :src="item.pageBanners[0].pictureUrl"
            ></v-img>
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
            <v-btn class="mr-3" small color="red" dark @click="deleteAllClear()" >Sıfırla
              <v-icon small class="ml-1">mdi-close-outline</v-icon>
            </v-btn>
            <v-btn class="mr-3" small color="warning" dark>Export
              <v-icon small class="ml-1">mdi-export</v-icon>
            </v-btn>
            <v-btn class="mr-3" small color="primary" dark @click="routeGalleryCreate(page_id)" >Yeni Olustur
              <v-icon small class="ml-1">mdi-plus-outline</v-icon>
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon small color="orange lighten-1" class="mr-2" v-bind="attrs" v-on="on"
                      @click="routeUpdateItem(item.id,page_id)">
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
        {text: 'Resim',  value: 'pageBanners'},
        {text: 'Baslik', value: 'title_tr'},
        {text: 'Menu durumu', value: 'isMain'},
        {text: 'İslemler', value: 'actions', sortable: false}
      ],
      text: 'Bir sorun ile karsilasildi.',
      timeout: 2000,
      gallerys:[],
      page_id:this.$route.params.page_id
    }
  },

  mounted() {
   this.fetchGallery();
  },

  methods: {
    fetchGallery() {
      this.api_get('/subgallerypages/' + this.page_id, this.successGallery)
    },
    deleteAllClear() {
      this.mixinDeleteItem('/subgallerypages/deleteall/', {id: this.page_id}, this.successFunc);
    },
    deleteItem(id) {
      this.mixinDeleteItem('/pages/delete/' + id, {id: id}, this.successFunc);
    },
    updateStatus(id, status) {
      this.mixinUpdateItem('/pages/ismainupdate', {
        page: {
          id: id,
          isMain: status,
        }
      }, this.successFunc)
    },
    successGallery(response) {
      this.gallerys=response.data;
    },
    successFunc() {
      this.fetchGallery()
    },
    routeUpdateItem(item_id,page_id) {
     this.$router.push({name: 'GalleryUpdate', query: {item_id: item_id , page_id:page_id}})

    },
    routeGalleryCreate(page_id) {
      this.$router.push({name: 'GalleryCreate', params: {page_id: page_id}})
    }
  }
}
</script>

<style scoped>

</style>