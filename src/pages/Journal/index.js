import React, { useEffect, useState } from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Feather from 'react-native-vector-icons/Feather';

import { getAllJournal } from '../../request/api/journal';
import { useFetch } from '../../request/api/hook';

export default function Journal({navigation,route}) {
  
  const dimensions = useWindowDimensions(); 

  useEffect(()=>{
    SplashScreen.hide();
  },[]);

  let { result, loading } = useFetch(getAllJournal);
  const [index,setIndex] = useState(0);

  let next = () => {
    if(index != result.length-1) setIndex(index+1);
  };

  let previous = () => {
    if(index !== 0) setIndex(index-1);
  }

  return (
    <View>
      <Image 
        source={{uri:(result[index]).image}}
        style={{width:dimensions.width,height:dimensions.width*0.66}}
      />
      <Text style={styles.content}>{(result[index]).content}</Text>
      <View style={styles.titlebox}>
        <Feather 
          onPress={previous}
          name="chevron-left" 
          color="#606266" 
          size={20} 
          style={{marginRight:20}}
        />
        <Text style={styles.title}>
          {(result[index]).title}
        </Text>
        <Feather 
          onPress={next}
          name="chevron-right" 
          color="#606266" 
          size={20} 
          style={{marginLeft:20}}
        />
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 40,
    marginHorizontal: 20,
    fontSize: 16,
    color: '#606266'
  },
  titlebox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'#e0e0e0',
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderRadius: 4
  },
  title: {
    lineHeight: 40,
  }
});