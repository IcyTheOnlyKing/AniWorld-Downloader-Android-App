import { StyleSheet, View } from 'react-native';

import Colors from '@/constants/Colors';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';

export function TagList({ tags }: { tags: string[] }) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      {tags.map((tag) => (
        <View key={tag} style={[styles.tag, { backgroundColor: Colors[scheme].surfaceAlt }]}> 
          <Text style={[styles.text, { color: Colors[scheme].muted }]}>{tag}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});
