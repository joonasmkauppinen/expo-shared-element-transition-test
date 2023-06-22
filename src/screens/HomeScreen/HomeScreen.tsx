import { View, Text, StyleSheet, ScrollView, FlatList, ListRenderItem, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SampleData, data } from '../../constants/sampleData';
import { ListItem } from '../../components/ListItem/ListItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigator';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: ScreenProps) => {
  const { top, bottom } = useSafeAreaInsets();

  const handleItemPress = ({ url, id }: { url: string; id: string }) => {
    navigation.navigate('Details', { url, id });
  };

  const renderItem: ListRenderItem<SampleData> = ({ item }) => {
    return (
      <ListItem
        onPress={() => handleItemPress({ url: item.imageUrl, id: item.id })}
        source={item.imageUrl}
        imageId={item.id}
      />
    );
  };

  // return (
  //   <ScrollView>
  //     <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
  //       {data.map((item) => (
  //         <ListItem
  //           key={item.id}
  //           onPress={() => handleItemPress({ url: item.imageUrl, id: item.id })}
  //           source={item.imageUrl}
  //           imageId={item.id}
  //         />
  //       ))}
  //     </View>
  //   </ScrollView>
  // );

  return (
    <FlatList
      style={[styles.container]}
      contentInset={{ top, bottom, left: 0, right: 0 }}
      data={data}
      keyExtractor={({ id }) => id}
      numColumns={2}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 5,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
