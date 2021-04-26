import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  ActivityIndicator, 
  FlatList, 
  Text, 
  StyleSheet ,
  Animated,
  Easing,
  PanResponder
} from 'react-native';

//react-native-gesture-handler 和 react-native-reanimated 太复杂了,还是用 PanResponder 和 Animated 吧


import { connect } from 'react-redux'; 
import { novelDetail } from '../../request/api/novels';
import { useFetch } from '../../request/api/hook';
import Loading from '../../components/Loading';
import { keyExtractor, getItemLayout as layout } from '../../util/fun';
import Chapter from './component/Chapter';
import NovelPage from './component/NovelPage';
import NovelInfoBox from './component/NovelInfoBox';
import { setCurrentNovel, resetCurrentNovel, setCatalog } from '../../store/module/ReaderModule/ActionCreators';
import { H } from '../../util/const';


function getItemLayout(data,index) {
  return layout(data,index,50);
}

function NovelDetail({setInfo,clearInfo,initCatalog,navigation, route: {params:{id, bookName, index, author, imgUrl, descr,title,href}}}) {

  //一页100条
  const [ page, setPage ] = useState(1);  
  
  const { result, setResult, loading, abortController } = useFetch(novelDetail,[id]);  //数据

  const [refreshLoading,setRefreshLoading] = useState(false);

  

  const refresh = () => {
    let message;
    setRefreshLoading(true);
    novelDetail(id,abortController.current.signal)
    .then(res => setResult(res))
    .catch(err => {
      if(err.name !== 'AbortError') ToastAndroid.show(err,300);
      message = err.message;
    })
    .finally(() => {
      // 'Aborted'
      if(message !== 'Aborted') setRefreshLoading(false)
      Animated.timing(
        dragY,
        {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true
        }
      ).start()
    })
  }

  const toNovelRead = useCallback((title,href,index) => {
    navigation.navigate('NovelRead',{title,href,index,id});
  },[navigation]);

  const renderData = result?.slice((page-1) *100,page * 100);

  const pickers = useRef();  //分页器数据      
  
  const list = useRef();

  const renderItem = ({item}) => {
    return (
      <Chapter 
        title={item.chapter} 
        href={item.href} 
        index={item.index}  
        toNovelRead={toNovelRead}
      />
    );
  }
      
  const pageChange = (page) => {
    //210 = 170 + 40 NovelInfoBox
    setPage(page);
    requestAnimationFrame(() => {
      // list.current.getNode().scrollToOffset({offset:0,animated:false});
      list.current.scrollToOffset({offset:0,animated:false});
    });
  };

  const dragY = useRef(new Animated.Value(0)).current;  //手势移动的值

  const THRESHOLD = 90 

  const diff = 0.25

  const pan = PanResponder.create({
    onStartShouldSetPanResponder: () => !refreshLoading,
    onPanResponderMove: Animated.event(
      [null, { dy: dragY}],
      {useNativeDriver: false}
    ),
    onPanResponderRelease: (evt,{ dy }) => {
      
      if(dy * diff > THRESHOLD) {
        refresh()
      }else{
        Animated.spring(
          dragY,
          {
            toValue: 0,
            useNativeDriver: true
          }
        ).start()
      }
    }
  });

  const _translateY = Animated.multiply(dragY,diff)

  const translateY = _translateY.interpolate({   //动画值
    inputRange: [0,H+100],
    outputRange: [0,H+100],
    extrapolate: 'clamp'
  })

  useEffect(()=>{
    if(result) {
      let currentPage = Math.ceil(index/100);
      if(currentPage === 0) currentPage = 1;
      setPage(currentPage);
      let total = Math.ceil(result.length/100);
      pickers.current = [...Array(total).keys()].map(item => ({label:`第${item+1}页`,value:item+1}));
    }
  },[result]);

  //保存当前要阅读的小说的信息和目录
  useEffect(() => {
    if(result) {
      initCatalog(result)
    }
  },[result]);

  useEffect(() => {
    const info = {author,bookName,descr,id,imgUrl,index,title,href};
    setInfo(info);
    return () => {
      initCatalog([])
      clearInfo()
    }
  },[])

  return (
    <>  
      {
        loading ?
        <Loading />:
        <>
          <Animated.View style={[styles.refreshBack,{transform:[{translateY}]}]}>
            <ActivityIndicator 
              size="large" 
              color="#409EFF" 
              animating={refreshLoading} 
              hidesWhenStopped={false}
            />
            {!refreshLoading && <Text style={styles.tip}>松开</Text>}
          </Animated.View>

          <Animated.View 
            {...pan.panHandlers}
            style={[{flex:1,backgroundColor:'#fff'},{transform:[{translateY}]}]}
          >
            <NovelInfoBox navigation={navigation}/>
            <FlatList 
              ref={list}
              style={{flex:1}}
              data={renderData}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              getItemLayout={getItemLayout}
              ListFooterComponent={<NovelPage pickers={pickers} page={page} pageChange={pageChange}/>}
              // ListHeaderComponent={}
            />
          </Animated.View>
        </>
      }
    </>
  );
}

const styles = StyleSheet.create({
  refreshBack: {
    width:'100%',
    height: H,
    // backgroundColor:'skyblue',
    justifyContent: 'flex-end',
    position:'absolute',
    zIndex:-1,
    top: -H,
    paddingBottom: 60
  },
  tip: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 160,
    zIndex: -1,
    textAlign: 'center',
    lineHeight: 160
  }
})

const mapState = () => ({})

const mapDispatch = dispatch => ({
  setInfo(info) {
    dispatch(setCurrentNovel(info))
  },
  clearInfo() {
    dispatch(resetCurrentNovel())
  },
  initCatalog(catalog) {
    dispatch(setCatalog(catalog))
  }
});

export default connect(mapState,mapDispatch)(NovelDetail);