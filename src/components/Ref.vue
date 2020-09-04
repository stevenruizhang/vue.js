<template>
  <div class="hello">
    <h1>{{data.get('title')}}</h1>
    <button @click="handleUpdate">change</button>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup(props, { emit }) {
    const title = ref("hello world");
    const data = reactive(new Map([
        ['title',title.value]
    ]));
    function handleUpdate() {
      data.set('title','hello tom');
    }
    console.log(props, emit);
    return { data, handleUpdate };
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
