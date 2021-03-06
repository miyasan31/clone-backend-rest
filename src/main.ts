import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors対策
  app.enableCors();

  // 環境変数を読み込むことができる
  // https://qiita.com/piggydev/items/e76adcc3a65364f98537
  const configService = new ConfigService();

  const sync = configService.get('DATABASE_SYNC');
  console.log(`TypeORM synchronize is [ ${sync} ]`);

  const port = configService.get('PORT');
  await app.listen(port || 3000);
  console.log(`Server Port is [ ${port || 3000} ]`);
}

bootstrap();
