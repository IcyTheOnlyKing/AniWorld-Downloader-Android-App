import { StyleSheet, TextInput, View, Pressable } from 'react-native';

import { useAppState } from '@/src/state/AppContext';
import { SectionHeader } from '@/components/SectionHeader';
import { SurfaceCard } from '@/components/SurfaceCard';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Text } from '@/components/Themed';
import { connectionLabel } from '@/src/models/Connection';
import { InfoRow } from '@/components/InfoRow';

export default function SettingsScreen() {
  const { connection, updateConnection, baseUrl } = useAppState();
  const scheme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <SectionHeader title="Settings" subtitle="Pi connection" />

      <SurfaceCard style={styles.card}>
        <Text style={styles.sectionTitle}>Connection Mode</Text>
        <View style={styles.modeRow}>
          {(['local', 'tailscale'] as const).map((mode) => {
            const selected = connection.mode === mode;
            return (
              <Pressable
                key={mode}
                onPress={() => updateConnection({ mode })}
                style={[
                  styles.modePill,
                  {
                    backgroundColor: selected ? Colors[scheme].accent : 'transparent',
                    borderColor: Colors[scheme].border,
                  },
                ]}
              >
                <Text style={styles.modeText} lightColor={selected ? '#fff' : Colors[scheme].text} darkColor={selected ? '#fff' : Colors[scheme].text}>
                  {connectionLabel[mode]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.card}>
        <Text style={styles.sectionTitle}>Addresses</Text>
        <Text style={[styles.label, { color: Colors[scheme].muted }]}>Local Network IP</Text>
        <TextInput
          style={[styles.input, { borderColor: Colors[scheme].border, color: Colors[scheme].text }]}
          value={connection.localAddress}
          onChangeText={(text) => updateConnection({ localAddress: text })}
          placeholder="192.168.1.22"
          placeholderTextColor={Colors[scheme].muted}
          autoCapitalize="none"
        />
        <Text style={[styles.label, { color: Colors[scheme].muted }]}>Tailscale IP</Text>
        <TextInput
          style={[styles.input, { borderColor: Colors[scheme].border, color: Colors[scheme].text }]}
          value={connection.tailscaleAddress}
          onChangeText={(text) => updateConnection({ tailscaleAddress: text })}
          placeholder="100.64.0.1"
          placeholderTextColor={Colors[scheme].muted}
          autoCapitalize="none"
        />
        <Text style={[styles.label, { color: Colors[scheme].muted }]}>Port</Text>
        <TextInput
          style={[styles.input, { borderColor: Colors[scheme].border, color: Colors[scheme].text }]}
          value={connection.port}
          onChangeText={(text) => updateConnection({ port: text })}
          placeholder="8080"
          placeholderTextColor={Colors[scheme].muted}
          keyboardType="number-pad"
        />
      </SurfaceCard>

      <SurfaceCard style={styles.card}>
        <Text style={styles.sectionTitle}>Active Endpoint</Text>
        <InfoRow label="Base URL" value={baseUrl} />
        <Text style={[styles.helper, { color: Colors[scheme].muted }]}>
          Point this to your Raspberry Pi API or keep the mock API while prototyping.
        </Text>
      </SurfaceCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  card: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modePill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
  },
  modeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
  input: {
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 14,
  },
  helper: {
    marginTop: 10,
    fontSize: 12,
  },
});
