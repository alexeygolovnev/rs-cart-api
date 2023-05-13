import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartItem } from '../models';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CartService {
  @InjectRepository(Cart)
  private readonly cartRepository: Repository<Cart>

  @InjectRepository(CartItem)
  private readonly cartItemRepository: Repository<CartItem>

  async findByUserId(userId: string): Promise<Cart> {
    return await this.cartRepository.findOne({ where: { 
      userId
    }})
  }

  createByUserId(userId: string) {
    const id = v4(v4());
    return this.cartRepository.create({ id, userId });
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, item: CartItem) {
    const cart = await this.findOrCreateByUserId(userId);

    // await Promise.all(items.map(async (item) => {
    //   return this.cartRepository.createQueryBuilder().update(CartItem).set({
    //     ...item,
    //   }).where("cart = :cartId", { cartId: id }).andWhere("id = :id", { id: item.id })
    // }));

    await this.cartItemRepository.update({ cart: cart.id, id: item.id }, item);

    return await this.findByUserId(userId);
  };

  async removeByUserId(userId) {
    return await this.cartRepository.delete(userId);
  }

}
