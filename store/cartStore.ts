import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // Food ID
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discount: number; // Percentage (e.g. 10 for 10%)
  couponCode: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTax: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      discount: 0,
      couponCode: null,
      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === newItem.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
              ),
            };
          }
          return { items: [...state.items, newItem] };
        });
      },
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)
      })),
      clearCart: () => set({ items: [], discount: 0, couponCode: null }),
      applyCoupon: (code, discount) => set({ couponCode: code, discount }),
      removeCoupon: () => set({ couponCode: null, discount: 0 }),
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getDiscountAmount: () => {
        return (get().getSubtotal() * get().discount) / 100;
      },
      getTax: () => {
        // 8% tax on discounted subtotal
        const taxable = get().getSubtotal() - get().getDiscountAmount();
        return Math.max(0, taxable * 0.08);
      },
      getDeliveryFee: () => {
        const subtotal = get().getSubtotal() - get().getDiscountAmount();
        if (subtotal <= 0) return 0;
        return subtotal > 100 ? 0 : 12.0; // Free delivery over $100
      },
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discountAmount = get().getDiscountAmount();
        return Math.max(0, subtotal - discountAmount + get().getTax() + get().getDeliveryFee());
      }
    }),
    {
      name: 'lumiere-cart-storage',
    }
  )
);
