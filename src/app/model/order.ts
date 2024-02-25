import { Food } from "./food";
import { OrderFood } from "./order-food";

export class Order {
    orderId?: number;
    cookEmail?: String;
    customerEmail?: String;
    deliveryAddress?: String;
    orderStatus?: String;
    items?: Array<Food>
}