<template>
  <v-card>
    <v-card-title class="pb-3">
      Kategori Guncelle
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="categoriesUpdateData['title_' + item.code]"
                          v-for="item in $store.state.form.languages" :key="item.id"
                          :label="'Kategori ad ' + item.code.toUpperCase()" placeholder="Kategori adı giriniz" dense
                          outlined class="col-md-6 px-1"></v-text-field>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="2">
              <v-checkbox v-model="categoriesUpdateData.isActive" label="Status Durumu" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="10"></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="2" class="py-0">
          <v-btn class="login-btn" color="success" @click="updateCategories">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "CategoriesUpdate",
  data() {
    return {
      categoriesUpdateData: {
        id: this.$route.params.id,
      },
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.api_get('/productcategory/' + this.$route.params.id, this.successFetchItem, this.errorUpdate);
    },
    successFetchItem(response) {
      this.categoriesUpdateData = response.data
    },
    updateCategories() {
      this.api_post('/productcategory/update', {
        ProductCategory: this.categoriesUpdateData
      }, this.successUpdate, this.errorUpdate);
    },
    successUpdate() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Categories'})
    },
    errorUpdate() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>