import React, { useState } from 'react'
import { View } from 'react-native'
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input, Alert,
    Link,
    Button, Spinner,
    HStack, TextArea,
    Center,
    NativeBaseProvider,
} from "native-base"
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios'
export default function ConfirmAppointment({ route, navigation }) {
    const { id, patient,doctor,created_at, time, confirm } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const BookAppointmentHandler = ()=>{
        setIsLoading(true);
        axios.get('https://consultancy-api.herokuapp.com/api/approve/appointment/'+id)
        .then((response)=>{
            setIsLoading(false);
            console.log(response.data);
           // navigation.navigate('Approved');

        })
        .catch((err)=>console.log(err));


    }

    if (isLoading){
        return (
        <Center flex={1}>
        <VStack space={2} alignItems="center">
        <Spinner size="lg" accessibilityLabel="Trying to sign you in!" />
        <Heading color="primary.500" fontSize="xl">
          confirming the appointment and notifying the user...
        </Heading>
      </VStack></Center>);
    }else{

    
    return (
        <Center flex={1} mx={4}>
            <Alert w="100%" status="success">
                <VStack space={1} flexShrink={1} w="100%" alignItems="center">
                <MaterialIcons name="hotel" size={75} color="green" />
                    <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        Appointment's Details!
                    </Text>

                    <Box
                        _text={{
                            textAlign: "center",
                        }}
                        _dark={{
                            _text: {
                                color: "coolGray.600",
                            },
                        }}
                    >
                          <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        Appointment's #No:
                    </Text>
                        {id}

                        <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        Patient Identity:
                    </Text>
                        {patient}

                        <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        Appointment time:
                    </Text>
                        {time}

                        <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        Booking request made at :
                    </Text>
                    {created_at}


                    <Button variant="outline" colorScheme="success"
                        onPress={BookAppointmentHandler}>
                        Approve Appointment
                    </Button>

                    </Box>

                </VStack>
            </Alert></Center>
    )}
}