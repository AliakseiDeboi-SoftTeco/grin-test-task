import { readFileSync } from 'fs';
import { join } from 'path';
import { Provider } from '@nestjs/common';

export const DATASET = 'DATASET';

export const DataProvider: Provider = {
  provide: DATASET,
  useFactory: () => {
    const raw = readFileSync(
      join(__dirname, '..', '..', '..', 'data', 'dataset.json'),
      'utf8',
    );
    return JSON.parse(raw);
  },
};
