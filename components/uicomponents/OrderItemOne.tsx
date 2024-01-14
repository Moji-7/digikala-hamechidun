import React from 'react';
import { View, Text, Image, Linking ,StyleSheet} from 'react-native';
import { useTheme, Button, Badge } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import { OrderItemDto } from '../entity/OrderItemDto';


interface OrderItemProps {
    orderItem: OrderItemDto;
  }
//const OrderItemOne = (props: OrderItemProps) => {
 const OrderItemOne: React.FC<OrderItemProps> = ({ orderItem }) => {
    const { theme } = useTheme();
    //const { data, isLoading, isError, error } = useQuery(['orderItem', orderItem.product_id], () => fetchOrderItem(orderItem.product_id));
    return (
        <View style={{ padding: theme.spacing.m, backgroundColor: theme.colors.background }} key={orderItem.product_id}>
            <Text style={{ color: theme.colors.text }}>{orderItem.product_title_fa}</Text>
            <Text style={{ color: theme.colors.text }}>{orderItem.title_en}</Text>
            <Text style={{  color: theme.colors.text }}>{orderItem.brand} | {orderItem.category} | {orderItem.item_category2} | {orderItem.item_category3}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{  color: theme.colors.text }}>RRP Price: {orderItem.rrp_price}</Text>
                <Text style={{  color: theme.colors.text, textDecorationLine: 'line-through' }}>Selling Price: {orderItem.selling_price}</Text>
                <Text style={{ color: theme.colors.text }}>Discount: {orderItem.discount_percent}%</Text>
                <Text style={{ color: theme.colors.text }}>count: {orderItem.order_item_quantity}</Text>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {orderItem.is_incredible && <Badge text="Incredible" color={theme.colors.primary} />}
                {orderItem.is_promotion && <Badge text="Promotion" color={theme.colors.secondary} />}
                {orderItem.bnpl_active && <Badge text="BNPL" color={theme.colors.tertiary} />}
            </View>


            <Button title={orderItem.seller_title} onPress={() => Linking.openURL(orderItem.seller_url)} />
            {/* {isLoading && <Text style={{ fontSize: theme.textVariants.body, color: theme.colors.text }}>Loading...</Text>}
      {isError && <Text style={{ fontSize: theme.textVariants.body, color: theme.colors.error }}>{error.message}</Text>}
      {data && <Text style={{ fontSize: theme.textVariants.body, color: theme.colors.success }}>Data fetched successfully</Text>} */}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    error: {
        fontSize: 20,
        fontWeight: "bold",
    },
    dataContainer: {
        margin: 10,
    },
    dataTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 5,
    },
    dataSubtitle: {
        fontSize: 16,
        marginVertical: 5,
    },
});
export default OrderItemOne;
