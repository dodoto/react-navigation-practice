import React,{ useState }  from 'react';
import { View, KeyboardAvoidingView, TextInput, Button, Text, ToastAndroid, StyleSheet } from 'react-native';

export default function CommentSend({navigation}) {

  const [txt,setTxt] = useState('');

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
      ToastAndroid.show('发送成功',400);
      navigation.goBack();
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
          style={styles.input}/> 
              <Text style={styles.txtlimit}>{txt.length}/12</Text>
        </View>
        <Button title="发送" color="#409EFF" onPress={send}/>
      </KeyboardAvoidingView>
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
    textAlignVertical:'top',
    paddingHorizontal:5,
  },
  txtlimit: {
    position:'absolute',
    right:14,
    bottom:14,
    color:'#C0C4CC'
  }
});