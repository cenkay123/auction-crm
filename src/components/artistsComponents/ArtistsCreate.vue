<template>
  <v-card>
    <v-card-title class="pb-3">
      Yeni Sanatci Ekle
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="px-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-text-field ref="name" v-model="artistsForm.NameSurName" label="Ad Soyad" placeholder="Ad Soyad" dense
                        outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-menu
              v-model="menuStart"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="artistsForm.BirthDate"
                  label="Dogum tarihi"
                  placeholder="Dogum tarihi"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="artistsForm.BirthDate"
                @input="menuStart = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <v-menu
              v-model="menuEnd"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="artistsForm.dateOfDeath"
                  label="Vefat tarihi"
                  placeholder="Vefat tarihi"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="artistsForm.dateOfDeath"
                @input="menuEnd = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12">
          <div v-for="item in $store.state.form.languages" :key="item.id">
            <label class="custom-label" v-text="'Sanatci Bilgisi ' + item.code.toUpperCase()"></label>
            <Editor :data="artistsForm" dataItem="About_" :lang="item"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="2" class="px-7 py-0">
          <v-btn class="login-btn" color="success" @click="createArtist">Kaydet</v-btn>
        </v-col>
        <v-col cols="10"></v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import Editor from "@/components/basicFormComponents/Editor";
export default {
  name: "ArtistsCreate",
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
      artistsForm: {
        IsActive: true,
        BirthDate: null,
        dateOfDeath: null,
      },
      menuStart: false,
      menuEnd: false,
    }
  },
  methods: {
    createArtist() {
      this.api_post('/artists/add', {
        Artist: this.artistsForm
      }, this.successArtist, this.errorArtist)
    },
    successArtist() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'ArtistsList'})
    },
    errorArtist() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    },
  }
}
</script>

<style scoped>

</style>
