export class CreateSubscriptionDto {
  name: string;
  price: number;
  points: number;
  configId: number;

  instructor_id: boolean;
  instructor_id_random: boolean;
  instructor_name: boolean;
  center_name: boolean;
}
