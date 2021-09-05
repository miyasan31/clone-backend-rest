import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @Column()
  userName: string;

  @Column()
  profileBody: string;

  @Column()
  iconId: string;
}
