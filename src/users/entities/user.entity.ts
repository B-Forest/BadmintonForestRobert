import { Role } from "../../role/role.enum";
import { SlotEntity } from "../../slot/entities/slot.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  pseudo: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  password: string;

  @Column({ type: 'char', length: 5, nullable: false, default: 'user' })
  role: Role;

  @OneToMany(() => SlotEntity, (slot) => slot.user)
  slots?: SlotEntity[];
}