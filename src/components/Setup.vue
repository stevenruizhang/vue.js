<template>
  <div class="hello">
    <h1>{{ data.title }}</h1>    
    <button @click="handleUpdate">update</button>
  </div>
</template>

<script>
import { reactive, watchEffect } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup(props, {emit}) {
    console.log('setup')
    const data = reactive({
      title: props.msg
    });
    watchEffect(()=> {
        data.title = props.msg
    })
    function handleUpdate() {
        emit('update') 
    }   
    return { data,  handleUpdate};
  },
  beforeCreate() {
      console.log('before create')
      console.log(this)
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
