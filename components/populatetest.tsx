// Parent component

import OrdersProductsCategoriesInfo from './OrdersProductsCategoriesInfo';
const populatetest = () => {
  // Use useQuery instead of useQueries, and pass the custom hook as the query function
  return (
    <>
      <OrdersProductsCategoriesInfo categoriesValue={{ }} />

    </>
  );
};
export default populatetest;