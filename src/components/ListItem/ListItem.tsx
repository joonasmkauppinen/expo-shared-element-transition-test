import { Pressable, useWindowDimensions, StyleSheet, View } from 'react-native';
import { Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

interface ListItemProps {
  source: string;
  onPress: () => void;
  imageId: string;
}

export const ListItem = ({ onPress, source, imageId }: ListItemProps) => {
  const [opacity, setOpacity] = useState(1);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setOpacity(1);
    }
  }, [isFocused]);
  const { width } = useWindowDimensions();
  const itemWidth = (width - 30) / 2;
  const itemHeight = itemWidth * (16 / 9);

  return (
    <Pressable
      style={[styles.pressable, { height: itemHeight, width: itemWidth }]}
      onPress={() => {
        onPress();
        setTimeout(() => {
          setOpacity(0);
        }, 100);
      }}
    >
      <SharedElement id={imageId} style={{ width: itemWidth, height: itemHeight }}>
        <Image
          style={{ flex: 1, width: itemWidth, height: itemHeight, borderRadius: 6, opacity }}
          resizeMode="cover"
          source={{
            uri: source,
          }}
        />
      </SharedElement>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    margin: 5,
  },
});
