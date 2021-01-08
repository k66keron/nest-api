import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesModule } from './invoices/invoices.module';
import { Invoice } from './invoices/entity/invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './app.sqlite',
      entities: [Invoice],
      synchronize: process.env.NODE_ENV != 'production',
    }),
    InvoicesModule,
  ],
})
export class AppModule {}