import { LayoutAnimation, Platform, UIManager } from 'react-native';

export const enableLayoutAnimations = () => {
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
};

export const runLayoutAnimation = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};
