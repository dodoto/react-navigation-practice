# lucky-draw 

# 路由说明
  1. 练习抽屉路由

  2. Book + Journal  = 抽屉路由

  3. 抽屉路由 + BookDetail = Stack 路由(app)
  
# 项目运行
  1. 按照 react-native 官网配置好环境.
  
  2. git clone
  
  3. npm install
  
  4. 运行 react-native run-android 即可

# 问题记录
  在代码中引入 
  ```
  import { resolvePlugin } from '@babel/core';
  ```
  会导致
  Unable to resolve module `path` from `node_modules\@babel\core\lib\config\item.js`: path could not be fou nd within the project.
  [详情](https://github.com/facebook/react-native/issues/28624)
