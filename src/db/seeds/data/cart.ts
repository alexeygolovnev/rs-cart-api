import { Cart, CartItem } from '../../../cart/models';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export default class CartSeed {  
  async run(connection: Connection) {
    const cartRepository = connection.getRepository(Cart);
    const cartItemRepository = connection.getRepository(CartItem);
    
    const carts = [
      {
        id: '0f4bf308-d9e0-4178-8113-79683ba5ea25',
        userId: '815bfe78-04a9-4997-a5c9-fd4b6534059f',
      }, {
        id: '5fedc922-a31d-44f2-b276-1de6614054da',
        userId: '215bfe78-04a9-4997-a5c9-fd4b6532059f',
      }
    ]

    await cartRepository.save(carts);

    await cartItemRepository.save([{
      cart: carts[0].id,
      id: uuidv4(),
      productId: 'c8a75ba4-0e88-4992-81bf-f8d8ae831d24'
    }, {
      cart: carts[0].id,
      id: uuidv4(),
      productId: '30a08de1-cd90-43ad-859a-d40be57d2c89'
    }])
  }
}
