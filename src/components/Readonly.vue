<template>
  <div class="hello">
    <h1>{{data.title}}</h1>
    <h1 v-html="titleHtml"></h1>
    <button @click="handleUpdate">change</button>
  </div>
</template>

<script>
import { reactive, computed, readonly, watchEffect } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup() {
    const titleHtml = readonly(computed({
      get: () => '<span style="color: blue">' + data.title + "</span>",
      set: value => {
        data.title = value;
      }
    }));
    const data = reactive({
      title: "hello world"
    });

    const dataCopy = readonly(data)
    watchEffect( () =>{
      console.log(dataCopy.title)
    })
    function handleUpdate() {
      // titleHtml.value = "hello tom";
      // dataCopy.title = 'hello tom'
      data.title = "hello tom";
    }
    return { data, titleHtml, handleUpdate };
  },
  beforeCreate() {
    console.log("before create");
    console.log(this);
  }
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
