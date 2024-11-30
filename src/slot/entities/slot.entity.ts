import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('solt')
export class Slot{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  slot_date: string;

  @Column({ type: 'boolean', nullable: false })
  is_avaible: boolean;

  
}
