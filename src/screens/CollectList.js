import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CollectItem from '../components/CollectItem';
import CollectModel from '../models/CollectModel';

export default function CollectList({ navigation, route }) {

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    CollectModel.getItems().then(items => setItems(items))

    const unsubscribe = navigation.addListener('focus', () => {
      CollectModel.getItems().then(items => setItems(items))
    });

    return () => {
      unsubscribe;
    };

  }, [route]);

  return (
    <View style={styles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          data={items}
          keyExtractor={(item) => String(item.id)}

          renderItem={({ item }) => <CollectItem item={item} navigation={navigation} />
          }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    position: 'relative',
  },
  scrollContainer: {
    flex: 1,
    width: '100%'
  },
});