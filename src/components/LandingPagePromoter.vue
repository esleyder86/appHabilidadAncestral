<template>

  <div id="dashboard">

    <h3>Personal</h3>
    <br>

    <div class="card-deck">
      <div class="preloaderGeneral" v-show="preloader">
        <img src="../assets/spinner.gif">
      </div>
      <div v-for="staff in staffs" v-bind:key="staff.id">
        <div class="card showStaff" style="width: 18rem;">
          <div class="card-header">
            <h6 class="capitalize">{{staff.full_name}}</h6>

          </div>
          <div class="card-body">
            <div class="infoDidiver">
              <label class="lblgray"><i class="fa fa-id-card"></i> Identificación:</label>
              <p class=" infoBodyCard">{{staff.identification}}</p>
            </div>
            <div class="infoDidiver">
              <label class="lblgray"><i class="fa fa-fire"></i> Etnia:</label>
              <p v-for="etnia in staff.etnia" class=" infoBodyCard">{{etnia}}</p>
            </div>
            <div class="infoDidiver">
              <label class="lblgray"><i class="fa fa-birthday-cake"></i> Edad:</label>
              <p class="infoBodyCard birthday">{{staff.birthday}} años</p>
            </div>
            <div class="infoDidiver">
              <label class="lblgray"><i class="fa fa-phone"></i> Telefono:</label>
              <p class="infoBodyCard birthday">{{staff.phone}}</p>
            </div>
            <div class="infoDidiver">
              <label class="lblgray"><i class="fa fa-globe"></i> Idioma (s)</label>
              <li class="tags language" v-for="awname in staff.language"><a href="#" class="tag">{{awname.name}}</a>
              </li>
            </div>
            <div class="infoDidiver">
              <label class="lblgray"><i class="fa fa-location-arrow"></i> Vereda:</label>
              <p v-for="village in staff.village" class=" infoBodyCard">{{village}}</p>
            </div>
          </div>

          <div class="card-footer">
            <div class="infoDidiver">
              <label class="lblgray"><i class="fa fa-rocket"></i> Experiencia:</label>
              <p class=" infoBodyCard">{{staff.ancestralWisdomTime}}</p>
            </div>
            <div class="infoDidiver">
              <label class="lblgray"><i class="fa fa-hand-paper"></i></label>
              <li class="tags" v-for="awname in staff.ancestralWisdomName"><a href="#" class="tag">{{awname.name}}</a>
              </li>
            </div>
            <div class="showPatients" @click="showMyPatients(staff)"><i class="fa fa-users"></i></div>
          </div>

        </div>
      </div>
    </div>
    <div class="registerPatient" v-if="registerPatient">
      <div class="headerListGroup">
        <i class="fa fa-times-circle closeRegisterPatient" @click="closeShowMyPatients" title="Cerrar"></i>
        <p class="infoName">{{staffSelected.full_name}}</p>
      </div>
      <button type="button" class="btn btn-info btn-block" id="btnCreatePatient" data-toggle="modal"
              data-target="#modalCreatePatient">Crear
        paciente
      </button>
      <br>
      <ul class="list-group">
        <a href="#" class="list-group-item list-group-item-action active">
          Pacientes registrados
        </a>
        <div v-for="patient in patients">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="pacient-data">
              <span class="badge-identification">{{patient.identification}}</span>
              <span class="name-pacient">{{patient.full_name}}</span>
            </div>
            <span class="badge badge-primary badge-pill eye" title="Ver"><i class="fa fa-eye"></i></span>
            <span class="badge badge-primary badge-pill" title="Reportar atención" data-toggle="modal" data-target="#modalReportPatient" @click="reportAtention(patient)"><i class="fa fa-book"></i></span>
          </li>
        </div>
      </ul>

    </div>
    <!-- The Modal -->
    <div class="modal" id="modalCreatePatient">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Registrar paciente</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form class="form-signin">
              <div>
                <label for="identification" class="sr-only">Identificacion</label>
                <input type="text" id="identification" class="form-control" v-model="patientIdentification"
                       placeholder="Identificación" data-toggle="tooltip"
                       required title="Jxiyuni">
              </div>
              <div>
                <label for="fist_name" class="sr-only">Nombre completo</label>
                <input type="text" id="fist_name" class="form-control" v-model="patientFullName" placeholder="Nombres"
                       required
                       title="Yase">
              </div>
              <div>
                <label for="birthday" class="sr-only">Fecha de nacimiento</label>
                <input type="text" id="birthday" class="form-control" v-model="patientBirthday"
                       onfocus="(this.type='date')"
                       placeholder="Fecha de nacimiento" required title="khasni een">
              </div>
              <multiselect v-model="patientEtnia" tag-placeholder="Add this as new tag"
                           placeholder="Etnia" label="name" track-by="name" title="nue'sx"
                           :options="etnias" :multiple="false"></multiselect>

              <div>
                <label class="sr-only">Vereda</label>
                <multiselect v-model="patientVillage" tag-placeholder="Add this as new tag"
                             placeholder="Vereda" label="name" track-by="name" title="jxiyuni"
                             :options="villages" :multiple="false"></multiselect>

              </div>
              <div>
                <label for="phone" class="sr-only">Telefono</label>
                <input type="text" id="phone" class="form-control" v-model="patientPhone" placeholder="Telefono"
                       required
                       title="isani papayi">
              </div>
              <div>
                <label class="sr-only">Idioma</label>
                <multiselect v-model="patientLanguage" tag-placeholder="Add this as new tag" id="lang"
                             placeholder="Selecciona uno o más idiomas" label="name" track-by="name" title="jxiyuni"
                             :options="languages" :multiple="true" :taggable="true"></multiselect>
              </div>
              <button @click="register" class="btn btn-success btnSaveStaff btn-block" type="submit"
                      data-dismiss="modal">Registrar
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>

    <!--MODAL PARA REGISTRAR REPORTE DE PACIENTE-->
    <!-- The Modal -->
    <div class="modal" id="modalReportPatient">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Reporte de atención</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form class="form-signin">
              <div>
                <label for="identification" class="sr-only">Identificacion</label>
                <input type="text" id="identificationRep" class="form-control" v-model="reportPatient.identification"
                       placeholder="Identificación" data-toggle="tooltip"
                       required title="Jxiyuni" disabled>
              </div>
              <div>
                <label for="identification" class="sr-only">Identificacion</label>
                <input type="text" id="nameRep" class="form-control" v-model="reportPatient.full_name"
                       placeholder="Identificación" data-toggle="tooltip"
                       required title="Jxiyuni" disabled>
              </div>
              <div>
                <label for="identification" class="sr-only">Identificacion</label>
                <textarea id="df" class="form-control" v-model="repDiagnostic"
                       placeholder="Diagnostico" data-toggle="tooltip"
                          required title="Jxiyuni"></textarea>
              </div>
              <div>
                <label for="identification" class="sr-only">Identificacion</label>
                <textarea id="sdf" class="form-control" v-model="repFormule"
                          placeholder="Formula" data-toggle="tooltip"
                          required title="Jxiyuni" rows="5"></textarea>
              </div>

              <button @click="registerReport" class="btn btn-success btnSaveStaff btn-block" type="submit"
                      data-dismiss="modal">Guardar
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import db from './firebaseInit'
  import Multiselect from 'vue-multiselect'

  export default {
    components: {
      Multiselect
    },
    name: 'dashboard',
    data() {
      return {
        villages: [],
        etnias: [],
        languages: [],
        staffs: [],
        patients: [],
        patientIdentification: '',
        patientFullName: '',
        patientBirthday: '',
        patientEtnia: '',
        patientVillage: '',
        patientLanguage: '',
        patientPhone: '',
        staffSelected: '',
        registerPatient: false,
        preloader: true,
        reportAtentionPatient: false,
        reportPatient: '',
        repDiagnostic: '',
        repTime: '',
        repFormule: ''
      }
    },
    beforeMount() {
      this.getLanguages()
      this.getVillages()
      this.getEtnias()
      this.getPatients()
    },
    created() {
      db.collection('staff').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          function calculateAge(birthday) {
            var birthday_arr = birthday.split("-");
            var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
            var ageDifMs = Date.now() - birthday_date.getTime();
            var ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
          }

          var age = calculateAge(doc.data().birthday);
          const data = {
            'full_name': doc.data().full_name,
            'identification': doc.data().identification,
            'birthday': age,
            'etnia': doc.data().etnia,
            'phone': doc.data().phone,
            'language': doc.data().language,
            'village': doc.data().village,
            'ancestralWisdomTime': doc.data().ancestralWisdomTime,
            'ancestralWisdomName': doc.data().ancestralWisdomName
          }

          this.staffs.push(data)

        })
        this.preloader = false
      })

    },
    methods: {
      reportAtention(patient) {
        this.reportPatient = patient
      },
      register: function (e) {
        $('.list-group div').remove()
        db.collection('patient').add({
          identification: this.patientIdentification,
          full_name: this.patientFullName,
          language: this.patientLanguage,
          birthday: this.patientBirthday,
          etnia: this.patientEtnia,
          phone: this.patientPhone,
          village: this.patientVillage,
        })
        this.getPatients()
      },
      registerReport: function (e) {
        db.collection('report').add({
          diagnostic: this.repDiagnostic,
          formule: this.repFormule,
        })
      },
      showMyPatients(staff) {
        this.registerPatient = true
        this.staffSelected = staff
      },
      closeShowMyPatients() {
        this.registerPatient = false
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
      },
      getPatients() {

        db.collection('patient').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              'identification': doc.data().identification,
              'full_name': doc.data().full_name,
              'birthday': doc.data().birthday,
              'etnia': doc.data().etnia,
              'phone': doc.data().phone,
              'language': doc.data().language,
              'village': doc.data().village
            }
            this.patients.push(data)

          })
        })
      }


    }
  }

