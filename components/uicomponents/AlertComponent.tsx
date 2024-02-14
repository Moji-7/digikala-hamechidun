import React, { useEffect } from "react";
import {  Button  } from '@rneui/themed';
import Snackbar from "react-native-snackbar";



// Define a custom component that takes message and type as props

  interface Props {
    message: string;
    type:string
}

const AlertComponenti: React.FC<Props> = ({ message,type }) => { 
 

  const showSnackbar = () => {
    // Use a switch statement to handle different types
    switch (type) {
      case "success":
        // Show a snackbar message with a success color
        Snackbar.show({
          text: message,
          textColor: "#00ff00",
          duration: Snackbar.LENGTH_SHORT
        });
        break;
      case "error":
        // Show a snackbar message with an error color
        Snackbar.show({
          text: message,
          textColor: "#ff0000",
          duration: Snackbar.LENGTH_SHORT
        });
        break;
      case "warning":
        // Show a snackbar message with a warning color
        Snackbar.show({
          text: message,
          textColor: "#ffff00",
          duration: Snackbar.LENGTH_SHORT 
        });
        break;
      default:
        // Show a snackbar message with a default color
        Snackbar.show({
          text: message,
          textColor: "#ffffff",
          duration: Snackbar.LENGTH_SHORT 
        });
        break;
    }
  };

  // Return a button that triggers the showSnackbar function on press
  return (
    <>
        <Button onPress={showSnackbar}  title='color' />
    
    </>


  );
};

export default AlertComponenti;
