<template>
  <div>
    <v-data-table
        :headers="headers"
        :search="search"
        :items="$store.state.storeData.products"
        sort-by="id"
        class="elevation-5"
    >
      <template v-slot:item.isActive="{ item }">
        <v-btn color="c00c292" small v-if="item.isActive" @click="updateStatus(item.id,false)">AKTİF</v-btn>
        <v-btn color="error" small v-if="!item.isActive" @click="updateStatus(item.id,true)">PASİF</v-btn>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Ürünler</v-toolbar-title>
          <v-divider class="mx-4 d-none d-md-flex" inset vertical></v-divider>
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

          <v-btn class="mr-3" small color="blue-grey darken-4" dark @click="deleteAllClear(null)">
            <span class="d-none d-md-inline">Sıfırla</span>
            <v-icon small class="ml-0 ml-md-1">mdi-close-outline</v-icon>
          </v-btn>
          <download-excel :data="products" name="Categories.xls">
            <v-btn class="mr-3" small color="blue-grey darken-4" dark>Export
              <v-icon small class="ml-1">mdi-export</v-icon>
            </v-btn>
          </download-excel>
          <v-btn class="mr-3" small color="blue-grey darken-4" dark :to="{name: 'ProductsCreate'}">Yeni Olustur
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
  name: "ProductsList",
  data() {
    return {
      search: '',
      products: [],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        {text: 'Ürün adı', value: 'name_tr'},
        {text: 'Status', value: 'isActive'},
        {text: 'Sayfa Sırası', value:'rank'},
        {text: 'İslemler', value: 'actions'}
      ],
    }
  },
  mounted() {
    this.fetchProducts()
  },

  methods: {
    fetchProducts() {
      this.api_get('/products', this.fetchSuccess, this.fetchError);
    },
    fetchSuccess(response) {
      this.$store.commit('successProducts',response.data)
    },
    fetchError() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    },
    updateStatus(id, status) {
      this.mixinUpdateItem('/products/isactiveupdate', {
        product: {
          Id: id,
          IsActive: status
        }
      }, this.fetchProducts)
    },
    deleteItem(id) {
      this.mixinDeleteItem('/product/delete/' + id, {
        Id: id
      }, this.fetchProducts);
    },
    routeUpdateItem(id) {
      this.$router.push({name: 'ProductsUpdate', params: {id: id}})
    },
    deleteAllClear() {
      this.mixinDeleteItem('/products/deleteall', {Id: null}, this.fetchProducts);
    },

  }
}
</script>

<style scoped>

</style>