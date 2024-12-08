import { Injectable } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { Slot } from './entities/slot.entity';
import { Field } from 'src/field/entities/field.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { FieldService } from 'src/field/field.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(Slot)
    protected readonly repository: Repository<Slot>,
    protected readonly fieldService: FieldService,
    protected readonly usersService: UsersService,
  ) { }

  async create(createSlotDto: CreateSlotDto) {
    const slot = new Slot();
    slot.slot_date = createSlotDto.slot_date;
    slot.slot_hour = createSlotDto.slot_hour;

    const field = await this.fieldService.findOne(
      createSlotDto.field_id,
    );

    slot.field = field;

    return await this.repository.save(slot);
  }

  async getOrGenerateSlots(fieldId: number, date: Date): Promise<Slot[]> {
    // Normaliser la date pour ne travailler que sur la journée
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const slots = await this.repository
      .createQueryBuilder('slot')
      .leftJoinAndSelect('slot.field', 'field')
      .leftJoinAndSelect('slot.user', 'user')
      .where('slot.slot_date BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay })
      .andWhere('field.id = :fieldId', { fieldId })
      .getMany();

    if (slots.length > 0) {
      console.log(`Slots already exist for field ${fieldId} on ${date.toISOString()}`);
      return slots;
    }

    console.log(`No slots found for field ${fieldId} on ${date.toISOString()}, creating...`);

    const startHour = 10;
    const endHour = 22;
    const slotDuration = 45; // en minutes

    const field = await this.fieldService.findOne(fieldId);
    if (!field) {
      throw new Error(`Field with ID ${fieldId} not found`);
    }

    const newSlots: Slot[] = [];

    let currentTime = new Date(startOfDay);
    currentTime.setHours(startHour, 0, 0, 0); // Début à 10h00

    while (currentTime.getHours() < endHour) {
      // Vérifier si l'heure actuelle est bien avant 22h00
      if (currentTime.getHours() === endHour - 1 && currentTime.getMinutes() + slotDuration > 60) {
        break; // Ne pas ajouter de créneau si ça dépasse 22h00
      }

      // Créer l'entité Slot
      const slot_date = new Date(currentTime);

      const slot = this.repository.create({
        slot_date,
        slot_hour: slot_date.toISOString().split('T')[1].slice(0, 5), // Format de l'heure HH:mm
        field,
        user: null, // Pas d'utilisateur assigné pour l'instant
      });

      // Ajouter à la liste des nouveaux créneaux
      newSlots.push(await this.repository.save(slot));

      // Passer au créneau suivant (incrémenter de 45 minutes)
      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
    }

    console.log(`Created ${newSlots.length} slots for field ${fieldId} on ${date.toISOString()}`);
    return newSlots;
  }

  findAll() {
    return `This action returns all slot`;
  }

  async addUserToSlot(slotId: number, userId: number) {
    const slot = await this.repository.findOne({
      where: { id: slotId },
    });
    if (!slot) {
      throw new Error(`Slot with ID ${slotId} not found`);
    }

    const user = await this.userService.findOne(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} slot`;
  }

  update(id: number, updateSlotDto: UpdateSlotDto) {
    return `This action updates a #${id} slot`;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
}
