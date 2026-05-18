const tintColorLight = '#5b8cff';
const tintColorDark = '#8eb4ff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    surface: '#f4f6fb',
    surfaceAlt: '#eef2ff',
    border: '#e2e6f0',
    muted: '#667085',
    success: '#039855',
    warning: '#f79009',
    danger: '#d92d20',
    accent: '#7c4dff',
    overlay: 'rgba(16, 24, 40, 0.08)',
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    surface: '#11141f',
    surfaceAlt: '#1c2130',
    border: '#2a3042',
    muted: '#98a2b3',
    success: '#32d583',
    warning: '#fdb022',
    danger: '#f97066',
    accent: '#a48bff',
    overlay: 'rgba(255, 255, 255, 0.08)',
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
