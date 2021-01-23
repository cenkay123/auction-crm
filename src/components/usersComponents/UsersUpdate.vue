<template>
  <v-card>
    <v-card-title class="pb-3">
      Kullanıcı Güncelle
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-text-field
                ref="name"
                v-model="ListData['firstName']"
                label="Ad"
                dense outlined class="col-md-12 px-1">
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field
                ref="name"
                v-model="ListData['lastName']"
                label="Soyad"
                dense outlined class="col-md-12 px-1">
            </v-text-field>
          </v-row>
        </v-col>
         <v-col cols="6">
          <v-row>
            <v-text-field
                ref="name"
                v-model="ListData['cellPhone']"
                label="Telefon"
                dense outlined class="col-md-12 px-1">
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field
                ref="name"
                v-model="ListData['address']"
                label="Adres"
                dense outlined class="col-md-12 px-1">
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field
                ref="name"
                v-model="ListData['cityName']"
                label="İl"
                dense outlined class="col-md-12 px-1">
            </v-text-field>
          </v-row>
        </v-col>
          <v-col cols="6">
          <v-row>
            <v-text-field
                ref="name"
                v-model="ListData['districtName']"
                label="İlçe"
                dense outlined class="col-md-12 px-1">
            </v-text-field>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="2">
              <v-checkbox v-model="ListData.isActive" label="Status Durumu" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="10"></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="2" class="py-0">
          <v-btn class="login-btn" color="success" @click="updateData">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "UsersUpdate",
  data() {
    return {
      ListData: {},
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.api_get('/users/' + this.$route.params.id, this.successFetchItem, this.errorUpdate);
    },
    successFetchItem(response) {
      this.ListData = response.data
    },
    updateData() {
      this.api_post('/users/update', {
        users: this.ListData
      }, this.successUpdate, this.errorUpdate);
    },
    errorUpdate() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    },
    successUpdate() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Users'})
    },
  }
}
</script>

<style scoped>

</style>