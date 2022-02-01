import {React, useEffect, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Fontisto from 'react-native-vector-icons/Fontisto';
// import AvailaibleDoctors from './BottomTabs/AvailaibleDoctors'
// import Inbox from '../BottomTabs/Inbox'
// import PendingAppointments from './BottomTabs/PendingAppointments'
// import AllDoctors from './BottomTabs/AllDoctors';

import AvailaibleDoctors from '../BottomTabs/AvailaibleDoctors';
import Inbox from '../BottomTabs/Inbox';
import PendingAppointments from '../BottomTabs/PendingAppointments';
import AllDoctors from '../BottomTabs/AllDoctors';
import PendingDoctorsAppointments from './PendingDoctorsAppointment';
const Tab = createBottomTabNavigator();

export default function DoctorDashboard({navigation, route}) {
  const { test } = route.params;
  return (
    <Tab.Navigator
      initialRouteName="AvailaibleDoctors"
      screenOptions={{
        tabBarActiveTintColor: '#042069',
        headerTitleAlign: "center",
        headerShadowVisible: false
      }}
    >
    



<Tab.Screen
        name="Inbox"
       // component={Inbox}
        children={()=><Inbox navigation={navigation} logged={test}/>}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="email-newsletter" color={color} size={size} />
          ),  tabBarBadge: 23,
        }}
      />

<Tab.Screen
        name="PendingAppointments"
        //component={PendingAppointments}
        children={()=><PendingDoctorsAppointments navigation={navigation} logged={test}/>}
        options={{
          tabBarLabel: 'PendingAppointments',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="card-account-details" color={color} size={size} />
          ),  tabBarBadge: 10,
        }}
      />
    </Tab.Navigator>
  );
}