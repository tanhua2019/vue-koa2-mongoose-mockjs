# koa-generator(快速搭建项目)
- 运行koa2 项目名称
- 目录结构
```JavaScript
+-- bin
|   +-- www               // 项目启动必备文件,配置端口等服务信息
+-- node_modules          // 项目依赖，安装的所有模块都会在这个文件夹下
+-- public                // 存放静态文件，如样式、图片等
|   +-- images            // 图片
|   +-- javascript        // js文件
|   +-- stylesheets       // 样式文件
+-- routers               // 存放路由文件，如果前后端分离的话只用来书写api接口使用
|   +-- index.js
|   +-- user.js
+-- views                 // 存放存放模板文件，就是前端页面，如果后台只是提供api的话，这个就是备用
|   +-- error.pug
|   +-- index.pug
|   +-- layout.pug
+-- app.js                // 主入口文件
+-- package.json          // 存储项目名、描述、作者、依赖等等信息
+-- package-lock.json     // 存储项目依赖的版本信息，确保项目内的每个人安装的版本一致
```
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

# Navicat Premium安装与激活
1. Patch，勾选Backup、Host和Navicat v12，然后点击Patch按钮,找到Navicat Premium 12安装路径下的navicat.exe，选中并点击打开,此时出现如下弹窗，提示navicat.exe - x64 -> Cracked.，提示已破解。若提示libcc.dll或navicat.exe出错，检查是否未关闭Navicat Premium，或到安装目录下将libcc.dll和navicat.exe删除，并将libcc.dll.BAK或navicat.exe.BAK去掉.BAK后缀名。否则卸载已安装的Navicat Premium并清理文件残留和注册表残留。
2. 确保License为Enterprise，Products为Premium，Languages为Simplified Chinese
3. 确保Resale Version为Site license；
4. Your Name和Your Organization可以任意填写，点击Generate，将自动生成Serial Keygen（即注册码）
5. 打开Navicat，点击菜单栏的帮助，选择注册，在注册窗口键处填入上一步生成的注册码，然后点击激活。
6. 弹框点击手动激活 将Navicat手动激活窗口的请求码框中内容复制到注册机，点击Activation Code下面的Generate按钮。将注册机生成的激活码内容复制到Navicat手动激活窗口的激活码框中，然后点击激活按钮。

## 链接数据库
1. 安装包 新建db文件夹，mongoose.js文件
2. 引包 mongoose.connect("mongodb://127.0.0.1:27017/test", (err,suc) => {}) 报警告添加如下参数{ useNewUrlParser: true,useUnifiedTopology: true }
3. 新建一个model目录，目录下新建一个user.js,这就相当于创建了一个user表,在Mongoose中，所有数据都由一个 Schema 开始创建。new Schema('表名称，数据库会自动加s',{字段名称})
- exports只是module.exports的引用,如果你想要使用exports导出模块，千万不能给它赋值！
4. 测试数据库连接成功，首先将require('./db/mongoose')引入app.js,然后在routers下的user.js里面引入创建的model,完成
### 搭建注册接口并且存储数据
- koa-bodyparser用来解析body的中间件，比方说你通过post来传递表单，json数据，或者上传文件，在koa中是不容易获取的，对于POST请求的处理，可以把koa2上下文的formData数据解析到ctx.request.body中。
- 安装引入加密工具 
- const bcrypt = require('bcryptjs')
- const salt = bcrypt.genSaltSync(10);
- bcrypt.hashSync(ctx.request.body.password, salt);
- 使用全球公认头像gravatar 安装引入
- 安装jsonwebtoken 