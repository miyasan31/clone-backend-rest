import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // primarykey

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;
}
