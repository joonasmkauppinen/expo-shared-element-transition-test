import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigator';

import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';

const EASING_OUT_CUBIC = Easing.bezier(0.22, 0.61, 0.36, 1);

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen = ({ route, navigation }: Props) => {
  const { url, id } = route.params;

  const { top } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const itemWidth = width;
  const itemHeight = itemWidth * (16 / 9);

  const translateY_SV = useSharedValue(0);
  const translateX_SV = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {})
    .onUpdate(({ translationX, translationY }) => {
      translateX_SV.value = translationX;
      translateY_SV.value = translationY;
    })
    .onEnd(() => {
      if (translateY_SV.value < 200) {
        translateX_SV.value = withTiming(0, {
          duration: 200,
          easing: EASING_OUT_CUBIC,
        });
        translateY_SV.value = withTiming(0, {
          duration: 200,
          easing: EASING_OUT_CUBIC,
        });
      } else {
        runOnJS(navigation.goBack)();
      }
    });

  const animatedImageStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateY_SV.value, [0, height], [1, 0.5]);

    return {
      borderRadius: interpolate(translateY_SV.value, [0, 150], [0, 20], Extrapolate.CLAMP),
      transform: [
        { translateY: translateY_SV.value * scale },
        { translateX: translateX_SV.value * scale },
        { scale },
      ],
    };
  });

  const animatedBgStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0, 0, 0, ${interpolate(translateY_SV.value, [0, 300], [1, 0])})`,
  }));

  return (
    <Animated.View style={[styles.container, { paddingTop: top }, animatedBgStyle]}>
      <GestureDetector gesture={panGesture}>
        <SharedElement id={id}>
          <Animated.Image
            source={{ uri: url }}
            resizeMode="cover"
            style={[
              { height: itemHeight, width: itemWidth, overflow: 'hidden' },
              animatedImageStyle,
            ]}
          />
        </SharedElement>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  imageWrapper: {
    height: 200,
  },
});
