<template lang="html">

  <div class="containerBreadcrumb">

    <ul class="breadcrumb">
      <li class="completed">
        <a href="javascript:void(0);">
          <i class="fa fa-user"></i> Datos personales
        </a>
      </li>
      <li class="active stepHab">
        <a href="javascript:void(0);">
          <i class="fa fa-book"></i> Habilidades
        </a>
      </li>
    </ul>

    <form class="form-signin" v-if="!regHabs">

      <h3 class="form-signin-heading">Registrar personal</h3>
      <div>
        <label for="identification" class="sr-only">Nombre</label>
        <input type="text" id="identification" class="form-control" v-model="identification"
               placeholder="Identificación"
               required>
      </div>
      <div>
        <label for="fist_name" class="sr-only">Nombre</label>
        <input type="text" id="fist_name" class="form-control" v-model="first_name" placeholder="Nombres" required>
      </div>
      <div>
        <label for="last_name" class="sr-only">Nombre</label>
        <input type="text" id="last_name" class="form-control" v-model="last_name" placeholder="Apellidos" required>
      </div>
      <div>
        <label for="etnia" class="sr-only">Etnia</label>
        <input type="text" id="etnia" class="form-control" v-model="etnia" placeholder="Etnia" required>
      </div>
      <div>
        <label for="village" class="sr-only">Vereda</label>
        <input type="text" id="village" class="form-control" v-model="village" placeholder="Vereda" required>
      </div>
      <div>
        <label for="phone" class="sr-only">Telefono</label>
        <input type="text" id="phone" class="form-control" v-model="phone" placeholder="Telefono" required>
      </div>
      <button @click="nextStep" class="btn btnStyle btnSaveStaff btn-block" type="submit">Siguiente <i
        class="fa fa-angle-right"></i></button>
    </form>

    <form class="formHabs" v-if="regHabs">

      <h3 class="form-signin-heading">Registrar Habilidades</h3>
      <div>
        <multiselect v-model="ancestralWisdomsSelected" tag-placeholder="Add this as new tag"
                     placeholder="Selecciona una o mas habilidades" label="name" track-by="name"
                     :options="ancestralWisdoms" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
        <label for="identification" class="sr-only">Nombre</label>
        <input type="text" id="name" class="form-control" v-model="habName"
               placeholder="Nombre"
               required>
      </div>
      <button @click="register" class="btn btn-success btnSaveStaff btn-block" type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import db from './firebaseInit'

  import Multiselect from 'vue-multiselect'

  export default {
    components: {
      Multiselect
    },
    name: 'register',
    data: function () {
      return {
        first_name: '',
        last_name: '',
        identification: '',
        phone: '',
        village: '',
        etnia: '',
        role: 'patient',
        clasifications: [],
        ancestralWisdomsSelected: [

        ],
        ancestralWisdoms: [],
        habName: '',
        regHabs: true,

      };
    },
    beforeMount() {
      this.getAncestralWisdoms()
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
          first_name: this.first_name,
          last_name: this.last_name,
          etnia: this.etnia,
          phone: this.phone,
          village: this.village,
          role: this.role
        })
        this.regHabs = true
        e.preventDefault()

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
      }
    }
  }

  $(function () {
    $('.btnSaveStaff').click(function (e) {
      e.preventDefault()
      e.stopPropagation()
      $('.stepHab').addClass('completed').removeClass('active')

    })
  })
</script>

<style lang="css">
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

  .btn-success{
    background: hsl(123, 42%, 28%) !important;
  }

  .form-signin, .formHabs {
    max-width: 400px;
    padding: 15px;
    margin: 0 auto;
  }

  form.form-signin div {
    margin: 8px;
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
    background: #ea3b34;
  }

  .breadcrumb li.completed a {
    background: brown; /* fallback color */
    background: hsl(123, 42%, 28%)
  }

  .breadcrumb li.active a:after {
    border-left: 30px solid #ea3b34;
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
