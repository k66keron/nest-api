import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ length: 30 })
  invoiceNo: string;

  @Column({ length: 30 })
  customerId: string;

  @Column({ length: 10 })
  status: string;

  @Column({ length: 20 })
  zone: string;

  @Column()
  date: Date;

  @Column()
  subTotal: number;

  @Column()
  shipping: number;

  @Column()
  total: number;
}