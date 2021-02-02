import React,{ useState }  from 'react';
import { 
  Text, 
  View, 
  Modal,
  Button,
  TextInput, 
  ToastAndroid, 
  StyleSheet,
  KeyboardAvoidingView, 
} from 'react-native';

import Loading from '../../components/Loading';
import { postBookComment } from '../../request/api/book';
import { useAbortController } from '../../request/api/hook';

export default function CommentSend({navigation,route}) {

  const [txt,setTxt] = useState('');

  const [loading,setLoading] = useState(false);

  const { abortController } = useAbortController();

  const txtChangeHandler = text => {
    if(txt.length < 11) {
      setTxt(text);
    }else{
      ToastAndroid.show('评论长度不能超过12个字符',400);
    };
  };

  const send = () => {
    let sendTxt = txt.trim();
    if(sendTxt) {
      setLoading(true);
      //params = {book_id: int, content: string length=12}
      postBookComment({book_id:route.params.id,content:sendTxt},abortController.signal)
      .then(res => {
        if(res.error_code){
          ToastAndroid.show(res.msg,400);
        }else{
          ToastAndroid.show('发送成功,但是不会显示出来',400);
        };
      })
      .catch(err => console.log(err))
      .finally(()=> {
        setLoading(false);
        requestAnimationFrame(()=>{
          navigation.goBack();
        });
      })
    }else{  
      ToastAndroid.show('发送内容不能为空',400);
    }
  }

  const back = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <Text style={{flex:1}} onPress={back}></Text>
      <KeyboardAvoidingView>
        <View style={styles.inputContainer}>
          <TextInput 
          value={txt}
          onChangeText={txtChangeHandler}
          autoFocus
          numberOfLines={1}
          style={styles.input}/> 
          <Text style={styles.txtlimit}>{txt.length}/12</Text>
        </View>
        <Button title="发送" color="#409EFF" onPress={send}/>
      </KeyboardAvoidingView>
      <Modal visible={loading} transparent={true}>
        <Loading color={"#fff"}/>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'flex-end'
  },
  inputContainer: {
    backgroundColor:'#fff',
    position:'relative'
  },
  input: {
    margin: 10,
    borderColor:'#EBEEF5',
    borderWidth:1,
    borderRadius:5,
    height:40,
    // textAlignVertical:'top',
    paddingHorizontal:5,
  },
  txtlimit: {
    position:'absolute',
    right:14,
    bottom:14,
    fontSize: 12,
    color:'#C0C4CC'
  }
});