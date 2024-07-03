import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  Modal,
} from "react-native";
import { Formik } from "formik";
import { ADD_EXPENSE, UPDATE_EXPENSE } from "./../constants";
import { useContext, useEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
//import RNPickerSelect from "react-native-picker-select";
import { useMutation } from "@apollo/client";
import { SpentContext, MovementsContext } from "../context";
import { showToast } from "../notifications";

interface Expense {
  id?: string;
  description: string;
  amount: number;
  paymentDate?: Date;
}

interface FuncionProp {
  (): void; // La función no tiene parámetros y no devuelve nada (void)
}

interface ExpenseModal {
  closeModal: FuncionProp;
  visible: any;
  dataExpense?: Expense;
}

const ExpenseModal: React.FC<ExpenseModal> = ({
  visible,
  closeModal,
  dataExpense,
}) => {
  const [refetchTotalSpent, setRefetchTotalSpent] = useContext(SpentContext);
  const [refetchMovements, setRefetchMovements] = useContext(MovementsContext);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  //const [componentMounted, setComponentMounted] = useState(false);

  const [executeMutation, { loading, error, data }] = useMutation(ADD_EXPENSE);
  const [
    executeUpdateMutation,
    { loading: loadingUpdate, error: errorUpdate, data: dataUpdate },
  ] = useMutation(UPDATE_EXPENSE);

  useEffect(() => {
    closeModal();

    if (data || dataUpdate) {
      setRefetchMovements(true);
      setRefetchTotalSpent(true);
      // alert(JSON.stringify(data, null, 2));
      showToast("success", "very nice!", "good job");
    } else if (error) {
      showToast("error", "something was bad!", error.message);
    }
  }, [data, dataUpdate]);

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

  const handleSubmit = async (values: Expense) => {
    values.amount = Number(values.amount);
    values.paymentDate = date;

    try {
      if (dataExpense) {
        await executeUpdateMutation({
          variables: {
            updateExpenseDto: { ...values },
          },
        });
      } else {
        await executeMutation({
          variables: {
            createExpenseDto: values,
          },
        });
      }
    } catch (error) {
      showToast("error", "something was bad", error);
    }
    closeModal();
  };

  const initialValues = {
    id: dataExpense?.id,
    description: dataExpense?.description || "",
    amount: dataExpense?.amount || 0,
    paymentDate: new Date(),
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
            initialValues={initialValues}
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

export default ExpenseModal;

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
