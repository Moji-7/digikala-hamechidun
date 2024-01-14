export interface OrderItemDto {
    order_item_id: number;
    order_item_quantity: number;
    product_title_fa: string;
    product_id: number;
    title_en: string;
    brand: string;
    category: string;
    item_category2: string;
    item_category3: string;
    rrp_price: string; // Assuming this is a string representing a price
    selling_price: string; // Assuming this is a string representing a price
    discount_percent: string; // Assuming this is a string representing a percentage
    is_incredible: number;
    is_promotion: number;
    bnpl_active: number;
    seller_id: number;
    seller_title: string;
    seller_code: string;
    seller_url: string;
}
