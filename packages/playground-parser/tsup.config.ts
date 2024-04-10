import path from 'path';
import { tsupConfig } from '../../scripts/tsup.base';

export default tsupConfig({
  outDir: path.resolve(__dirname, '../../dist/shared'),
  entry: ['./src/index.ts'],
});
