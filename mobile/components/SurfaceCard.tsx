import { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export function SurfaceCard({ children, style, ...rest }: PropsWithChildren<ViewProps>) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <View
      style={[styles.card, { backgroundColor: Colors[scheme].surface, borderColor: Colors[scheme].border }, style]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
});
