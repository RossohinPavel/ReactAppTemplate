import { defineConfig } from 'vite';
import type { PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';


const getPlugins = (mode: string) => {
  const plugins: PluginOption[] = [react()];
  if ( mode === "analyze" ) {
    plugins.push(visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true
    }));
  }
  return plugins;
}

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  return {
    plugins: getPlugins(mode),
    build: {
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: '[name]-[hash].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'modules';
            };
          },
        }
      }
    }
  }
})