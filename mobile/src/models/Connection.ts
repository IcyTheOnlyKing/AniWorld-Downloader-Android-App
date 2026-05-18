export type ConnectionMode = 'local' | 'tailscale';

export interface ConnectionSettings {
  localAddress: string;
  tailscaleAddress: string;
  port: string;
  mode: ConnectionMode;
}

export const defaultConnectionSettings: ConnectionSettings = {
  localAddress: '192.168.1.22',
  tailscaleAddress: '100.64.0.1',
  port: '8080',
  mode: 'local',
};

export const connectionLabel: Record<ConnectionMode, string> = {
  local: 'Local Network',
  tailscale: 'Tailscale',
};
