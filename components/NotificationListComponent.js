import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, Card, Icon } from '@rneui/themed';

const NotificationListComponent = () => {
  const { theme } = useTheme();
  // Assuming 'notifications' is an array of objects like the JSON data you provided
  const notifications = useSelector(state => state.notifications);
  const notificationCount = notifications.length;

  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title>
        <Icon name="notifications" size={24} color={theme.colors.primary} />
        {` Notifications (${notificationCount})`}
      </Card.Title>
      <Card.Divider />
      {notifications[0].map((notification, index) => (
        <TouchableOpacity key={index} style={[styles.notificationItem, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
          <Text style={styles.textStyle}>product: {notification.product_id}</Text> 
          <Text style={styles.textStyle}>Likes: {notification.likes_count}</Text>
          <Text style={styles.textStyle}>Details: </Text>

          {/* <Text style={styles.textStyle}>Max Likes: {notification.data.max_likes}</Text>
          <Text style={styles.textStyle}>Average Rate: {notification.data.rate_avg}</Text> */}
        </TouchableOpacity>
      ))}
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
