import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false, default: 'adrien' })
  pseudo: string;

  @Column({ type: 'varchar', length: 60, nullable: false, default: 'password' })
  password: string;
}