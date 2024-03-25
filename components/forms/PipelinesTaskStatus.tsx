import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library
interface Props {
    status: string;
}

const PipelinesTaskStatus: React.FC<Props> = ({ status }) => {
    let iconName;
    switch (status) {
        case 'Active':
            iconName = 'check-circle'; // Active icon
            break;
        case 'Pending':
            iconName = 'hourglass'; // Pending icon
            break;
        case 'Completed':
            iconName = 'check-circle'; // Completed icon
            break;
        default:
            iconName = 'question-circle'; // Default icon (optional)
    }

    return (
        <View>
            <Icon name={iconName} size={24} color="green" />
            {/* <Text>{status}</Text> */}
        </View>
    );
};

export default PipelinesTaskStatus;
