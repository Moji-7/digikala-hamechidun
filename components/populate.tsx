// Parent component
import { useQuery } from '@tanstack/react-query';


// Import child components
import OrdersSummary from './OrdersSummary';
import OrdersSellersMost from './OrdersSellersMost';
import OrdersProductsMost from './OrdersProductsMost';
import OrderProductPriceExpensive from './OrderProductPriceExpensive';
const populate = () => {
  // Use useQuery instead of useQueries, and pass the custom hook as the query function


  return (
    <div>
      {/* Render your child component and pass the query states as props */}
      <OrdersSummary />
      {/* <OrdersSellersMost />
      <OrdersProductsMost />
      <OrderProductPriceExpensive /> */}
    </div>
  );
};
export default populate;