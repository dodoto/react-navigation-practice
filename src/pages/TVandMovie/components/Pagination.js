import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default function Pagination({size,current,changePage}) {
  const sizeArray = new Array(size).fill(1);    
  return (
    <View style={styles.box}>
      {
        sizeArray.map((item,index) => (
          <Text 
            style={[styles.page,current === index +1 && styles.current]} 
            key={index} 
            onPress={()=>changePage(index+1)}
          >
            {index+1}
          </Text>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    flexWrap: 'wrap',
    marginVertical: 20
  },
  page: {
    color: '#252525',
    borderWidth: 1,
    width: 30,height: 30,
    lineHeight: 30,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 4,
    marginRight: 4,
    borderColor: 'rgba(0, 0, 0, 0.06)'
  },
  current: {
    color: '#fff',
    backgroundColor: '#fdd200'
  }
});