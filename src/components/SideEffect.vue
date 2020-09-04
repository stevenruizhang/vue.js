<template>
  <div class="hello">
    <div v-bind:key="item" v-for="item of result">{{item}}</div>
    <input type="text" v-model="keyword">
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup() {
    const keyword = ref('')
    const result = ref([])
    function getResult(keyword) {
      return setTimeout( function() {
        result.value.push(keyword)
      },2000)
    }
    watchEffect( (onInValidate)=> {
      console.log(keyword.value)      
      const timer = getResult(keyword.value)
      onInValidate(() => {
        clearTimeout(timer)
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
