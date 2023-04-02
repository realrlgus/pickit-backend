import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const connectionModule = TypeOrmModule.forRootAsync({
  useFactory: () => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      dropSchema: false,
      synchronize: false,
    };
  },
});

@Module({
  imports: [connectionModule],
  exports: [connectionModule],
})
export class DatabaseModule {
  public static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
    };
  }
}
