<template lang="html">

  <div class="containerBreadcrumb">

    <ul class="breadcrumb">
      <li class="completed">
        <a href="javascript:void(0);" title="nasa pe'jni">
          <i class="fa fa-user"></i> Datos personales
        </a>
      </li>
      <li class="active stepHab">
        <a href="javascript:void(0);" title="jxiyuni">
          <i class="fa fa-book"></i> Habilidades
        </a>
      </li>
    </ul>

    <form class="form-signin" v-if="!regHabs">

      <h3 class="form-signin-heading">Registrar personal</h3>
      <div>
        <label for="identification" class="sr-only">Identificacion</label>
        <input type="text" id="identification" class="form-control" v-model="identification"
               placeholder="Identificación" data-toggle="tooltip"
               required title="Jxiyuni">
      </div>
      <div>
        <label for="fist_name" class="sr-only">Nombre completo</label>
        <input type="text" id="fist_name" class="form-control" v-model="full_name" placeholder="Nombres" required
               title="Yase">
      </div>
      <div>
        <label for="birthday" class="sr-only">Fecha de nacimiento</label>
        <input type="text" id="birthday" class="form-control" v-model="birthday" onfocus="(this.type='date')"
               placeholder="Fecha de nacimiento" required title="khasni een">
      </div>
      <multiselect v-model="etnia" tag-placeholder="Add this as new tag"
                   placeholder="Etnia" label="name" track-by="name" title="nue'sx"
                   :options="etnias" :multiple="false"></multiselect>

      <div>
        <label class="sr-only">Vereda</label>
        <multiselect v-model="village" tag-placeholder="Add this as new tag"
                     placeholder="Vereda" label="name" track-by="name" title="jxiyuni"
                     :options="villages" :multiple="false"></multiselect>

      </div>
      <div>
        <label for="phone" class="sr-only">Telefono</label>
        <input type="text" id="phone" class="form-control" v-model="phone" placeholder="Telefono" required
               title="isani papayi">
      </div>
      <div>
        <label for="lang" class="sr-only">Idioma</label>
        <multiselect v-model="language" tag-placeholder="Add this as new tag" id="lang"
                     placeholder="Selecciona uno o más idiomas" label="name" track-by="name" title="jxiyuni"
                     :options="languages" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
      </div>
      <button @click="nextStep" class="btn btnStyle btnSaveStaff btn-block" type="submit" title="naa yu'ja">Siguiente <i
        class="fa fa-angle-right"></i></button>
    </form>

    <form class="formHabs" v-if="regHabs">

      <h3 class="form-signin-heading">Registrar Habilidades</h3>
      <div>
        <div class="containerInput">
          <multiselect v-model="habName" tag-placeholder="Add this as new tag"
                       placeholder="Selecciona una o mas habilidades" label="name" track-by="name" title="jxiyuni"
                       :options="ancestralWisdoms" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
        </div>
        <div>
          <label for="identification" class="sr-only">Nombre</label>
          <input type="text" id="name" class="form-control" v-model="habTime"
                 placeholder="Experiencia en años" title="een ta'kni"
                 required>
        </div>
      </div>
      <br>
      <button @click="register" class="btn btn-success btnSaveStaff btn-block" type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import db from './firebaseInit'

  import Multiselect from 'vue-multiselect'

  import birthdayInput from 'vue-birthday-input'
  import VTooltip from 'v-tooltip'

  export default {
    components: {
      Multiselect,
      birthdayInput,
      VTooltip
    },
    name: 'register',
    data: function () {
      return {
        full_name: '',
        language: '',
        languages: [],
        birthday: '',
        identification: '',
        phone: '',
        village: '',
        etnia: '',
        etnias: [],
        role: 'patient',
        clasifications: [],
        ancestralWisdomsSelected: [],
        ancestralWisdoms: [],
        habName: '',
        habTime: '',
        regHabs: false,
        villages: [],

      };
    },
    beforeMount() {
      this.getAncestralWisdoms()
      this.getLanguages()
      this.getVillages()
      this.getEtnias()
    },
    methods: {
      nextStep() {
        this.regHabs = true
      },
      addTag(newTag) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.ancestralWisdoms.push(tag)
        this.ancestralWisdomsSelected.push(tag)
      },
      register: function (e) {
        db.collection('staff').add({
          identification: this.identification,
          full_name: this.full_name,
          language: this.language,
          birthday: this.birthday,
          etnia: this.etnia,
          phone: this.phone,
          village: this.village,
          ancestralWisdomName: this.habName,
          ancestralWisdomTime: this.habTime,
          role: this.role
        })
        this.regHabs = true
        this.$router.push('/landingPagePromoter')
      },
      getAncestralWisdoms() {
        db.collection('ancestralWisdoms').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              'name': doc.data().name
            }
            this.ancestralWisdoms.push(data)

          })
        })
      },
      getLanguages() {
        db.collection('language').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              'name': doc.data().name
            }
            this.languages.push(data)

          })
        })
      },
      getVillages() {
        db.collection('village').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              'name': doc.data().name
            }
            this.villages.push(data)

          })
        })
      },
      getEtnias() {
        db.collection('etnia').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              'name': doc.data().name
            }
            this.etnias.push(data)

          })
        })
      }

    }
  }

  $(function () {
    $('.btnSaveStaff').click(function (e) {
      e.preventDefault()
      e.stopPropagation()
      $('.stepHab').addClass('completed').removeClass('active')

    })
    $('[data-toggle="tooltip"]').tooltip()
  })
