import { ApiProperty } from "@nestjs/swagger";

export class CreateSlotDto {
    @ApiProperty()
    slot_date: Date;

    @ApiProperty()
    slot_hour: string;

    @ApiProperty()
    field_id: number;
}
