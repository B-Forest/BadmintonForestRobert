import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { SlotService } from './slot.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { AuthGuard } from 'src/auth/auth.guards';
import { CustomRequest } from 'src/request/custom-request';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('slots')
export class SlotController {
  constructor(private readonly slotService: SlotService) { }

  @Post()
  create(@Body() createSlotDto: CreateSlotDto) {
    return this.slotService.create(createSlotDto);
  }

  @Get('fields/:field_name/date/:date')
  async getOrGenerateSlots(
    @Param('field_name') fieldName: string,
    @Param('date') @Param('date') date: string,
  ) {
    const slots = await this.slotService.getOrGenerateSlots(fieldName, date);
    return {
      slots: slots,
      _links: {
        self: { href: `fields/${fieldName}/date/${date}` },
        annuler: { href: `/slots/reservations/slotId`, method: 'DELETE', templated: true },
        reservation: { href: `/slots/reservations/slotId`, method: 'POST', templated: true },
      },
    };
  }


  @Post('reservations/:id')
  @UseGuards(AuthGuard)
  async addUserToSlot(@Param('id') id: number, @Request() req: CustomRequest) {
    const slot = await this.slotService.addUserToSlot(+id, req);
    return {
      ...slot,
      _links: {
        self: { href: `/slots/reservations/${id}` },
        annuler: { href: `/slots/reservations/${id}`, method: 'DELETE', templated: true },
        voirReservationTerrain: { href: `/slots/fields/${id}/date/{date}`, templated: true },
      },
    };
  }

  @Delete('reservations/:id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string, @Request() req: CustomRequest) {
    const slot = await this.slotService.deleteUserToSlot(+id, req);
    return {
      ...slot,
      _links: {
        self: { href: `/slots/reservations/${id}` },
        reservation: { href: `/slots/reservations/${id}`, method: 'POST', templated: true },
      },
    };
  }

  @Get('users/reservations')
  @UseGuards(AuthGuard)
  async getUserSlots(@Param('id') id: string, @Request() req: CustomRequest) {
    const slots = await this.slotService.findAllByUser(req);
    return {
      slots: slots,
      _links: {
        self: { href: '/slots/users/reservations' },
        voirReservation: { href: '/slots/fields/{fieldId}/date/{date}', templated: true },
        annuler: { href: `/slots/reservations/${id}`, method: 'DELETE', templated: true },
      },
    };
  }

  @Get('fields/:date')
  async getSlotsByDate(@Param('date') date: string) {
    const slots = await this.slotService.getSlotsByDate(date);
    return {
      slots: slots,
      _links: {
        self: { href: '/slots/users/reservations' },
        creerReservation: { href: '/slots/reservation/{id}', templated: true },
        annuler: { href: `/slots/reservations/id`, method: 'DELETE', templated: true },
        creaneauTerrain: { href: `/slots/fields/{id}/date/${date}`, method: 'GET', templated: true },
      },
    };
  }
}
