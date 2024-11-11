import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffinsModule } from './modules/coffins/coffins.module';

@Module({
    imports: [
        // import TypeOrmModule and inject User entity to use in service and controller
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'moda123',
            database: 'postgres',
            autoLoadEntities: true,
            synchronize: true,
        }),
        UsersModule,
        CoffinsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
