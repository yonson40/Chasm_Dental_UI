const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const { VitePlugin } = require('@electron-forge/plugin-vite');
// const { resolve } = require('path'); // Remove unused
// const react = require('@vitejs/plugin-react'); // Remove unused
// const { externalizeDepsPlugin } = require('electron-vite'); // Remove unused

module.exports = {
  packagerConfig: {
    asar: true,
    // Add other packager options if needed
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` specifies the entry points for the main process and preload scripts.
        build: [
          {
            entry: 'src/main/index.ts',
            config: 'vite.main.config.ts' // Reference the main config file
          },
          {
            entry: 'src/preload/index.ts',
            config: 'vite.preload.config.ts' // Reference the preload config file
          }
        ],
        // `renderer` specifies the entry points for the renderer processes.
        renderer: [
          {
            name: 'main_window', // Should match the key in renderer config input
            config: 'vite.renderer.config.ts' // Reference the renderer config file
          }
        ]
      }
    },
    // Fuses plugin (optional, but often included)
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
    // Auto-unpack natives plugin (often useful)
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {}
    },
  ],
};
