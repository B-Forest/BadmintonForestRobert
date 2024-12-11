import { Slot } from "../../slot/entities/slot.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('field')
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 1, nullable: false })
  field_name: string;

  @Column({ type: 'date', nullable: false })
  next_avaible_day: Date;

  @OneToMany(() => Slot, (slot) => slot.field)
  slots: Slot[];
}
