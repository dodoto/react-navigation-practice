import { StyleSheet } from 'react-native';

export const MenuStyles = StyleSheet.create({
  body: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
  },
  container:{
    borderRadius:10,
    backgroundColor:'#fff',width:'80%'
  },
  title:{
    textAlign: 'center',
    color: '#909399',
    lineHeight: 40
  },
  select: {
    borderTopColor: '#E4E7ED',
    borderTopWidth: 1,
    color: '#303133',
    textAlign: 'center',
    lineHeight: 60,
    fontWeight: '700',
    fontSize: 15
  }
});