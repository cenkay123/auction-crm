<template>
  <v-card>
    <v-card-title class="pb-3">Yeni Kategori ekleme</v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="categoriesData['title_' + $store.state.form.selectedLanguage.code]"
                          label="Kategori adi" placeholder="Kategori adı giriniz" dense
                          outlined class="col-md-6 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="categoriesData.IsActive" label="Aktif/Pasif" class="mt-0"></v-checkbox>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn class="login-btn" color="blue-grey darken-4" @click="addCategories">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "CategoriesCreate",
  data() {
    return {
      categoriesData: {},
    }
  },
  methods: {
    addCategories() {
      this.api_post('/productcategory/add', {
        ProductCategory: this.categoriesData
      }, this.addSuccess, this.addError);
    },
    addSuccess() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Categories'})
    },
    addError() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>
