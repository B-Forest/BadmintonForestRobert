import { Injectable } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { SlotEntity } from './entities/slot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FieldService } from 'src/field/field.service';
import { UsersService } from 'src/users/users.service';
import { CustomRequest } from 'src/request/custom-request';

@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(SlotEntity)
    protected readonly repository: Repository<SlotEntity>,
    protected readonly fieldService: FieldService,
    protected readonly usersService: UsersService,
  ) { }

  async create(createSlotDto: CreateSlotDto) {
    const slot = new SlotEntity();
    slot.slot_date = createSlotDto.slot_date;
    slot.slot_hour = createSlotDto.slot_hour;

    const field = await this.fieldService.findOne(
      createSlotDto.field_id,
    );

    slot.field = field;

    return await this.repository.save(slot);
  }

  async getOrGenerateSlots(fieldName: string, date: string): Promise<SlotEntity[]> {
    console.log('getOrGenerateSlots', date, typeof date, fieldName);
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    console.log('startOfDay', startOfDay);
    console.log('endOfDay', endOfDay);

    const field = await this.fieldService.getFieldByName(fieldName);
    if (!field) {
      throw new Error(`Terrain ${fieldName} non trouvé`);
    }
    console.log('field', field);

    const slots = await this.repository
      .createQueryBuilder('slot')
      .leftJoinAndSelect('slot.field', 'field')
      .leftJoinAndSelect('slot.user', 'user')
      .where('slot.slot_date BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay })
      .andWhere('field.id = :fieldId', { fieldId: field.id })
      .getMany();

    console.log('slots', slots);
    if (slots.length > 0) {
      return slots.map(slot => ({
        ...slot,
        isAvailable: slot.user ? false : true,
      }));;
    }

    const startHour = 10;
    const endHour = 22;
    const slotDuration = 45;

    const newSlots: SlotEntity[] = [];

    let currentTime = new Date(startOfDay);
    currentTime.setHours(startHour, 0, 0, 0);

    while (currentTime.getHours() < endHour) {
      if (currentTime.getHours() === endHour - 1 && currentTime.getMinutes() + slotDuration > 60) {
        break
      }

      const slot_date = new Date(currentTime);

      const slot = this.repository.create({
        slot_date,
        slot_hour: slot_date.toISOString().split('T')[1].slice(0, 5),
        field,
        user: null,
      });

      newSlots.push(await this.repository.save(slot));

      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
    }

    return newSlots.map(slot => ({
      ...slot,
      isAvailable: slot.user ? false : true,
    }));
  }

  async addUserToSlot(slotId: number, req: CustomRequest) {
    const slot = await this.repository.findOne({
      where: { id: slotId },
      relations: ['field'],
    });
    if (!slot) {
      throw new Error(`Créneau avec l'id ${slotId} non trouvé`);
    }

    if (slot.user) {
      throw new Error(`Ce créneau est déjà réservé`);
    }

    if (new Date(slot.field.next_avaible_day).getTime() < new Date().getTime()) {
      try {
        const user = await this.usersService.getUserById(req.user.id);
        slot.user = user;
        return await this.repository.save(slot);
      } catch (e) {
        throw new Error(`Utilisateur avec l'id  ${req.user.id} non trouvé`);
      }
    } else {
      throw new Error(`Ce terrain n'est pas disponible pour le moment`);
    }


  }

  async deleteUserToSlot(slotId: number, req: CustomRequest) {
    const slot = await this.repository.findOne({
      where: { id: slotId },
      relations: ['user'],
    });
    if (!slot) {
      throw new Error(`Créneau avec l'id ${slotId} non trouvé`);
    }

    if (!slot.user) {
      throw new Error(`Créneau avec l'id ${slotId} n'est pas réservé`);
    }

    const user = await this.usersService.getUserById(req.user.id);

    if (slot.user.id !== user.id) {
      throw new Error(`Utilisateur avec l'id ${req.user.id} n'est pas celui qui a réservé ce créneau`);
    }

    slot.user = null;
    return await this.repository.save(slot);
  }

  async findAllByUser(req: CustomRequest) {

    try {
      const user = await this.usersService.getUserById(req.user.id);
      const slots = this.repository.find({
        where: { user: user },
        relations: ['field'],
      });

      if (slots) {
        return slots;
      } else {
        throw new Error(`Aucun créneau trouvé pour l'utilisateur avec l'id ${req.user.id}`);
      }
    } catch (e) {
      throw new Error(`Utilisateur avec l'id ${req.user.id} non trouvé`);
    }
  }

  async getSlotsByDate(date: string) {
    const fields = await this.fieldService.findAll();

    const slots = [];

    for (const field of fields) {
      const fieldSlots = await this.getOrGenerateSlots(field.field_name, date);
      slots.push(fieldSlots);
    }

    return slots;
  }


}
