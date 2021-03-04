import React, { memo } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Loading from '../../components/Loading';

import { useFetch } from '../../request/api/hook';
import { getFixSearchResult } from '../../request/api/tv&movie';

const Item = memo(function ResultItem({title,introduce,href,toDetail}) {
  const pressHandler = () => {
    toDetail(href,title)
  }
  return (
    <>
      <Text style={styles.result_title}>{title}</Text>
      <Text style={styles.intro}>{introduce}</Text>
      <TouchableOpacity activeOpacity={.6} onPress={pressHandler}>
        <Text style={styles.tip}>READ MORE ›</Text>
      </TouchableOpacity>
    </>
  );
})

export default function FixSearch({navigation,route:{params:{text}}}) {

  const { result ,loading  } = useFetch(getFixSearchResult,[text]);

  const toDetail = (href,title) => {
    navigation.replace('TVandMovieDetail',{href,title});
  }

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">SEARCH RESULTS FOR "{text}"</Text>
      </View>
      {
        loading ?
        <Loading />
        :
        result.map(({href,title,introduce}) => <Item toDetail={toDetail} key={href} title={title} introduce={introduce} href={href}/>)
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1f1f1f',
    width: '100%',
    height: 200,
    marginBottom: 20
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign:'center',
    lineHeight: 200,
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
  },
  result_title: {
    color: '#333332',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginBottom: 20
  },
  intro: {
    color: '#777777',
    marginHorizontal: 20,
    marginBottom: 20
  },
  tip: {
    color: '#fdd200',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginLeft: 20
  }
});