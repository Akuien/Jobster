<template>
    <div>
        <tr v-for="freelancer in Freelancers"></tr>
        <p>All the freelancers</p>
        <p>{{freelancers}}</p>
        
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import api from '../Api';
import 


export default { 
  name: 'freelancer',
  data(){
    return{
        Freelancers: [],
    }
  },
  mounted() {
    axios.get(api + '/freelancers')
    .then((response) => {
        console.log(response.data);
        this.Freelancers = response.data;
    })
    .catch((error) => {
        console.log(error);
    }
  }
}

</script>
