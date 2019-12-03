<template>
  <div class="LoginBox">
    <div class="login">
      <p class="center">欢迎光临</p>
      <div class="inputBox">
        <div class="inputBoxTop center">
          <span @click="select(0)" :class="{select:cur === 0}">登陆</span>
          <span @click="select(1)" :class="{select:cur === 1}">注册</span>
        </div>
        <div class="inputBoxContent center" v-if="cur === 0">
          <el-input placeholder="请输入账号" type="text" v-model="userInfo.userName"></el-input>
          <el-input placeholder="请输入密码" type="password" v-model="userInfo.password"></el-input>
          <el-button @click="login">登陆</el-button>
        </div>
        <div class="inputBoxContent center" v-else>
          <el-input placeholder="请输入账号"></el-input>
          <el-input placeholder="请输入密码"></el-input>
          <el-button>注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api";
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      cur: 0,
      userInfo: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapMutations({
      setToken: "SET_CLIENT_TOKEN",
      setName: "SET_CLIENT_NAME"
    }),
    select(index) {
      this.cur = index;
    },
    login() {
      userLogin(this.userInfo)
        .then(res => {
          console.log(res.data, "9999");
          this.setName(res.data.name);
          this.setToken(res.data.token);
          this.$router.push("/home");
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/var.less";
.LoginBox {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(../assets/images/client.jpg) no-repeat;
  background-size: 100% 100%;
  .login {
    position: absolute;
    top: 50%;
    margin-top: -150px;
    left: 20%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    p {
      height: 50px;
      font-size: 18px;
    }
    .inputBox {
      border: 1px solid red;
      .inputBoxTop {
        height: 50px;
        span {
          display: inline-block;
          width: 50px;
          text-align: center;
          padding: 5px 0;
          margin: 0 20px;
          color: @fontDefaultColor;
          cursor: pointer;
        }
        .select {
          border-bottom: 2px solid @secondColor;
          color: @secondColor;
        }
      }
      .inputBoxContent {
        flex-wrap: wrap;
      }
    }
  }
}
</style>
