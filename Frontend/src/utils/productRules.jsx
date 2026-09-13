export const FOOD_DELIVERY_CATEGORY = "Food Delivery";

export const requiresInventory = (category) => {
    return category !== FOOD_DELIVERY_CATEGORY;
}