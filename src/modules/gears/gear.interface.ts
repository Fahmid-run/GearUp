import { GearAvailability } from '../../enums';
import { GearItemsWhereInput } from '../../models';

export interface Iquery extends GearItemsWhereInput {
  searchTerm: string;
  category: string;
  rentalPricePerDay: number;
  brand: string;
  limit: string;
  page: string;
  sortBy: string;
  sortOrder: string;

  availability: GearAvailability;
}
