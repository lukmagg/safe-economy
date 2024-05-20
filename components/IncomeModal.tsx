import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  Modal,
  Button,
} from "react-native";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import Toast from "react-native-toast-message";

const showToast = (type: string, text1: string, text2: any) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};

const ADD_INCOME = gql`
  mutation CreateIncome($createIncomeDto: CreateIncomeDto!) {
    createIncome(createIncomeDto: $createIncomeDto) {
      id
      description
      amount
    }
  }
`;

interface Income {
  description: string;
  amount: number;
  paymentDate: Date | null;
}

interface FuncionProp {
  (): void; // La función no tiene parámetros y no devuelve nada (void)
}

interface IncomeModal {
  closeModal: FuncionProp;
  visible: any;
}

const IncomeModal: React.FC<IncomeModal> = ({ visible, closeModal }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  //const [componentMounted, setComponentMounted] = useState(false);

  const [executeMutation, { loading, error, data }] = useMutation(ADD_INCOME);

  //if (error) console.log(`Submission error! ${error.message}`);
  // if (data) console.log(data);

  useEffect(() => {
    closeModal();

    if (data) {
      showToast("success", "very nice", "good job");
    } else if (error) {
      showToast("error", "useEffect", error.message);
    }
  }, [data]);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setDate(selectedDate || new Date());
    setShowDatePicker(false);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = async (values: Income) => {
    values.amount = Number(values.amount);
    values.paymentDate = date;

    try {
      await executeMutation({
        variables: {
          createIncomeDto: values,
        },
      });
    } catch (error) {
      closeModal();
      showToast("error", "handleSubmit", error);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <Formik
            initialValues={{
              description: "",
              amount: 0,
              paymentDate: new Date(),
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
              handleBlur,
            }) => (
              <View style={styles.centeredView}>
                <TextInput
                  value={values.description}
                  style={styles.inputStyle}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  placeholder="Description"
                />
                <Text>{touched.description ? "touched" : "not touched"}</Text>
                <Text>{errors.description}</Text>
                {touched.description && errors.description && (
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                    {errors.description}
                  </Text>
                )}
                <TextInput
                  keyboardType="numeric"
                  value={values.amount.toString()}
                  style={styles.inputStyle}
                  onChangeText={handleChange("amount")}
                  onBlur={handleBlur("amount")}
                  placeholder="Amount"
                />
                {touched.amount && errors.amount && (
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                    {errors.amount}
                  </Text>
                )}

                <Pressable
                  style={styles.inputStyle}
                  onPress={showDatePickerModal}
                >
                  <Text>Seleccionar fecha</Text>
                </Pressable>
                <Text>{date.toLocaleDateString()}</Text>

                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                  />
                )}

                <View style={styles.containerPressable}>
                  <Pressable
                    onPress={() => handleSubmit()}
                    style={styles.button}
                  >
                    <Text style={styles.text}>Submit</Text>
                  </Pressable>
                  <Pressable style={styles.button} onPress={closeModal}>
                    <Text style={styles.text}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
};

export default IncomeModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    width: "100%",
    padding: 35,
    backgroundColor: "white",
  },
  containerPressable: {
    flex: 1,
    justifyContent: "flex-end",
  },
  containerForm: {
    flex: 1,
  },

  button: {
    height: 50,
    alignItems: "center", // text center inside buttom horizontal
    justifyContent: "center", // text center inside buttom vertical
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "gray",
    width: 280,
    marginTop: 20,
  },
  inputStyle: {
    width: 280,
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#4e4e4e",
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
