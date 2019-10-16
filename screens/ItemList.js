import React from 'react';
import {
  Text,
  ListView,
} from 'react-native';

import items from '../items';

const ItemList = () => (
  <ListView dataSource={items}
    renderRow={(rowData) => <Text>{rowData}</Text>}
  />
);

export default ItemList;
