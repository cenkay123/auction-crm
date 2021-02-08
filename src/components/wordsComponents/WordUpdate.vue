<template>
  <v-card>
    <v-card-title class="pb-3">
      Kelime Guncelle
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="UpdateData['value_' + $store.state.form.selectedLanguage.code]"
                          :label="'Kelime ' + $store.state.form.selectedLanguage.code.toUpperCase()" dense
                          outlined class="col-md-6 px-1"></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12" md="2" class="py-0">
          <v-btn class="login-btn" color="success" @click="updateWord">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "WordUpdate",
  data() {
    return {
      UpdateData: {},
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.api_get('/words/' + this.$route.params.id, this.successFetchItem, this.Error);
    },
    successFetchItem(response) {
      this.UpdateData = response.data
    },
    Error() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error');
    },
    updateWord() {
      this.api_post('/words/update', {
        words: this.UpdateData
      }, this.successUpdate, this.Error);
      this.$store.state.settings.loader = true;
    },
    successUpdate() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Words'})
    },
  }
}
</script>

<style scoped>

</style>
