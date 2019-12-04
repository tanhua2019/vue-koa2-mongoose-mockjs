# vue-koa2-mongoose
- 准备用搭建一个简易的登陆页
# vue-cli3快速创建项目[参考文章](https://www.jianshu.com/p/5e13bc2eb97c)
1. 全局安装 cnpm i @vue/cli -g 或者yarn global add @vue/cli 
2. 查看版本 vue -V
3. 创建项目 vue create my-project
4. 选择默认（default）还是手动（Manually）
5. 选择配置 注意，空格键是选中与取消，A键是全选
- TypeScript 支持使用 TypeScript 书写源码
- Progressive Web App (PWA) Support PWA 支持。
- Router 支持 vue-router 。
- Vuex 支持 vuex 。
- CSS Pre-processors 支持 CSS 预处理器。
- Linter / Formatter 支持代码风格检查和格式化。
- Unit Testing 支持单元测试。
- E2E Testing 支持 E2E 测试。
6. css的预处理 选的Less 
7. 格式化校验选择的是ESLint + Prettier
8. 选择语法检查方式，第一个是保存检测，第二个是fix和commit的时候检测
9. 配置文件存放地方，第一个是独立文件夹位置，第二个是在package.json文件里
10. 询问是否记录这一次的配置，以便下次使用，如一开始的时候会显示的vuecli3配置

# vue3配置绝对路径@踩坑
 - 和vue cli2相比文件目录少了很多配置，没有了build和config目录，vue cli3可以在项目根目录新建一个vue.config.js文件，像之前的很多繁琐配置，都可以在这个文件里配置啦。[参考文章](https://www.cnblogs.com/zhouyingying/p/11382157.html)
```JavaScript
const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("components", resolve("./src/components"))
    //set第一个参数：设置的别名，第二个参数：设置的路径
  }
};
```

# 前后端连载
- 安装concurrently
- "koa": "npm run serve  --prefix koa2-mongoose", --prefix指向需要连载的文件
- "dev": "concurrently \"npm run serve\" \" npm run koa \""

# vscode的eslint插件不起作用
1. vsCode打开“设置”，选择"settings.json",搜索eslint
2. Eslint>Code Action: show Documention 下面的settings.json中编辑
```JavaScript
"eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    },
    "vue"
  ],
  "eslint.autoFixOnSave": true
```
3. 输入内容重启

# 创建完毕准备工作
1. 新建pege文件夹，创建页面，修改router配置路径
2. 配置全局样式，assets文件下面新建一个文件夹css，里面新建一个reset.css文件，在main.js中引入
3. 配置一个404页面
4. 安装ElementUI 并且引入
```JavaScript
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

# 引入axios，并加到原型链中
- import axios from 'axios';
- Vue.prototype.axios = axios;
- this.axios.get().then

# 封装axios [axios官网](http://www.axios-js.com/zh-cn/docs/index.html#axios-request-config-1)
1. 新建config文件夹 axios.js文件 引入axios
2. 可以使用自定义配置新建一个 axios实例 axios.create([config]) 
3. 设置请求响应拦截(因为用axios要用到请求和响应拦截) 官网拦截器 设置加载动画
```JavaScript
//axios配置
import axios from "axios";
import { Loading, Message } from "element-ui";

let loading;
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中...",
    background: "rgba(0,0,0,0.7)"
  });
};

const endLoading = () => {
  loading.close();
};

//axios配置
const server = axios.create({
  baseURL: "/api",
  timeout: 5000
});

// 添加请求拦截器
server.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    startLoading();
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
server.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    endLoading();
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    Message.error(error.response.data);
    return Promise.reject(error);
  }
);

export default server;

```
3. 创建api文件夹 
```JavaScript
import request from "../config/axios";

export function userLogin(data) {
  return request({
    url: "/api/login",
    method: "post",
    data: data
  });
}
```

# 配置mockjs截取请求
- 先下mockjs包 新建mock文件夹，以及index.js
- 设置延时请求到数据,因为真实的请求是需要时间的，mock不设置延时则是马上拿到数据返回。
```JavaScript
import Mock from "mockjs";
import { mockLogin } from "./api";

//延时200-600毫秒请求到数据
Mock.setup({
    timeout: "200-600"
});

Mock.mock(/\/api\/login/, "post", mockLogin);

export default Mock;
```
- 拦截数据的方法Mock.mock(url,data);url用正则写也能拦截数据。
[参考文章](https://www.jianshu.com/p/742da49cad3c);
- Mock.mock( rurl, rtype, function( options ) )记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。 options指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性，
- 返回数据的文件 记得在main.js中导入mock不然不生效
```JavaScript 
// 例子1 api.js
export const mockLogin = config => {
  const { userName } = JSON.parse(config.body);
  return userInfo[userName];
};
// 例子2 data.js
import Mock from 'mockjs'
const Random = Mock.Random;

export const data = () => {
  let arr = []
  for (let i=0; i<100; i++) {
    let newArr = {
      username: Random.cname(),
      artical: Random.csentence(3,15),
      time: Random.date()+ ' ' + Random.time()
    }
    arr.push(newArr)
  }
  return arr
}
```

# 配置跨域请求(vue-cli3.0的配置方法)
```JavaScript
// webpack-dev-server 相关配置
devServer: {
  open: true,
  host: "localhost",
  port: 8080,
  https: false,
  hotOnly: false,
  proxy: {
    // 配置跨域
    "/api": {
      target: "http://localhost:3000/api/",
      ws: true,
      changOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    }
  }
}
```




