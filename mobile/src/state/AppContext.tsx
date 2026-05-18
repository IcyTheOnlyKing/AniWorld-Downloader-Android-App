import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { MockAniWorldApi } from '@/src/api/MockAniWorldApi';
import { HttpAniWorldApi } from '@/src/api/HttpAniWorldApi';
import { AniWorldRepository } from '@/src/repositories/AniWorldRepository';
import {
  ConnectionSettings,
  defaultConnectionSettings,
} from '@/src/models/Connection';
import { enableLayoutAnimations } from '@/src/utils/layoutAnimation';

interface AppState {
  connection: ConnectionSettings;
  baseUrl: string;
  repository: AniWorldRepository;
  updateConnection: (next: Partial<ConnectionSettings>) => void;
}

const AppContext = createContext<AppState | null>(null);

const buildBaseUrl = (connection: ConnectionSettings) => {
  const host = connection.mode === 'local' ? connection.localAddress : connection.tailscaleAddress;
  const sanitizedHost = host.replace(/^https?:\/\//, '');
  const port = connection.port ? `:${connection.port}` : '';
  return `http://${sanitizedHost}${port}`;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [connection, setConnection] = useState<ConnectionSettings>(defaultConnectionSettings);

  const baseUrl = useMemo(() => buildBaseUrl(connection), [connection]);

  const updateConnection = useCallback((next: Partial<ConnectionSettings>) => {
    setConnection((prev) => ({ ...prev, ...next }));
  }, []);

  const mockApi = useMemo(() => new MockAniWorldApi(), []);
  const httpApi = useMemo(() => new HttpAniWorldApi(() => buildBaseUrl(connection)), [connection]);

  const repository = useMemo(() => {
    // Swap MockAniWorldApi with HttpAniWorldApi once the Pi backend is ready.
    const useMock = true;
    const api = useMock ? mockApi : httpApi;
    return new AniWorldRepository(api);
  }, [httpApi, mockApi]);

  useEffect(() => {
    enableLayoutAnimations();
  }, []);

  const value = useMemo(
    () => ({
      connection,
      baseUrl,
      repository,
      updateConnection,
    }),
    [connection, baseUrl, repository, updateConnection]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState(): AppState {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
}
