<template>
  <div class="LoginBox">
    <div class="login">
      <p class="center">欢迎光临</p>
      <div class="inputBox">
        <div class="inputBoxTop center">
          <span @click="select(0)" :class="{ select: cur === 0 }">登陆</span>
          <span @click="select(1)" :class="{ select: cur === 1 }">注册</span>
        </div>

        <div class="center" v-if="cur == 0">
          <el-form :model="userInfo" :rules="rules" ref="userInfo">
            <el-form-item prop="name">
              <el-input
                placeholder="请输入账号"
                v-model="userInfo.name"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="请输入密码"
                type="password"
                v-model="userInfo.password"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm1('userInfo')"
                >登陆</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="center" v-else>
          <el-form :model="registerInfo" :rules="rules" ref="registerInfo">
            <el-form-item prop="name">
              <el-input
                placeholder="请输入账号"
                v-model="registerInfo.name"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                placeholder="请输入邮箱码"
                v-model="registerInfo.email"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="请输入密码"
                type="password"
                v-model="registerInfo.password"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm2('registerInfo')"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin, userRegister } from "@/api";
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var checkemail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        name: [{ validator: checkName, trigger: "blur" }],
        password: [{ validator: checkPwd, trigger: "blur" }],
        email: [{ validator: checkemail, trigger: "blur" }]
      },
      cur: 0,
      userInfo: {
        name: "",
        password: ""
      },
      registerInfo: {
        name: "",
        email: "",
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
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login(formName);
        } else {
          return false;
        }
      });
    },
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register(formName);
        } else {
          return false;
        }
      });
    },
    login(formName) {
      userLogin(this.userInfo).then(res => {
        // this.setName(res.data.name);
        // this.setToken(res.data.token);
        // this.$router.push("/home");
        if (res.data.code == 500) {
          this.$message.error(res.data.message);
          this.$refs[formName].resetFields();
        } else {
          this.$router.push("/home");
        }
      });
    },
    register(formName) {
      userRegister(this.registerInfo).then(res => {
        if (res.data.code == 500) {
          this.$message.error(res.data.message);
          this.$refs[formName].resetFields();
        } else {
          this.$message({
            type: "success",
            message: "注册成功"
          });
          this.$router.go(0);
        }
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
    background: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    p {
      height: 50px;
      font-size: 18px;
    }
    .inputBox {
      .inputBoxTop {
        height: 40px;
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
    }
  }
}
</style>
<style lang="less">
.LoginBox {
  .el-input__inner {
    border-radius: 10px;
    padding: 0 20px;
  }
  .el-form-item__error {
    padding-left: 10px;
  }
  .el-form-item__content {
    text-align: center;
  }
}
</style>
