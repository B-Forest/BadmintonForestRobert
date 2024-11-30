import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('field')
export class Field{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 1, nullable: false })
  field_name: string;

  @Column({ type: 'timestamptz', nullable: false })
  next_avaible_day: Date;
}
