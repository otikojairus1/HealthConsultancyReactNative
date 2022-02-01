import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/Register';
import Login from './screens/Login';
import PatientDashboard from './screens/PatientDashboard';
import BookAppointment from './screens/BookAppointment';
import Done from './screens/Components/Success';
import ComposeMessage from './screens/ComposeMessage'
import ViewMessage from './screens/Components/ViewMessage';
import Sent from './screens/Components/Sent';
import AdminDashboard from './screens/AdminDashboard';
import Doctors from './screens/All_Doctors';
import DoctorLogin from './screens/Components/DoctorLogin';
import DoctorDashboard from './screens/Doctors/DoctorDashboard';
import ConfirmAppointment from './screens/ConfirmAppointment';

export default function App() {
  const Stack2 = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack2.Navigator initialRouteName="Login">
          <Stack2.Screen name="Register" component={Register} options={{ headerShown: false, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Login" component={Login} options={{ headerShown: false, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Patient Dashboard" component={PatientDashboard} options={{ headerShown: false, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Book Appointment" component={BookAppointment} options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Success" component={Done} options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack2.Screen name="View Message" component={ViewMessage} options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Reply Message" component={ComposeMessage} options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Sent" component={Sent} options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Administrator Dashboard" component={AdminDashboard} options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack2.Screen name="All Doctors" component={Doctors} options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Doctor Login" component={DoctorLogin} options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Doctor Dashboard" component={DoctorDashboard} options={{ headerShown: false, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Confirm Appointment" component={ConfirmAppointment} options={{ headerShown: true, headerTitleAlign: "center" }} />
          
        </Stack2.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

