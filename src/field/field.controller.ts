import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { FieldService } from './field.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { AuthGuard } from 'src/auth/auth.guards';
import { CustomRequest } from 'src/request/custom-request';

@Controller('fields')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Post()
  create(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldService.create(createFieldDto);
  }

  @Get()
  findAll() {
    return this.fieldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldService.update(+id, updateFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldService.remove(+id);
  }

  @Put(':name/disable')
  @UseGuards(AuthGuard)
  async disableField(@Param('name') name: string, @Request() req : CustomRequest) {
    const field = await this.fieldService.updateField(name, req);
    return {
      slots: field,
      _links: {
          self: { href: `fields/${name}/disable` },
          rendreDisponible: { href: `fields/${name}/avaible` },
      },
    };
    
  }

  @Put(':name/avaible')
  @UseGuards(AuthGuard)
  async avaibleField(@Param('name') name: string, @Request() req : CustomRequest) {
    const field = await this.fieldService.updateField(name, req);
    return {
      slots: field,
      _links: {
          self: { href: `fields/${name}/avaible` },
          rendreIndisponible: { href: `fields/${name}/disable` },
      },
    };
  }
 
}
