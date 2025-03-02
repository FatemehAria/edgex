import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';
import svgrPlugin from 'vite-plugin-svgr';

// Create a plugin to provide an empty module for antd's missing theme style
function emptyThemeStylePlugin() {
  return {
    name: 'empty-theme-style',
    resolveId(source: any) {
      if (source === 'antd/es/theme/style/index.js') {
        return source; // signal that we want to handle this id
      }
      return null;
    },
    load(id: any) {
      if (id === 'antd/es/theme/style/index.js') {
        return 'export default {}'; // return an empty module
      }
      return null;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.join(__dirname, 'src'),
      },
      {
        find: /antd\/es\/(.*)\/style\/css\.js$/,
        replacement: 'antd/es/$1/style/index.js',
      },
      // You can leave the direct alias out if the plugin handles it
      // {
      //   find: 'antd/es/theme/style/index.js',
      //   replacement: path.resolve(__dirname, 'src/emptyThemeStyle.js').replace(/\\/g, '/'),
      // },
    ],
  },
  server: {
    port: 8889,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}/api`,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    emptyThemeStylePlugin(), // add the plugin first
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    vitePluginImp({
      libList: [
        {
          libName: 'lodash',
          libDirectory: '',
          camel2DashComponentName: false,
          style: () => false,
        },
      ],
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
});
