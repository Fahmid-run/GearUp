import { Category } from '../../enums';
import { GearAvailability } from '../../enums';
import { GearItemsWhereInput } from '../../models';

export interface Iquery extends GearItemsWhereInput {
  searchTerm?: string;
  category?: Category;
  rentalPricePerDay?: number;
  brand?: string;
  limit?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;

  availability?: GearAvailability;
}
