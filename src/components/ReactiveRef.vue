<template>
  <div class="hello">
    <h1>{{title}}</h1>
    <button @click="handleUpdate">change</button>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup(props, { emit }) {
    const title = ref("hello world");
    const data = reactive({
        title
    })
    function handleUpdate() {
      data.title='hello tom';
    }
    console.log(props, emit);
    return { ...toRefs(data), handleUpdate };
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
