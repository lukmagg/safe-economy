import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  Modal,
} from "react-native";
import { Formik } from "formik";
import { PaymentType } from "./../constants";
import { useContext, useEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { Context, MovementsContext } from "../context";
import { showToast } from "../notifications";

const ADD_EXPENSE = gql`
  mutation CreateExpense($createExpenseDto: CreateExpenseDto!) {
    createExpense(createExpenseDto: $createExpenseDto) {
      id
      description
      amount
      paymentType
    }
  }
`;

interface Expense {
  description: string;
  paymentType: PaymentType;
  amount: number;
  paymentDate: Date | null;
}

interface FuncionProp {
  (): void; // La función no tiene parámetros y no devuelve nada (void)
}

interface ExpenseModal {
  closeModal: FuncionProp;
  visible: any;
}

const ExpenseModal: React.FC<ExpenseModal> = ({ visible, closeModal }) => {
  const [refetchTotalSpent, setRefetchTotalSpent] = useContext(Context);
  const [refetchMovements, setRefetchMovements] = useContext(MovementsContext);
  const [date, setDate] = useState(new Date());
  const [paymentType, setPaymentType] = useState(PaymentType.CASH);
  const [showDatePicker, setShowDatePicker] = useState(false);

  //const [componentMounted, setComponentMounted] = useState(false);

  const [executeMutation, { loading, error, data }] = useMutation(ADD_EXPENSE);

  useEffect(() => {
    closeModal();

    if (data) {
      setRefetchMovements(true);
      setRefetchTotalSpent(true);
      // alert(JSON.stringify(data, null, 2));
      showToast("success", "very nice!", "good job");
    } else if (error) {
      showToast("error", "something was bad!", error.message);
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

  const handleSubmit = async (values: Expense) => {
    values.amount = Number(values.amount);
    values.paymentType = paymentType;
    values.paymentDate = date;

    // console.log(values);

    try {
      await executeMutation({
        variables: {
          createExpenseDto: values,
        },
      });
    } catch (error) {
      showToast("error", "something was bad", error);
    }
    closeModal();
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
              paymentType: PaymentType.CASH,
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

                <RNPickerSelect
                  onValueChange={(value) => setPaymentType(value)}
                  items={[
                    { label: "Cash", value: PaymentType.CASH },
                    { label: "Credit card", value: PaymentType.CREDITCARD },
                  ]}
                />

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
