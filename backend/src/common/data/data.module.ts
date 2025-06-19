import { Global, Module } from '@nestjs/common';
import { DataProvider } from './data.provider';

@Global()
@Module({
  providers: [DataProvider],
  exports: [DataProvider],
})
export class DataModule {}
