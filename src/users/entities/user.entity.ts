import { Role } from "../../role/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  pseudo: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  password: string;

  @Column({ type: 'char', length: 5, nullable: false, default: 'user' })
  role: Role;
}