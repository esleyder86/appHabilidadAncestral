<template>
  <div id="dashboard">
    <h3>Personal</h3>
    <br>

    <div class="card-deck">
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
              <li class="tags language" v-for="awname in staff.language"><a href="#" class="tag">{{awname.name}}</a></li>
            </div>
            <div class="infoDidiver">
              <label class="lblgray"><i class="fa fa-fire"></i> Vereda:</label>
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
              <li class="tags" v-for="awname in staff.ancestralWisdomName"><a href="#" class="tag">{{awname.name}}</a></li>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'

  export default {
    name: 'dashboard',
    data() {
      return {
        staffs: [],
      }
    },
    created() {
      db.collection('staff').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          function calculateAge(birthday) {
            var birthday_arr = birthday.split("-");
            var birthday_date = new Date(birthday_arr[2], birthday_arr[1] - 1, birthday_arr[0]);
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
      })
    },
    methods: {}
  }


</script>

<style lang="css">
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

  .card.showStaff .card-body label,.card.showStaff .card-footer label {
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
    border-top: 2px solid #6c433136
  }
  .card.showStaff .card-header {
    text-align: center;
    color: #6c4331;
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
</style>
