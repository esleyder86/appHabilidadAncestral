<template lang="html">
  <form class="form-signin">
    <h4 class="form-signin-heading">Promotor</h4>
    <div>
      <label for="inputPassword" class="sr-only">Nombre</label>
      <input type="text" id="identification" class="form-control" v-model="identification" placeholder="Identificación" required>
    </div>
    <div>
      <label for="inputPassword" class="sr-only">Nombre</label>
      <input type="text" id="fist_name" class="form-control" v-model="first_name" placeholder="Nombres" required>
    </div>
    <div>
      <label for="inputPassword" class="sr-only">Nombre</label>
      <input type="text" id="last_name" class="form-control" v-model="last_name" placeholder="Apellidos" required>
    </div>
    <div>
      <label for="inputPassword" class="sr-only">Etnia</label>
      <input type="text" id="etnia" class="form-control" v-model="etnia" placeholder="Etnia" required>
    </div>
    <div>
      <label for="inputPassword" class="sr-only">Telefono</label>
      <input type="text" id="village" class="form-control" v-model="village" placeholder="Aldea" required>
    </div>
    <div>
      <label for="inputPassword" class="sr-only">Telefono</label>
      <input type="text" id="phone" class="form-control" v-model="phone" placeholder="Telefono" required>
    </div>
    <div>
      <label for="inputEmail" class="sr-only">Correo electronico</label>
      <input type="email" id="inputEmail" class="form-control" v-model="email" placeholder="Correo electronico" required
             autofocus>
    </div>
    <div>

      <label for="inputPassword" class="sr-only">Contraseña</label>
      <input type="password" id="inputPassword" class="form-control" v-model="password" placeholder="Contraseña"
             required>
    </div>

    <button @click="register" class="btn btn-success btn-block" type="submit">Registrarse</button>
  </form>
</template>

<script>
  import firebase from 'firebase';
  import db from './firebaseInit'


  export default {
    name: 'register',
    data: function () {
      return {
        first_name: '',
        last_name: '',
        identification: '',
        phone: '',
        village: '',
        etnia: '',
        email: '',
        role: 'promotor',
        password: '',
        clasifications: []
      };
    },
    methods: {
      register: function (e) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          db.collection('promotor').add({
            identification: this.identification,
            first_name: this.first_name,
            last_name: this.last_name,
            etnia: this.etnia,
            email: this.email,
            phone: this.phone,
            village: this.village,
            role: this.role
          })
          .then(
            user => {
              this.$router.go({path: this.$router.path});
            }, err => {
              alert(err.message);
            })
        e.preventDefault();
      }
    }
  }
</script>

<style lang="css">

  .form-signin {
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

  /*
  (function () {
    'use strict'

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style')
      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      )
      document.head.appendChild(msViewportStyle)
    }

  }())
  */
</style>
