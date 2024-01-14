// Core
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule, ThrottlerAsyncOptions } from '@nestjs/throttler';

// Controllers
import { AppController } from './app.controller';

// Helpers
import { getEnvPath } from '@/helpers';

// Middlewares
import { LoggerMiddleware } from '@/middlewares';

// Modules
import { ApiModule } from './api/api.module';

// Services
import { AppService } from './app.service';
import { TypeOrmConfigService } from '@/typeorm';
import { ThrottleConfigService } from '@/services';

const envFilePath: string = getEnvPath(`../${__dirname}`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    } as TypeOrmModuleAsyncOptions),
    CacheModule.register({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRootAsync({
      useClass: ThrottleConfigService,
    } as ThrottlerAsyncOptions),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
