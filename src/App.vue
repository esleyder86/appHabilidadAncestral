<template>
  <div id="app">
    <Navbar id="navbarPrimary"/>
    <div class="containerStack">
      <router-view/>
    </div>
  </div>
</template>

<script>

  import Navbar from './components/Navbar'

  export default {
    name: 'App',
    components: {
      Navbar
    }
  }

</script>

<style>
  body {
    background: url(https://www.cric-colombia.org/portal/wp-content/uploads/2018/02/fondo02.jpg);
  }

  #navbarPrimary {
    background: #00662d;
    border-bottom: 2px solid #b82721;
  }

  .containerStack {
    width: 97%;
    margin: auto;
    background: white !important;
    position: relative;
    top: 9px;
    min-height: 90vh;
    padding: 2em;
    padding-top: 1em;
    border-radius: 4px;
  }

  span.gray {
    color: #00662d;
    font-weight: bold;
  }

  h3 {
    text-align: center;
    margin-top: 5px;
    font-family: monospace;
    color: #00662d;
  }
  .card-header h6:hover {
    text-decoration: underline;
    cursor: pointer;
  }

</style>

