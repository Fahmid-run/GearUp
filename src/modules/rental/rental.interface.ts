export interface IRentalItem {
  gearItemId: string;

  quantity: number;
}
export interface IRentalPayload {
  startDate: string;

  endDate: string;

  items: IRentalItem[];
}