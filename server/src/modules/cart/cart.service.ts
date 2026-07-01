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
}
