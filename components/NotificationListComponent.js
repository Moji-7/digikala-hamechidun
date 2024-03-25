import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, Card, Icon } from '@rneui/themed';

const NotificationListComponent = () => {
  const { theme } = useTheme();
  const notifications = useSelector(state => state.notifications);
  const notificationCount = notifications.length;

  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title>
        <Icon name="notifications" size={24} color={theme.colors.primary} />
        {` Notifications (${notificationCount})`}
      </Card.Title>
      <Card.Divider />
      {notifications.map((notification, index) => (
        <TouchableOpacity key={index} style={[styles.notificationItem, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
          <Text style={styles.textStyle}>{notification}</Text>
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  evenRow: {
    backgroundColor: '#f7f7f7', // Light grey for even rows
  },
  oddRow: {
    backgroundColor: '#ffffff', // White for odd rows
  },
  textStyle: {
    textAlign: 'center',
  },
});

export default NotificationListComponent;
