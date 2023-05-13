import { Cart } from "./cart.entity";
import { CartItem } from "./cartItem.entity";

type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};

export {
  Cart,
  CartItem,
  Product
}
