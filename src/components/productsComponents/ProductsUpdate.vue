<template>
  <v-card>
    <v-card-title class="pb-3">
      Ürün Guncelleme
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="productUpdateData['name_' + $store.state.form.selectedLanguage.code]"
                          label="Başlık" placeholder="Başlık giriniz" dense
                          outlined class="col-md-12 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field ref="name" type="number" v-model="productUpdateData.price"
                        label="Fiyat" placeholder="Fiyat" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field ref="name" type="number" v-model="productUpdateData.discountRate"
                        label="İndirim kodu" placeholder="İndirim kodu" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field ref="name" type="number" v-model="productUpdateData.code"
                        label="Ürün kodu" placeholder="Ürün kodu" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field ref="name" type="number" v-model="productUpdateData.stock"
                        label="Stok" placeholder="Stok" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="productUpdateData['description_' + $store.state.form.selectedLanguage.code]"
                        label="Açıklama Metni" placeholder="Ürün açıklaması giriniz"
                        outlined dense class="col-md-12 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-textarea>
          </v-row>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone class="mt-3" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="productUpdateData.rank"
                          class="col-md-12 px-2"
                          label="Ürün sırası" placeholder="Ürün Sırası" type="number" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-select :items="categories" v-model="productUpdateData.categoryId" default="id" item-text="title_tr"
                    item-value="id"
                    label="Kategorisi" outlined dense></v-select>
        </v-col>
        <v-col cols="6">
          <v-select :items="artist" v-model="productUpdateData.artistId" default="id" item-text="nameSurname"
                    item-value="id"
                    label="Artist seçimi" outlined dense></v-select>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="2">
              <v-checkbox v-model="productUpdateData.isActive" label="Status Durumu" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="10"></v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="2" class="py-0">
          <v-btn class="login-btn" color="success" @click="productUpdate">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";

export default {
  name: "ProductsUpdate",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      categories: [],
      artist: [],
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"}
      },
      productUpdateData: {},
    }
  },
  mounted() {
    this.fetchProduct();
    this.fetchCategories();
    this.fetchArtists();
  },
  methods: {
    fetchProduct() {
      this.api_get('/product/' + this.$route.params.id, this.successFetchItem, this.errorUpdate);
    },
    successFetchItem(response) {
      this.productUpdateData = response.data
    },
    productUpdate() {
      this.api_post('/products/update', {
        product: this.productUpdateData
      }, this.successUpdate, this.errorUpdate);
    },
    successUpdate() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Products'})
    },
    errorUpdate() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    },
    fetchCategories() {
      this.api_get('/productcategories', this.categoriesRes, this.errorUpdate);
    },
    fetchArtists() {
      this.api_get('/artists', this.artistRes, this.errorUpdate);
    },
    categoriesRes(response) {
      this.categories = response.data
    },
    artistRes(response) {
      this.artist = response.data
    },
  }
}
</script>

<style scoped>

</style>
