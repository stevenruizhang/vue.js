<template>
  <div class="hello">
    <h1>{{data.title}}</h1>
    <h1 v-html="titleHtml"></h1>
    <button ref="btn" @click="handleUpdate">change</button>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  computed,
  readonly,
  watchEffect,
  onUpdated,
  onBeforeUpdate,
  onMounted
} from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup() {
    const btn = ref(null);
    const titleHtml = readonly(
      computed({
        get: () => '<span style="color: blue">' + data.title + "</span>",
        set: value => {
          data.title = value;
        }
      })
    );
    const data = reactive({
      title: "hello world"
    });

    //const dataCopy = readonly(data)
    onMounted(() => {
      const stop = watchEffect(
        () => {
          console.log(data.title);
          console.log(btn.value);
        },
        {
          // flush: 'sync'
          // onTrigger(e) {
          //   console.log(e);
          // }
        }
      );
      stop();
    });
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });
    onUpdated(() => {
      console.log("onUpdated");
    });
    function handleUpdate() {
      // titleHtml.value = "hello tom";
      // dataCopy.title = 'hello tom'
      data.title = "hello tom";
    }
    return { data, titleHtml, handleUpdate, btn };
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
