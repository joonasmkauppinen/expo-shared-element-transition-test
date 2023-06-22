import { View, StyleSheet, useWindowDimensions, StyleProp, ViewStyle } from 'react-native';
import { Image as RNImage } from 'react-native';

interface ImageProps {
  source: string;
  style?: StyleProp<ViewStyle>;
}

export const Image = ({ source, style }: ImageProps) => {
  return (
    <View style={[styles.container, style]}>
      <RNImage style={[styles.image]} source={{ uri: source }} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hotpink',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
});
