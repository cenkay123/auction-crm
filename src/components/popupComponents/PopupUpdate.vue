<template>
  <v-card>
    <v-card-title class="pb-3">
      Popup Guncelle
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="ListData['title_' + item.code]"
                          v-for="item in $store.state.form.languages" :key="item.id"
                          :label="'baslik ' + item.code.toUpperCase()" placeholder="Baslik giriniz" dense
                          outlined class="col-md-6 px-1"></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="ListData['description_' + item.code]"
                        v-for="item in $store.state.form.languages"
                        :key="item.id"
                        :label="'Aciklama ' + item.code.toUpperCase()" placeholder="aciklama giriniz"
                        outlined dense class="col-md-6 px-1"></v-textarea>
          </v-row>
        </v-col>

        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
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
import vue2Dropzone from "vue2-dropzone";

export default {
  name: "PopupUpdate",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"}
      },
      ListData: {},
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.api_get('/popups/' + this.$route.params.id, this.successFetchItem, this.errorUpdate);
      this.$store.state.settings.loader = true;
    },
    successFetchItem(response) {
      this.ListData = response.data
    },
    updateData() {
      this.api_post('/popups/update', {
        popups: this.ListData
      }, this.successUpdate, this.errorUpdate);
    },
    errorUpdate() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    },
    successUpdate() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Popup'})
    },
  }
}
</script>

<style scoped>

</style>
