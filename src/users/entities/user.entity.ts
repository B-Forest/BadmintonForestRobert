import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_')
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  pseudo: string;

  @Column({ type: 'varchar', length: 43, nullable: false })
  password: string;
}