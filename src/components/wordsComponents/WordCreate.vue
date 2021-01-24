<template>
  <v-card>
    <v-card-title class="pb-3">Yeni kelime ekleme</v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2 formClass">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="wordpostData['value_' + item.code]"
                          v-for="item in $store.state.form.languages" :key="item.id"
                          label="Kelime" placeholder="Kelime giriniz" dense
                          outlined class="col-md-6 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+item.code+'.png')" max-width="30"></v-img>
              </template>
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12" md="2" class="pl-1">
          <v-btn class="login-btn" color="success" @click="addData">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>

export default {
  name: "WordCreate",
  data() {
    return {
      wordpostData: {
        IsActive: true,
      },
    }
  },
  methods: {
    addData() {
      this.api_post('/words/add', {
        words: this.wordpostData
      }, this.addSuccess, this.addError);
    },
    addSuccess() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Words'})
    },
    addError() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>
