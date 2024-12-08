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

  @Get()
  findAll() {
    return this.slotService.findAll();
  }

  @Get('fields/:fieldId/date/:date')
  async getOrGenerateSlots(
    @Param('fieldId') fieldId: string,
    @Param('date') date: string,
  ) {
    return this.slotService.getOrGenerateSlots(+fieldId, new Date(date));
  }

  @Post('reservations/:id')
  @UseGuards(AuthGuard)
  addUserToSlot(@Param('id') id: number, @Request() req: CustomRequest) {
    return this.slotService.addUserToSlot(+id, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.slotService.findOne(+id);
  }

  @Delete('reservations/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Request() req: CustomRequest) {
    return this.slotService.deleteUserToSlot(+id, req);
  }

  @Get('users/reservations')
  @UseGuards(AuthGuard)
  async getUserSlots(@Param('id') id: string, @Request() req: CustomRequest) {
    return this.slotService.findAllByUser(req);
  }

  @Get('fields/:date')
  async getSlotsByDate(@Param('date') date: string) {
    return this.slotService.getSlotsByDate(new Date(date));
  }
}
