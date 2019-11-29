import React, { useState } from 'react';
import {
  View,
  AsyncStorage,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

import items from '../items';

const ItemList = () => {
  const [itemList, setItemList] = useState(items);

  const clicked = (item) => {
    const newList = itemList.map((curr) => {
      if (curr.name === item.name) {
        // eslint-disable-next-line no-param-reassign
        curr.isChecked = !curr.isChecked;
      }

      return curr;
    });

    setItemList(newList);
  };

  return (
    <View>
      {
        itemList.map((item, index) => (
          <CheckBox
            key={index}
            title={item.name}
            checked={item.isChecked}
            onPress={() => { clicked(item); }}
          />
        ))
      }
    </View>
  );
};

export default ItemList;
