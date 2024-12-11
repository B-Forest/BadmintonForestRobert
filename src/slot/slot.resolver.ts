import { Resolver, Query, Args } from '@nestjs/graphql';
import { SlotService } from '../slot/slot.service';
import { SlotEntity } from './entities/slot.entity';

@Resolver(() => SlotEntity)
export class SlotsResolver {
    constructor(private readonly slotsService: SlotService) { }

    @Query(() => [SlotEntity], { name: 'availableSlots' })
    async getAvailableSlots(
        @Args('date') date: string,
        @Args('terrain') terrain: string,
    ): Promise<SlotEntity[]> {
        return this.slotsService.getOrGenerateSlots(terrain, date);
    }
}