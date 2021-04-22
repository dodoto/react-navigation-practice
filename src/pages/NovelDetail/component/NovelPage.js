import React, { memo } from 'react';
import { Picker } from '@react-native-picker/picker';

export default memo(function NovelPage({pickers,page,pageChange}) {

  const handler = (page) => pageChange(page);

  return (
      <Picker
        onValueChange={handler}
        selectedValue={page}
        mode="dropdown"
        style={{flex:1,paddingLeft:10}}
      >
        {
          pickers.current.map(item => (
            <Picker.Item label={item.label} value={item.value} key={item.value}/>
          ))
        }
      </Picker>
  );
})