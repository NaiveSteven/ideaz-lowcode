import path from 'path';
import { tsupConfig } from '../../scripts/tsup.base';

export default tsupConfig({
  outDir: path.resolve(__dirname, '../../dist/playground-event'),
  entry: ['./src/index.ts'],
});
