import { StyleSheet } from 'react-native';

export const DrawerStyles = StyleSheet.create({
  container: { flex: 1 },
  img: {
    marginTop: 80,
    marginBottom: 40,
    textAlign: 'center',
    backgroundColor: 'yellow',
    width: 80, 
    height: 80,
    borderRadius: 100,
    alignSelf: 'center'
  },
  btn: {
    marginLeft: 10,
    paddingRight: 20,
    borderBottomColor: '#707277',
    borderBottomWidth: .2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: '#505050',
    fontSize: 15,
    lineHeight: 50,
  },
});