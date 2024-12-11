import { SlotEntity } from "../../slot/entities/slot.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('field')
export class FieldEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 1, nullable: false })
  field_name: string;

  @Column({ type: 'date', nullable: false })
  next_avaible_day: Date;

  @OneToMany(() => SlotEntity, (slot) => slot.field, { nullable: true })
  slots?: SlotEntity[];
}
