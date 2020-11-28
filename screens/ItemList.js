import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {CheckBox, Text, Divider} from 'react-native-elements';
import items from '../items';

const ItemList = () => {
  const [isCompleted, setCompletion] = useState(items.isCompleted);
  const [itemList, setItemList] = useState(items.list);
  useEffect(() => {
    AsyncStorage.getItem('items', (_err, res) => {
      if (_err) {
        setCompletion(true);
        setItemList([]);
      } else if (res) {
        const savedItems = JSON.parse(res);
        setCompletion(savedItems.isCompleted);
        setItemList(savedItems.list);
      }
    });
  });

  const clicked = (index) => {
    const newList = itemList;
    newList[index].isChecked = !itemList[index].isChecked;
    console.log(`Clicked: ${newList[index].name}`);

    setItemList(newList);

    let numDone = 0;
    itemList.forEach((item) => {
      if (item.isChecked === true) {
        numDone += 1;
      }
    });
    if (numDone === itemList.length) {
      setCompletion(true);
    } else {
      setCompletion(false);
    }

    const currList = {
      isCompleted,
      list: itemList,
    };

    AsyncStorage.setItem('items', JSON.stringify(currList));
  };
  return (
    <ScrollView>
      {itemList.map((item, index) =>
        item.isHeader ? (
          <View key={index}>
            <Divider />
            <Text h4>{item.name}</Text>
            <Divider />
          </View>
        ) : (
          // Checkbox not supported on iOS so this is using the react-native-check-box module
          <CheckBox
            key={index}
            title={item.name}
            checked={item.isChecked}
            onPress={() => {
              clicked(index);
            }}
          />
        ),
      )}
    </ScrollView>
  );
};

export default ItemList;
