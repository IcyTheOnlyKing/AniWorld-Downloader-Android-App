import { StyleSheet } from 'react-native';

import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <Text style={styles.title} lightColor={Colors[scheme].text} darkColor={Colors[scheme].text}>
      {title}
      {subtitle ? (
        <Text style={[styles.subtitle, { color: Colors[scheme].muted }]}>{`  ${subtitle}`}</Text>
      ) : null}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
});
