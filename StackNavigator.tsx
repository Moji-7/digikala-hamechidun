
import { createStackNavigator } from '@react-navigation/stack';
import Comments from './components/Comments';
import ProductPrice from './components/product/ProductPrice';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Products" component={ProductPrice} />
    </Stack.Navigator>
  );
}

export default  StackNavigator;
