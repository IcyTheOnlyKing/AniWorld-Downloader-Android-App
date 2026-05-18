import { StyleSheet, TextInput, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export function SearchInput({ value, onChange }: { value: string; onChange: (text: string) => void }) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <View style={[styles.container, { borderColor: Colors[scheme].border }]}> 
      <FontAwesome name="search" size={16} color={Colors[scheme].muted} />
      <TextInput
        style={[styles.input, { color: Colors[scheme].text }]}
        placeholder="Search series or anime"
        placeholderTextColor={Colors[scheme].muted}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
});
