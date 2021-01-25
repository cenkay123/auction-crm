<template>
  <v-card>
    <v-card-title class="pb-3">
      Sergi Güncelle
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="sergiItem['title_' + item.code]"
                          v-for="item in $store.state.form.languages" :key="item.id"
                          label="Sergi adı" placeholder="Sergi adı giriniz" dense
                          outlined class="col-md-6 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+item.code+'.png')" max-width="30"></v-img>
              </template>
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="sergiItem.pdfLink"
                          class="col-md-12 px-2"
                          label="Pdf linki" placeholder="Pdf linki" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="sergiItem.rank"
                          class="col-md-12 px-1"
                          label="Sıra" placeholder="Sırası" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="sergiItem['shortDescription_' + item.code]"
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


        <v-col cols="12" md="6">
          <v-menu ref="menu" v-model="menuStart" :close-on-content-click="false"
                  :return-value.sync="sergiItem.startDate"
                  transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="sergiItem.startDate" label="Yayınlanacak tarih" outlined readonly v-bind="attrs"
                            v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="sergiItem.startDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuStart = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(sergiItem.startDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu ref="menu" v-model="menuEnd" :close-on-content-click="false" :return-value.sync="sergiItem.endDate"
                  transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="sergiItem.endDate" label="Yayından kalkacak tarih" outlined readonly
                            v-bind="attrs"
                            v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="sergiItem.endDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuEnd = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(sergiItem.endDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12">
          <div v-for="item in $store.state.form.languages" :key="item.id">
            <label class="custom-label">İçerik</label>
            <img :src="require('../../assets/'+item.code+'.png')" class="label-in-Img" height="150"/>
            <Editor :data="sergiItem" class="mt-3 mb-4" dataItem="longDescription_" :lang="item"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" class="mt-3" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="5">
          <v-row>
            <v-col cols="12">
              <v-checkbox v-model="sergiItem.isActive" label="Status Durumu" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="10"></v-col>
          </v-row>
        </v-col>

        <v-col cols="5">
          <v-row>
            <v-col cols="12">
              <v-checkbox v-model="sergiItem.isOnline" label="Online aktif/pasif" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="10"></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3" class="py-0">
          <v-btn class="login-btn" color="success" @click="updateSergiItem">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import Editor from "@/components/basicFormComponents/Editor";
import vue2Dropzone from "vue2-dropzone";


export default {
  name: "ExhibitionsUpdate",
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
      sergiItem: {}
    }
  },
  mounted() {
    this.fetchSergiItem()
  },
  watch: {
    'sergiItem.startDate'() {
      this.sergiItem.startDate = this.sergiItem.startDate.toISOString().substr(0, 10)
    },
    'sergiItem.endDate'() {
      this.sergiItem.endDate = this.sergiItem.endDate.toISOString().substr(0, 10)
    }
  },
  methods: {
    fetchSergiItem() {
      this.api_get('/exhibitions/' + this.$route.params.id, this.successNewsItem)
    },
    successNewsItem(response) {
      this.sergiItem = response.data;
    },
    updateSergiItem() {
      this.api_post('/exhibitions/update', {
        Exhibitions: this.sergiItem
      }, this.succeessUpdate, this.errorUpdate)
    },
    succeessUpdate() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Exhibitions'})
    },
    errorUpdate() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>