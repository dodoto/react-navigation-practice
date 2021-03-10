import React, { memo, useEffect, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';

export default memo(function NovelPage({pickers,page,pageChange}) {

  const handler = (page) => pageChange(page);

  return (
    <Picker
      onValueChange={handler}
      selectedValue={page}
      mode="dropdown"
    >
      {
        pickers.current.map(item => (
          <Picker.Item label={item.label} value={item.value} key={item.value}/>
        ))
      }
    </Picker>
  );
})