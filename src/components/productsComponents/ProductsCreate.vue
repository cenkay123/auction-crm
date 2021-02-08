<template>
  <v-card>
    <v-card-title class="pb-3">Yeni Ürün ekleme</v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="productspostData['name_' + $store.state.form.selectedLanguage.code]"
                          label="Ürün adı" placeholder="Ürün adı" dense
                          outlined class="col-md-12">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-text-field ref="name" v-model="productspostData.price"
                          class="col-md-12 px-2"
                          label="Fiyat" placeholder="Fiyat" type="number" outlined dense></v-text-field>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-row>
            <v-text-field ref="name" v-model="productspostData.discountrate"
                          class="col-md-12 px-2"
                          label="İndirim oranı" placeholder="İndirim oranı" type="number" outlined dense></v-text-field>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-row>
            <v-text-field ref="name" v-model="productspostData.code"
                          class="col-md-12 px-2"
                          label="Ürün kodu" placeholder="Ürün kodu" outlined dense></v-text-field>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-row>
            <v-text-field ref="name" v-model="productspostData.stock"
                          class="col-md-12 px-2"
                          label="Ürün stock" placeholder="Ürün stock" type="number" outlined dense></v-text-field>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="productspostData['description_' + $store.state.form.selectedLanguage.code]"
                        label="Ürün Açıklama" placeholder="Ürün Açıklaması giriniz"
                        outlined dense class="col-md-12 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-textarea>
          </v-row>
        </v-col>

        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" class="mt-3" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="productspostData.rank"
                          class="col-md-12 px-2"
                          label="Ürün sırası" placeholder="Ürün Sırası" type="number" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-select :items="categories" v-model="productspostData.categoryId" default="id" item-text="title_tr"
                    item-value="id"
                    @click="fetchCategories()"
                    label="Kategori seçimi" outlined dense></v-select>
        </v-col>

        <v-col cols="6">
          <v-select :items="artist" v-model="productspostData.artistId" default="id" item-text="nameSurname"
                    item-value="id"
                    @click="fetchArtists()"
                    label="Artist seçimi" outlined dense></v-select>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="productspostData.IsActive" label="Aktif/Pasif" class="mt-0"></v-checkbox>
        </v-col>
        <v-col cols="12" md="2" class="pl-0">
          <v-btn class="login-btn" color="success" @click="addProducts">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";

export default {
  name: "ProductsCreate",
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
      productspostData: {
        IsActive: true,
        type: 1,
      },
    }
  },
  mounted() {
    // this.fetchCategories();
    this.fetchArtists();
  },
  methods: {
    addProducts() {
      this.api_post('/products/add', {
        product: this.productspostData
      }, this.addSuccess, this.addError);
    },
    fetchCategories() {
      this.api_get('/productcategories', this.categoriesRes, this.addError);
    },
    fetchArtists() {
      this.api_get('/artists', this.artistRes, this.addError);
    },
    categoriesRes(response) {
      this.categories = response.data
    },
    artistRes(response) {
      this.artist = response.data
    },
    addSuccess() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Products'})
    },
    addError() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>
