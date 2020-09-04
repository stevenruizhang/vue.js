<template>
  <div>
    <div>useName: {{userInfo.userName}}</div>
    <div>announcement: {{announcement.title}}</div>
    <button @click="handleGet">get</button>
    <button @click="handleGet1">get1</button>
    <button @click="handlePost">post</button>
    <button @click="handlePut">put</button>
    <button @click="handlePatch">patch</button>
    <button @click="handleDelete">delete</button>
    <button @click="handleConcurrent">concurrent</button>
    <button @click="handleConfig">config</button>
    <button @click="handleAxious">axious</button>
    <button @click="handleRequest">request</button>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Index",
  data() {
    return {
      userInfo: {
        userName: "test001"
      },
      announcement: {
        title: "title001"
      },
      cancelRequest: null,
      cancelRequestList: []
    };
  },
  mounted() {
    this.handleConcurrent();
  },
  created() {
    const that = this;
    axios.interceptors.request.use(function(config) {
      const flag = config.url + config.method;
      const index = that.cancelRequestList.findIndex(function(item) {
        return item.flag === flag;
      });
      if (index !== -1) {
        that.cancelRequestList[index].cancel("cancel request");
        that.cancelRequestList.splice(index,1);
      }
      const CancelToken = axios.CancelToken;

      config.headers.token = "aswds123";
      config.cancelToken = new CancelToken(function(cancel) {
        that.cancelRequestList.push({
          flag: flag,
          cancel: cancel
        });
      });
      return config;
    });
  },
  methods: {
    handleRequest: function() {
      axios.get("/data.json", {}).catch(function(err) {
        console.log(err.message);
      });
    },
    handleAxious: function() {
      axios.defaults.timeout = 1;
      const instance = axios.create({
        //url: "/data.json",
        timeout: 1000
      });
      // const instance1 = axios.create({
      //   //url: "/data.json",
      //   timeout:1000
      // })
      // instance.defaults.timeout = 1000
      instance.get("/data.json");
      // instance1.get("/data.json")
    },
    handleConfig: function() {
      //const CancelToken = axios.CancelToken;
      //   const source = CancelToken.source()
      // if (typeof this.cancelRequest === "function") {
      //   this.cancelRequest("canceled");
      // }
      //   this.cancelRequest = source.cancel
      // const that = this;
      axios({
        // cancelToken: new CancelToken(function(c) {
        //   that.cancelRequest = c;
        // }),
        url: "/post",
        baseURL:'http://api.vue.5656dh.com/api',
        method: "post",
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded"
        // },
        // params: {
        //   ids: [123, 456]
        // },
        data: {
          title: "title001"
        },
        // transformRequest: [
        //   function(data) {
        //     data.content = "content001";
        //     return data;
        //   },
        //   function(data) {
        //     return qs.stringify(data);
        //   }
        // ],
        //timeout:1000,
        // auth: {
        //   username: "test",
        //   password: "123456"
        // }
        // responseType: "json",
        // transformResponse: [
        //   function(data) {
        //     data.id = 123;
        //     return data;
        //   }
        // ],
        // paramsSerializer:function(params) {
        //     return qs.stringify(params,{arrayFormat:'comma'})
        // }
      })
        .then(function(res) {
          console.log(res.data);
        })
        .catch(function(err) {
          if (axios.isCancel(err)) {
            console.log(err.message);
          }
        });
    },
    handleGet: function() {
      axios
        .get("/data.json", {
          params: {
            id: 123
          }
        })
        .then(function(response) {
          console.log(response);
        }),
        function(err) {
          console.log("err:" + err.message);
        };
    },
    handleConcurrent() {
      var _that = this;
      axios
        .all([axios.get("/user.json"), axios.get("/announcement.json")])
        .then(
          axios.spread(function(res, res1) {
            _that.userInfo = res.data;
            _that.announcement = res1.data;
          })
        )
        .catch(function(err) {
          console.log("message:" + err.message);
        });
    },
    handleDelete: function() {
      axios.delete("/delete", {data: {id: 123}}).then(function(response) {
          console.log(response);
        }),
        function(err) {
          console.log("err:" + err.message);
        };
    },
    handleGet1: function() {
      axios({
        url: "/data.json",
        method: "get",
        params: {
          id: 123
        }
      });
    },
    handlePost: function() {
      var data = {
        title: "hello world",
        brief: "vue"
      };
      var formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      axios.post("/post", qs.stringify(data)).then(function(response) {
        console.log(response);
      }),
        function(err) {
          console.log("err:" + err.message);
        };
    },
    handlePut: function() {
      var data = {
        title: "hello world",
        brief: "vue"
      };
      axios.put("/put", data).then(function(response) {
        console.log(response);
      }),
        function(err) {
          console.log("err:" + err.message);
        };
    },
    handlePatch: function() {
      var data = {
        title: "hello world",
        brief: "vue"
      };
      axios.patch("/patch", data).then(function(response) {
        console.log(response);
      }),
        function(err) {
          console.log("err:" + err.message);
        };
    }
  }
};
</script>