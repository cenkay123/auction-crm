<template>
  <v-card>
    <v-card-title class="pb-3">
      Slayt Guncelle
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="slaytUpdateData['title_' + $store.state.form.selectedLanguage.code]"
                          label="Başlık" placeholder="Başlık giriniz" dense
                          outlined class="col-md-12 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="slaytUpdateData['summary_' + $store.state.form.selectedLanguage.code]"
                        label="Açıklama" placeholder="açıklama giriniz"
                        outlined dense class="col-md-12 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-textarea>
          </v-row>
        </v-col>

          <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="slaytUpdateData.link"
                          class="col-md-12 px-2"
                          label="Link" placeholder="Link yönlendirme" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="slaytUpdateData.rank"
                          class="col-md-12 px-1"
                          label="Sıra" placeholder="Sırası" outlined dense></v-text-field>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row>
            <div class="col-md-12 px-1">
              <label class="custom-label">İçerik</label>
               <img :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" class="label-in-Img" height="150"/>
              <Editor :data="slaytUpdateData" class="mt-5" dataItem="content_" :lang="$store.state.form.selectedLanguage"></Editor>
            </div>
          </v-row>
        </v-col>
        <v-col cols="12" class="p-0">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone class="mt-3" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="2">
              <v-checkbox v-model="slaytUpdateData.isActive" label="Status Durumu" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="10"></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="2" class="py-0">
          <v-btn class="login-btn" color="success" @click="updateSlayt">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import Editor from "@/components/basicFormComponents/Editor";

export default {
  name: "SlaytsUpdate",
  components: {
    Editor,
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
      slaytUpdateData: {},
    }
  },
  mounted() {
    this.fetchSlayt()
  },
  methods: {
    fetchSlayt() {
      this.api_get('/sliders/' + this.$route.params.id, this.successFetchItem, this.slaytUpdateError);
      this.$store.state.settings.loader = true;
    },
    successFetchItem(response) {
      this.slaytUpdateData = response.data
      this.$store.state.settings.loader = false;
    },
    slaytUpdateError() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error');
    },
    updateSlayt() {
      this.api_post('/sliders/update', {
        slider: this.slaytUpdateData
      }, this.successUpdate, this.errorUpdate);
      this.$store.state.settings.loader = true;
    },
    successUpdate() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Slayts'})
    },
    errorUpdate() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>
