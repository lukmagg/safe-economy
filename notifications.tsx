import Toast from "react-native-toast-message";

export const showToast = (type: string, text1: string, text2: any) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};
