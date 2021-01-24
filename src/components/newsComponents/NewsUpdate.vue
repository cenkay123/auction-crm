<template>
  <v-card>
    <v-card-title class="pb-3">
      Haber Güncelle
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2 formClass">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="newsItem['title_' + item.code]"
                          v-for="item in $store.state.form.languages" :key="item.id"
                          label="Başlık" placeholder="Başlık giriniz" dense
                          outlined class="col-md-6 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+item.code+'.png')" max-width="30"></v-img>
              </template>
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="newsItem['shortDescription_' + item.code]"
                        v-for="item in $store.state.form.languages"
                        :key="item.id"
                        label="Açıklama" placeholder="Açıklama giriniz"
                        outlined dense class="col-md-6 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+item.code+'.png')" max-width="30"></v-img>
              </template>
            </v-textarea>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" class="pl-0 pr-0">
          <v-menu ref="menu" v-model="menuStart" :close-on-content-click="false" :return-value.sync="newsItem.startDate"
                  transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="newsItem.startDate" label="Yayınlanacak tarih" outlined readonly v-bind="attrs"
                            v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="newsItem.startDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuStart = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(newsItem.startDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu ref="menu" v-model="menuEnd" :close-on-content-click="false" :return-value.sync="newsItem.endDate"
                  transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="newsItem.endDate" label="Yayından kalkacak tarih" outlined readonly
                            v-bind="attrs"
                            v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="newsItem.endDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuEnd = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(newsItem.endDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12">
          <div v-for="item in $store.state.form.languages" :key="item.id">
            <label class="custom-label">İçerik</label>
            <img :src="require('../../assets/'+item.code+'.png')" class="label-in-Img" height="150"/>
            <Editor :data="newsItem" class="mt-3 mb-4" dataItem="detail_" :lang="item"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" class="mt-3" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="2">
              <v-checkbox v-model="newsItem.isActive" label="Status Durumu" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="10"></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="2" class="py-0">
          <v-btn class="login-btn" color="success" @click="updateNewsItem">Kaydet</v-btn>
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
  name: "NewsUpdate",
  components: {
    Editor,
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      menuStart: false,
      menuEnd: false,
      modal: false,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"}
      },
      newsItem: {}
    }
  },
  mounted() {
    this.fetchNewsItem()
  },
  watch: {
    'newsItem.startDate'() {
      this.newsItem.startDate = this.newsItem.startDate.toISOString().substr(0, 10)
    },
    'newsItem.endDate'() {
      this.newsItem.endDate = this.newsItem.endDate.toISOString().substr(0, 10)
    }
  },
  methods: {
    fetchNewsItem() {
      this.api_get('/news/' + this.$route.params.id, this.successNewsItem)
    },
    successNewsItem(response) {
      this.newsItem = response.data;
    },
    updateNewsItem() {
      this.api_post('/news/update', {
        news: this.newsItem
      }, this.succeessUpdate, this.errorUpdate)
    },
    succeessUpdate() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'NewsList'})
    },
    errorUpdate() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>
