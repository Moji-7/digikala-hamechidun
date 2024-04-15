import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useTheme, Card, Icon } from '@rneui/themed';
import NotificationNavigateButton from './NotificationNavigateButton';


const NotificationListComponent = () => {
  const { theme } = useTheme();



  // Assuming 'notifications' is an array of objects like the JSON data you provided
  const notifications = useSelector(state => state.notifications);
  const notificationCount = notifications.length;


  function setParamsforScreen(screenName, productId) {
    switch (screenName) {
      case 'Products':
        return { searchParamsProductPrice: { product_id: productId } };
      case 'Comments':
        return{ productId: productId };
      default:
        return { productId: productId };
    }
  }


  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title>
        <Icon name="notifications" size={24} color={theme.colors.primary} />
        {` Notifications (${notificationCount})`}
      </Card.Title>
      <Card.Divider />


      {notifications.map((notification, index) => {
        return (
          <TouchableOpacity key={index} style={[styles.notificationItem, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <View key={index}>
              <NotificationNavigateButton title={notification.screen} screen={notification.screen} 
              params={setParamsforScreen(notification.screen,notification.product_id)}  />
            </View>
          </TouchableOpacity>
        );
      })}



      {/* ))} */}
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    padding: 10,
  },
  notificationItem: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Distribute space evenly between items
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  evenRow: {
    backgroundColor: '#f7f7f7', // Light grey for even rows
  },
  oddRow: {
    backgroundColor: '#ffffff', // White for odd rows
  },
  textStyle: {
    flex: 1, // Each text item will take equal space
    textAlign: 'center',
  },
});

export default NotificationListComponent;
