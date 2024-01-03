import { defineConfig } from 'tsup';
import type { Options } from 'tsup';

export const tsupConfig = (config: Options) =>
  defineConfig({
    dts: true,
    format: ['cjs', 'esm'],
    ...config,
  });