</script>

<style lang="css">

  .multiselect {
    z-index: 10000 !important;
  }

  .formHabs .containerInput {
    padding: 1em 0;
  }

  .btnStyle {
    background: #2c2c2c;
    color: white;
  }

  span.multiselect__tag {
    background: #474545;
  }

  span.multiselect__tag i::after {
    color: white !IMPORTANT;
  }

  .btn-success {
    background: hsl(123, 42%, 28%) !important;
  }

  .form-signin, .formHabs {
    max-width: 400px;
    padding: 15px;
    margin: 0 auto;
  }

  form.form-signin div {
    margin: 8px;
    margin-left: 0;
  }

  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 10px;
  }

  .form-signin .checkbox {
    font-weight: normal;
  }

  .form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .stepwizard-step p {
    margin-top: 10px;
  }

  .stepwizard-row {
    display: table-row;
  }

  .stepwizard {
    display: table;
    width: 50%;
    position: relative;
  }

  .stepwizard-step button[disabled] {
    opacity: 1 !important;
    filter: alpha(opacity=100) !important;
  }

  .stepwizard-row:before {
    top: 14px;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 100%;
    height: 1px;
    background-color: #ccc;
    z-order: 0;
  }

  .stepwizard-step {
    display: table-cell;
    text-align: center;
    position: relative;
  }

  .btn-circle {
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 6px 0;
    font-size: 12px;
    line-height: 1.428571429;
    border-radius: 15px;
  }

  .breadcrumb {
    padding: 0;
    background: #ffffff;
    list-style: none;
    overflow: hidden;
    width: 29%;
    margin: auto;
  }

  .breadcrumb > li + li:before {
    padding: 0;
  }

  .breadcrumb li {
    float: left;
  }

  .breadcrumb li.active a {
    background: brown; /* fallback color */
    background: #f83f37;
  }

  .breadcrumb li.completed a {
    background: brown; /* fallback color */
    background: hsl(123, 42%, 28%)
  }

  .breadcrumb li.active a:after {
    border-left: 30px solid #f83f37;
  }

  .breadcrumb li.completed a:after {
    border-left: 30px solid hsl(123, 42%, 28%)
  }

  .breadcrumb li a {
    color: white;
    text-decoration: none;
    padding: 10px 0 10px 45px;
    position: relative;
    display: block;
    float: left;
  }

  .breadcrumb li a:after {
    content: " ";
    display: block;
    width: 0;
    height: 0;
    border-top: 50px solid transparent; /* Go big on the size, and let overflow hide */
    border-bottom: 50px solid transparent;
    border-left: 30px solid hsla(0, 0%, 83%, 1);
    position: absolute;
    top: 50%;
    margin-top: -50px;
    left: 100%;
    z-index: 2;
  }

  .breadcrumb li a:before {
    content: " ";
    display: block;
    width: 0;
    height: 0;
    border-top: 50px solid transparent; /* Go big on the size, and let overflow hide */
    border-bottom: 50px solid transparent;
    border-left: 30px solid white;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    margin-left: 1px;
    left: 100%;
    z-index: 1;
  }

  .breadcrumb li:first-child a {
    padding-left: 15px;
  }

  .breadcrumb li a:hover {
    background: #ea3b34;
  }

  .breadcrumb li a:hover:after {
    border-left-color: #ea3b34 !important;
  }
</style>
