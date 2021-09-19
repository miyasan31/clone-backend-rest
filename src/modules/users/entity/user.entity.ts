import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  userId: string; // primarykey

  @Column()
  userName: string;

  @Column()
  profileBody: string;

  @Column()
  iconId: string;

  @CreateDateColumn()
  createdAt: Date;
}
