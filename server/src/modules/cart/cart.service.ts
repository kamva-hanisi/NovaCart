import { CartRepository } from "./cart.repository.js";
import { ProductRepository } from "../product/product.repository.js";
import { AppError } from "../../common/errors/AppError.js";

export class CartService {
  private cartRepository = new CartRepository();

  private productRepository = new ProductRepository();

  async get(userId: number) {
    const cart = await this.cartRepository.findCartByUser(userId);

    if (!cart) {
      return {
        items: [],
        total: 0,
      };
    }

    const items = await this.cartRepository.findCartItems(userId);

    const total = items.reduce(
      (sum: number, item: { subtotal: number | string }) => sum + Number(item.subtotal),
      0
    );

    return {
      id: cart.id,
      items,
      total,
    };
  }

  async add(userId: number, productId: number, quantity: number) {
    let cart = await this.cartRepository.findCartByUser(userId);

    if (!cart) {
      const cartId = await this.cartRepository.createCart(userId);

      cart = { id: cartId };
    }

    const product = await this.productRepository.findPrice(productId);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const existing = await this.cartRepository.findItem(cart.id, productId);

    if (existing) {
      await this.cartRepository.updateQuantity(existing.id, existing.quantity + quantity);

      return;
    }

    await this.cartRepository.addItem(cart.id, productId, quantity, product.price);
  }

  private async findUserCartItem(userId: number, id: number) {
    const itemById = await this.cartRepository.findItemById(userId, id);

    if (itemById) {
      return itemById;
    }

    return this.cartRepository.findItemByProductId(userId, id);
  }

  async increase(userId: number, id: number) {
    const item = await this.findUserCartItem(userId, id);

    if (!item) {
      throw new AppError("Cart item not found", 404);
    }

    const updated = await this.cartRepository.increase(userId, item.id);

    if (!updated) {
      throw new AppError("Cart item not found", 404);
    }
  }

  async decrease(userId: number, id: number) {
    const item = await this.findUserCartItem(userId, id);

    if (!item) {
      throw new AppError("Cart item not found", 404);
    }

    if (item.quantity <= 1) {
      await this.cartRepository.remove(userId, item.id);
      return;
    }

    await this.cartRepository.decrease(userId, item.id);
  }

  async remove(userId: number, id: number) {
    const item = await this.findUserCartItem(userId, id);

    if (!item) {
      throw new AppError("Cart item not found", 404);
    }

    const removed = await this.cartRepository.remove(userId, item.id);

    if (!removed) {
      throw new AppError("Cart item not found", 404);
    }
  }
}
