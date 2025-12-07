import { initialItems } from '../data/items';

const ITEMS_KEY = 'food_app_items';
const CART_KEY = 'food_app_cart';
const ORDERS_KEY = 'food_app_orders';

export const getItems = () => {
    const stored = localStorage.getItem(ITEMS_KEY);
    if (!stored) {
        localStorage.setItem(ITEMS_KEY, JSON.stringify(initialItems));
        return initialItems;
    }
    return JSON.parse(stored);
};

export const saveItems = (items) => {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
};

export const getCart = () => {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
};
