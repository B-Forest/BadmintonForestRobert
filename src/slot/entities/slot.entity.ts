import { Field } from "../../field/entities/field.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('solt')
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  slot_date: Date;

  @Column({ type: 'time', nullable: false })
  slot_hour: string;

  @ManyToOne(() => Field, (field) => field.slots, { nullable: false })
  @JoinColumn({ name: 'field_id' }) // Optionnel : personnalise le nom de la colonne dans la table
  field: Field;

  // Relation: un slot appartient à un seul utilisateur
  @ManyToOne(() => User, (user) => user.slots, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
