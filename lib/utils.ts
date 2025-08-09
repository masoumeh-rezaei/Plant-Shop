type CartItem = {
    productId: string;
    name: string;
    price: number;
    discountPercent: number;
    quantity: number;
    image?: string;
};

export function priceAfterDiscount(price: number, discount: number) {
    return Math.round(price * (1 - discount / 100) * 100) / 100;
}

export function computeTotals(items: CartItem[]) {
    const subtotal = Math.round(
        items.reduce((s, it) => s + priceAfterDiscount(it.price, it.discountPercent) * it.quantity, 0) * 100
    ) / 100;
    const TAX_RATE = 0.09;
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = Math.round((subtotal + tax + shipping) * 100) / 100;
    return { subtotal, tax, shipping, total };
}
