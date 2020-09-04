<template>
  <div class="hello">
    <h1>{{ data.title }}</h1>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup(props) {
    const data = reactive({
      title: props.msg
    });
    watch(() =>props.msg, (currentValue, preValue) => {
      data.title='hello '+ currentValue + ',bye '+ preValue
    })
    return { data };
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
