import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export function ProgressBar({ progress }: { progress: number }) {
  const scheme = useColorScheme() ?? 'light';
  const animated = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [animated, progress]);

  const width = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.track, { backgroundColor: Colors[scheme].overlay }]}> 
      <Animated.View
        style={[styles.fill, { width, backgroundColor: Colors[scheme].accent }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});
