<template>
  <v-card>
    <v-card-title class="pb-3">Yeni ekleme</v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-text-field ref="name" v-model="createData['firstName']"
                          label="Ad"
                          placeholder="Ad" dense outlined class="col-md-12 px-1"
            ></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-text-field ref="name" v-model="createData['lastName']"
                          label="Soyad"
                          placeholder="Soyad" dense outlined class="col-md-12 px-1"
            ></v-text-field>
          </v-row>
        </v-col>
         <v-col cols="4">
          <v-row>
            <v-text-field ref="name" v-model="createData['password']"
                          label="Şifre"
                          placeholder="Şifre" type="password" dense outlined class="col-md-12 px-1"
            ></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-text-field ref="name" v-model="createData['email']"
                          label="Email"
                          placeholder="Email" dense outlined class="col-md-12 px-1"
            ></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-text-field ref="name" v-model="createData['identityNumber']"
                          label="Tc no *"
                          placeholder="Tc no *" type="number" dense outlined class="col-md-12 px-1"
            ></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-text-field ref="name" v-model="createData['cellPhone']"
                          label="Telefon"
                          placeholder="Telefon" dense outlined class="col-md-12 px-1"
            ></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="createData['cityName']"
                          label="İl"
                          placeholder="İl" dense outlined class="col-md-12 px-1"
            ></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="createData['districtName']"
                          label="İlçe"
                          placeholder="İlçe" dense outlined class="col-md-12 px-1"
            ></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="createData['address']"
                          label="Address"
                          placeholder="Address" dense outlined class="col-md-12 px-1"
            ></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="createData.IsActive" label="Aktif/Pasif" class="mt-0"></v-checkbox>
        </v-col>
        <v-col cols="12" md="2" class="px-7 py-0">
          <v-btn class="login-btn" color="success" @click="addData">Kaydet</v-btn>
        </v-col>
        <v-col cols="10"></v-col>
      </v-row>
    </v-form>
  </v-card>

</template>

<script>
export default {
  name: "UsersCreate",
  data() {
    return {
      createData: {
        IsActive: true,
      },
    }
  },
  methods: {
    addData() {
      this.api_post('/users/add', {
        users: this.createData
      }, this.addSuccess, this.addError);
    },
    addSuccess() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Users'})
    },
    addError() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>