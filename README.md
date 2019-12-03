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

# 引入axios，并加到原型链中
- import axios from 'axios';
- Vue.prototype.axios = axios;
- this.axios.get().then

# 封装axios 
1. 新建config文件夹 axios.js文件 引入axios
2. 可以使用自定义配置新建一个 axios实例 axios.create([config]) 

```JavaScript
//axios配置
const server = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000
});
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
- Mock.mock()第一个参数是需要拦截的接口，第二个参数表明ajax请求类型（get/post/put/delete等），第三个参数是模拟返回值的数据模版。
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

const data = () => {
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

export default {
   data
}
```

# 项目中引入Element-UI 和vuex
```JavaScript 

```

# Navicat Premium安装与激活
1. Patch，勾选Backup、Host和Navicat v12，然后点击Patch按钮,找到Navicat Premium 12安装路径下的navicat.exe，选中并点击打开,此时出现如下弹窗，提示navicat.exe - x64 -> Cracked.，提示已破解。若提示libcc.dll或navicat.exe出错，检查是否未关闭Navicat Premium，或到安装目录下将libcc.dll和navicat.exe删除，并将libcc.dll.BAK或navicat.exe.BAK去掉.BAK后缀名。否则卸载已安装的Navicat Premium并清理文件残留和注册表残留。
2. 确保License为Enterprise，Products为Premium，Languages为Simplified Chinese
3. 确保Resale Version为Site license；
4. Your Name和Your Organization可以任意填写，点击Generate，将自动生成Serial Keygen（即注册码）
5. 打开Navicat，点击菜单栏的帮助，选择注册，在注册窗口键处填入上一步生成的注册码，然后点击激活。
6. 弹框点击手动激活 将Navicat手动激活窗口的请求码框中内容复制到注册机，点击Activation Code下面的Generate按钮。将注册机生成的激活码内容复制到Navicat手动激活窗口的激活码框中，然后点击激活按钮。

# 安装MySQL数据库[参考文献](https://blog.csdn.net/qq_37350706/article/details/81707862)
1. 从官网下载压缩包解压
2. 初始化MySQL 必须以管理员身份运行cmd 进入到mysql的bin目录下
3. 在bin目录下执行命令：mysqld --initialize --console
- [注意] root @ localhost：后面的字符串就是初始密码。后续登录需要用到。复制密码先保存起来!!!
4. 安装MySQL服务 + 启动MySQL 服务
- mysqld --install [服务名]（服务名可以不加默认为mysql
- Service successfully installed 为成功
- the Service already exists! 说明mysql服务已存在 通过 sc delete mysql删除服务
5. 服务安装成功之后通过命令net start mysql启动MySQL的服务
6. 修改初始密码 在mysql的bin目录下 进行数据库连接  mysql -u root -p 输入之前保存的初始密码
7. ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
8. exit 退出数据库





