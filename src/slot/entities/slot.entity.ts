import { UserEntity } from "../../users/entities/user.entity";
import { FieldEntity } from "../../field/entities/field.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
@Entity('slot')
export class SlotEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => GraphQLISODateTime)
  @Column({ type: 'date', nullable: false })
  slot_date: Date;

  @Field()
  @Column({ type: 'time', nullable: false })
  slot_hour: string;

  @ManyToOne(() => FieldEntity, (field) => field.slots, { nullable: false })
  @JoinColumn({ name: 'field_id' })
  field: FieldEntity;

  @ManyToOne(() => UserEntity, (user) => user.slots, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity | null;

  @Field(() => Boolean)
  isAvailable: boolean;
}
