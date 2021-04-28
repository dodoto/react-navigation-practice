# 项目说明
  这是一个 react-navigation 5.x, react-native-reanimated, react-native-gesture-handler的学习项目.
  使用了react-native里android的api,所以只能打包成apk.
  
# 路由说明
  1. TVandMovie = TopTab路由

  2. Book + Journal + TopTab路由  = 抽屉路由

  3. 抽屉路由 + Detail + CommentSend = Stack 路由(app)

# src目录说明 
  ```
  ├─src
  │  ├─components                           //公共组件
  │  │      BookItem.js
  │  │      BookList.js
  │  │      Loading.js
  │  │      TVandMovieList.js
  │  │      
  │  ├─context                              //Context,目前仅用于传递navigation
  │  │      TestContext.js
  │  │      
  │  ├─pages                                //页面
  │  │  ├─Book                              //书籍
  │  │  │      index.js
  │  │  │      
  │  │  ├─BookDetail                        //书籍详情
  │  │  │  │  index.js
  │  │  │  │  
  │  │  │  ├─components                     
  │  │  │  │      BookComment.js
  │  │  │  │      
  │  │  │  └─config
  │  │  │          BookDetailOpts.js
  │  │  │          
  │  │  ├─BookSearch                         //书籍搜索
  │  │  │      index.js
  │  │  │      
  │  │  ├─CommentSend                        //发送评论
  │  │  │  │  index.js
  │  │  │  │  
  │  │  │  └─config
  │  │  │          CommentSendOpts.js
  │  │  │          
  │  │  ├─Journal                             //期刊
  │  │  │  │  index.js
  │  │  │  │  
  │  │  │  ├─components
  │  │  │  │      JouranlItem.js
  │  │  │  │      
  │  │  │  └─config
  │  │  │          JournalOpts.js
  │  │  │          
  │  │  ├─TVandMovie                          //fix 字幕组
  │  │  │  │  index.js
  │  │  │  │  
  │  │  │  └─components
  │  │  │          Pagination.js
  │  │  │          TVandMovieItem.js
  │  │  │          
  │  │  └─TVandMovieDetail                     // 字幕组资源详情
  │  │      │  index.js
  │  │      │  
  │  │      └─config
  │  │              TVandMovieDetailOpts.js
  │  │              
  │  ├─request                          
  │  │  │  https.js                             //基础请求函数
  │  │  │  
  │  │  └─api
  │  │          book.js
  │  │          hook.js
  │  │          journal.js
  │  │          tv&movie.js
  │  │          
  │  ├─router                                   //路由
  │  │  │  DrawerNavigator.js
  │  │  │  StackNavigator.js
  │  │  │  TopNavigator.js
  │  │  │  
  │  │  ├─components
  │  │  │      DrawerContent.js
  │  │  │      
  │  │  └─config
  │  │          Style.js
  │  │          
  │  └─util                                     //工具函数和常量
  │          const.js
  │          fun.js
  ``` 
  
# 项目运行
  1. 按照 react-native 官网配置好环境.
  
  2. git clone
  
  3. npm install
  
  4. 运行 react-native run-android 即可

# 问题记录
  1.

  在代码中引入 
  ```
  import { resolvePlugin } from '@babel/core';
  ```
  会导致
  Unable to resolve module `path` from `node_modules\@babel\core\lib\config\item.js`: path could not be fou nd within the project.
  [详情](https://github.com/facebook/react-native/issues/28624)

  2.

  TouchableNativeFeedback 需要一个 View 作为根

  3.

  键盘收起会导致路由上下切换的跳转动画卡顿
  ```
  "@react-navigation/native": "^5.9.0"
  "@react-navigation/stack": "^5.13.0"
  ```
  目前使用定时器错开收起和动画

  4.

  ScrollView无法被指定高度,ScrollView需要指定高度才能正常工作,所以需要外面裹一层View或者flex:1,且不能有使用padding类样式

  5.

  使用react-native-gesture-handler, ScrollView 嵌套在 PanGestureHandler中时,会无法滚动.
  需要使用库提供的 ScrollView ,设置 PanGestureHandler waitFor 属性为 滚动列表实例.

  6.

  const AnimatedTextInput = Animated.createAnimatedComponent.
  AnimatedTextInput在scaleX(0) 的情况下仍能被触摸focus到.

  7.

  redux的数据会在app杀死进程的时候被清空,如果在useEffect中对应数据的保存会变成存一个空数据.
  选择在AppState change的事件中做保存没有这个问题.