</script>


<style lang="css">

  button#btnCreatePatient {
    background: #2a672d;
    border: none;
  }

  span.badge.badge-pill.badge-light.email {
    position: relative;
    top: 8px;
  }

  .infoDidiver .infoBodyCard {
    margin: 0;
  }

  .infoDidiver {
    border-bottom: 1px solid #dddbdbb8;
  }

  .card-img-top {
    width: 100%;
    border-top-left-radius: calc(.25rem - 1px);
    border-top-right-radius: calc(.25rem - 1px);
    height: 12em !IMPORTANT;
  }

  div#navbar {
    background: #66a557 !IMPORTANT;
  }

  div#infoClasificationFloating {
    position: fixed;
    top: 15%;
    right: 3%;
    background: white;
    width: 25%;
    padding: 5px 14px;
    border-radius: 10px;
  }

  h5.card-title.info {
    text-align: center;
    font-size: 1.6em;
    color: #67a259;
    font-weight: bold;
    font-family: monospace;
    text-transform: capitalize;
  }

  p.card-text.info span {
    color: gray;
    font-weight: normal;
    font-size: 13px !important;
  }

  p.card-text.info {
    text-align: center;
    width: 50%;
    margin: auto;
  }


  p.card-text.info {
    text-align: center;
    width: 50%;
    margin: auto;
    text-transform: capitalize;
    cursor: pointer;
  }

  p.card-text.info:hover {
    color: #37510d;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .card-header {
    padding-bottom: 0;
  }

  label.lblgray {
    color: #898787;
  }

  .card.showStaff .card-body label, .card.showStaff .card-footer label {
    font-size: 13px;
  }

  .infoBodyCard {
    /* font-size: 12px; */
    display: inline-block;
  }

  .tags {
    list-style: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
    display: inline-block;
    vertical-align: top;
  }

  .tags li {
    float: left;
  }

  .tag {
    background: #c49a876e;
    border-radius: 5px;
    color: #000;
    display: inline-block;
    height: 26px;
    line-height: 26px;
    padding: 0px 5px 0 4px;
    position: relative;
    margin: 0 10px 10px 0;
    text-decoration: none;
    font-size: 13px;
    -webkit-transition: color 0.2s;
  }

  .tag:hover {
    background-color: #c49a87;
    color: white;
    text-decoration: none;
  }

  .card-footer {
    background: #3f1b102b;
    border-top: 2px solid #6c433136;
    z-index: 1;
    overflow: hidden;
  }

  .card.showStaff .card-header {
    text-align: center;
    color: #6c4331;
  }

  .infoName {
    text-align: left;
    color: #6c4331;
    font-weight: bold;
    text-transform: capitalize;
  }

  .card.showStaff .card-header h6 {
    font-weight: bold;
  }

  .card.showStaff .card-body label.lblgray {
    color: #898787;
    width: 8em;
  }

  li.tags.language {
    padding-top: 5px;
  }

  li.tags.language a {
    background: #d4bfb678;
    font-size: 11px;
  }

  li.tags.language a:hover {
    color: black;
  }

  .registerPatient {
    background: white;
    width: 24%;
    min-height: 44%;
    position: absolute;
    top: 5em;
    right: 2em;
    border: 1px solid #d4bfb64d;
    z-index: 1;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0px 0px 2px 2px #b65b3429
  }

  .registerPatient i.closeRegisterPatient {
    color: gray;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 19px;
    cursor: pointer;
  }

  i.fa.fa-times-circle.closeRegisterPatient:hover {
    color: #91766b;
    transition: .5s;
  }

  .card.showStaff {
    overflow: hidden;
    margin-top: 1em;
  }

  .showPatients {
    position: absolute;
    right: -1px;
    bottom: 62px;
    background: #d4bfb6;
    padding: 7px;
    border-radius: 1em;
    cursor: pointer;
    color: #52191a;
    z-index: 0;
  }

  .showPatients:hover {
    background: #52191a85;
    transition: 0.5s;
    color: #d4bfb6;
  }

  .preloaderGeneral {
    width: 96%;
    text-align: center;
    height: 80%;
    position: absolute;
    /* top: 10em; */
    z-index: 100;
    background: white;
  }

  .preloaderGeneral img {
    position: absolute;
    top: 20%;
    width: 3em;
  }

  .list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: #9d6c57;
    border-color: #ae826f;
    text-align: center;
  }

  span.badge.badge-primary.badge-pill i {
    margin-top: 4px;
  }

  .badge-primary {
    color: #fff;
    background-color: #6c4331;
    height: 24px;
    width: 24px;
    padding: 2px;
  }

  span.badge.badge-primary.badge-pill:hover {
    background: #6c433196;
    cursor: pointer;
  }

  .pacient-data {
    background: border-box;
    width: 12em;
  }

  .pacient-data .badge-identification {
    color: #646363 !important;
    font-size: 12px;
    display: block;
  }

  .pacient-data .name-pacient {
    font-size: 14px;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: #000;
  }

  span.name-pacient {
    text-transform: capitalize;
  }
  div#modalReportPatient .form-signin div {
    margin-bottom: 1em;
  }
  div#modalCreatePatient .form-signin div {
    margin-bottom: 1em;
  }
</style>
