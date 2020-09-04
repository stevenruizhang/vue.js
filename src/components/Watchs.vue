<template>
  <div class="hello">
    <div v-bind:key="item" v-for="item of result">{{item}}</div>
    <input type="text" v-model="keyword">
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup(props) {
    const keyword = ref('')
    const result = ref([])
    function getResult(keyword) {
      return setTimeout( function() {
        result.value.push(keyword)
      },2000)
    }
    watch( [() => props.msg, keyword],([c1,c2],[p1,p2],onInValidate)=> {
      console.log('c1:'+c1,'p1:'+p1)
      console.log('c2:'+c2,'p2:'+p2)       
      const timer1 = getResult(c1)
      const timer2 = getResult(c2)
      console.log(timer2)
      onInValidate(() => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      })
    })
    return { keyword, result}
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
