import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { TypeOrmConfigService } from './config/typeorm-config.service';

@Module({
  imports: [
    /** env読み込み
     *   環境変数NODE_ENVの値によって読み込むファイルを切り替える。
     *   default.envは後続で呼ばれる。同じ変数がある場合は先に定義されているものが優先される。
     */
    ConfigModule.forRoot({
      envFilePath: [`.env/${process.env.NODE_ENV}.env`],
      isGlobal: true,
      // ignoreEnvFile: true, // <- 環境変数から取得する場合はコメントアウトを外す．
    }),

    // TypeORMの設定を非同期取得に変更
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),

    TasksModule,

    UsersModule,
  ],
})
export class AppModule {}
