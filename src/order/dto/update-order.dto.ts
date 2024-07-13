export class UpdateOrderDto {
    client_name: string;
    client_number:string;
    address: string;
    service_type: string;
    materials: Array<string>;
    labor_price: string;
    amount: string;
    user_id: string;
  }