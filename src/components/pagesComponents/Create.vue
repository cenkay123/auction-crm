<template>
  <v-card>
    <v-card-title class="pb-3">Yeni Sayfa Olustur</v-card-title>
    <v-divider></v-divider>
    <v-form v-model="pagesForm.valid" class="px-10 pt-2">
      <v-row>
        <v-col cols="6">
          <v-text-field class="flag-TR" ref="name" v-model="pagesForm.titleTR"
                        label="Baslik TR" prepend-icon="mdi-flag-checkered" placeholder="baslik giriniz"
                        outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field class="flag-EN" ref="name" v-model="pagesForm.titleEN"
                        label="Baslik EN" prepend-icon="mdi-flag-checkered" placeholder="baslik giriniz"
                        outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-combobox class="flag-TR" ref="name" v-model="pagesForm.keywordsTR"
                      :rules="[() => !!pagesForm.keywordsTR || 'Lufen en az 1 tane ekleyin']"
                      label="Keywords TR" prepend-icon="mdi-flag-checkered" placeholder="Turkce keywords giriniz"
                      required multiple small-chips hide-selected :filter="filter" :hide-no-data="!search"
                      :items="items" :search-input.sync="search" outlined>
            <template v-slot:no-data>
              <v-list-item>
                <span class="subheading">Ekle</span>
                <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>{{ search }}</v-chip>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, parent, selected }">
              <v-chip v-if="item === Object(item)" v-bind="attrs" :color="`${item.color} lighten-3`"
                      :input-value="selected" label small>
                <span class="pr-2">
                  {{ item.text }}
                </span>
                <v-icon small @click="parent.selectItem(item)" color="red">mdi-close</v-icon>
              </v-chip>
            </template>
            <template v-slot:item="{ index, item }">
              <v-text-field v-if="editing === item" v-model="editing.text" autofocus flat background-color="transparent"
                            hide-details solo @keyup.enter="edit(index, item)"></v-text-field>
              <v-chip v-else :color="`${item.color} lighten-3`" dark label small>{{ item.text }}</v-chip>
              <v-spacer></v-spacer>
              <v-list-item-action @click.stop>
                <v-btn icon @click.stop.prevent="edit(index, item)">
                  <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-combobox>
        </v-col>
        <v-col cols="6">
          <v-combobox class="flag-EN" ref="name" v-model="pagesForm.keywordsEN"
                      :rules="[() => !!pagesForm.keywordsEN || 'This field is required']" label="Keywords EN"
                      prepend-icon="mdi-flag-checkered" placeholder="Ingilizce keywords giriniz" required multiple
                      small-chips hide-selected :filter="filter" :hide-no-data="!search" :items="items"
                      :search-input.sync="search" outlined>
            <template v-slot:no-data>
              <v-list-item>
                <span class="subheading">Ekle</span>
                <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>{{ search }}</v-chip>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, parent, selected }">
              <v-chip v-if="item === Object(item)" v-bind="attrs" :color="`${item.color} lighten-3`"
                      :input-value="selected" label small>
                <span class="pr-2">
                  {{ item.text }}
                </span>
                <v-icon small @click="parent.selectItem(item)" color="red">mdi-close</v-icon>
              </v-chip>
            </template>
            <template v-slot:item="{ index, item }">
              <v-text-field v-if="editing === item" v-model="editing.text" autofocus flat background-color="transparent"
                            hide-details solo @keyup.enter="edit(index, item)"></v-text-field>
              <v-chip v-else :color="`${item.color} lighten-3`" dark label small>{{ item.text }}</v-chip>
              <v-spacer></v-spacer>
              <v-list-item-action @click.stop>
                <v-btn icon @click.stop.prevent="edit(index, item)">
                  <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-combobox>
        </v-col>
        <v-col cols="6">
          <v-textarea class="flag-TR" counter v-model="pagesForm.summaryTR"
                      label="Ozet TR" prepend-icon="mdi-flag-checkered" placeholder="ozet giriniz"
                      outlined></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-textarea class="flag-EN" counter v-model="pagesForm.summaryEN"
                      label="Ozet EN" prepend-icon="mdi-flag-checkered" placeholder="ozet giriniz"
                      outlined></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-text-field ref="name" v-model="pagesForm.pageUrl"
                        label="Link Yönlendirme"  outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-TR">Icerik TR &nbsp;
            <v-icon>mdi-flag-checkered</v-icon>
          </label>
          <ckeditor :editor="editor" v-model="pagesForm.editorTR"></ckeditor>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Icerik EN &nbsp;
            <v-icon>mdi-flag-checkered</v-icon>
          </label>
          <ckeditor :editor="editor" v-model="pagesForm.editorEN"></ckeditor>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="6">
          <v-select :items="pagePropertyList" v-model="pagesForm.pageProperty" item-text="name" item-value="id"
                    label="Sayfa Ozelligi" outlined dense></v-select>
        </v-col>
        <v-col cols="6">
          <v-select :items="topPagesList" v-model="pagesForm.topPages" label="Ust Sayfalar" outlined dense></v-select>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col cols="6">
              <v-checkbox v-model="pagesForm.topMenu" label="Ust menude gozuksun" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-checkbox v-model="pagesForm.bottomMenu" label="Alt menude gozuksun" class="mt-0"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6"></v-col>
        <v-col cols="2" class="px-7 py-0">
          <v-btn class="login-btn" color="success" @click="createPage" :loading="loading" :disabled="loading">Kaydet
            <template v-slot:loader>
              <span>Loading...</span>
            </template>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: "Create",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      editor: ClassicEditor,

      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      items: [
        {header: 'Select an option or create one'},
        {
          text: 'turkce',
          color: 'blue',
        },
        {
          text: 'english',
          color: 'cyan',
        },
        {
          text: 'Bar',
          color: 'red',
        },
      ],
      editing: null,
      editingIndex: -1,
      nonce: 1,
      search: null,

      pagePropertyList: ['Normal Sayfa', 'Galeri Sayfasi'],
      topPagesList: ['Ust Sayfa', 'Hakkimizda', 'Urunler', 'Sayfa-3', 'Sayfa-4'],

      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"}
      },

      pagesForm: {
        valid: false,
        titleTR: null,
        titleEN: null,
        keywordsTR: [
          {
            text: 'muzayede',
            color: 'blue',
          },
        ],
        keywordsEN: [
          {
            text: 'auction',
            color: 'blue',
          },
        ],
        summaryTR: null,
        summaryEN: null,
        pageUrl: null,
        editorTR: null,
        editorEN: null,
        pageProperty: null,
        topPages: false,
        topMenu: false,
        bottomMenu: false
      },

      loading: false
    }
  },
  watch: {
    'pagesForm.keywordsTR'(val, prev) {
      if (val.length === prev.length) return
      this.pagesForm.keywordsTR = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }
          this.items.push(v)
          this.nonce++
        }
        return v
      })
    },
    'pagesForm.keywordsEN'(val, prev) {
      if (val.length === prev.length) return
      this.pagesForm.keywordsEN = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }
          this.items.push(v)
          this.nonce++
        }
        return v
      })
    },
  },
  mounted() {
    this.fetchSpecifications()
  },
  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false
      const hasValue = val => val != null ? val : ''
      const text = hasValue(itemText)
      const query = hasValue(queryText)
      return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
    },
    fetchSpecifications() {
      this.api_get('/pagespecifications', this.successSpecifications, this.errorSpecifications)
    },
    successSpecifications(response) {
      this.pagePropertyList = response.data
    },
    errorSpecifications(e) {
      console.log(e)
    },
    createPage() {
      this.api_post('/pages/add', {
        TR_title: this.pagesForm.titleTR,
        EN_title: this.pagesForm.titleEN,
        TR_Keywords: this.pagesForm.keywordsTR[0].text,
        EN_Keywords: this.pagesForm.keywordsEN[0].text,
        TR_Description: this.pagesForm.summaryTR,
        EN_Description: this.pagesForm.summaryEN,
        TR_Detail: this.pagesForm.editorTR,
        EN_Detail: this.pagesForm.editorEN,
        RedirectionLink: this.pagesForm.pageUrl,
        SpecificationId: this.pagesForm.pageProperty,
        IsMain: this.pagesForm.topMenu,
        IsFooter: this.pagesForm.bottomMenu,
        PageBanners:[{
          PictureUrl:"blabla.jpg"
        }]
      }, this.successPage, this.errorPage)
    },
    successPage() {
      this.$store.commit('successPagesCreate')
      this.$router.push({name: 'List'})
    },
    errorPage() {
      this.$store.commit('errorPagesCreate')
    }
  },
}
</script>

<style scoped>
</style>

