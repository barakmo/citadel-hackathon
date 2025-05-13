import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class CommonKeyFields extends BaseEntity{
  @PrimaryGeneratedColumn('increment')
  id: number
}