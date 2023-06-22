# Expo shared element transition test

The goal of this little project was to test the shared element transition between two screens in an Expo app. Also to see if it's possible to create a snapchat like transition between two screens.

This project is using [react-navigation-shared-element](https://github.com/IjzerenHein/react-navigation-shared-element).

## Getting started

1. Clone the repo
2. Run `yarn` or `npm install`
3. Run `expo start`

## Demo

The results of this test were not perfect. The shared element transition works fine, but when the screen presentation is set to `transparentModal` the shared element does not animate back properly. With screen presentation set to `modal` or `card` the shared element animates back properly, but those presentation types are not suitable for the snapchat like transition.

You can see the issue in the following video:

https://github.com/joonasmkauppinen/expo-shared-element-transition-test/assets/28673805/cfc4d1f7-f242-4f62-a7f0-c54bdfa9661a
