import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ae7539036ea34e17ad3ab95bad88856c',
  appName: 'green-creation-hub-83',
  webDir: 'dist',
  server: {
    url: "https://ae753903-6ea3-4e17-ad3a-b95bad88856c.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;