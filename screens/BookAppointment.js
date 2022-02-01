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
export default function BookAppointment({ route, navigation }) {
    const { id, name, logged, email, regno, availability, created_at, updated_at, } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const BookAppointmentHandler = ()=>{
        setIsLoading(true);
        axios.post('https://consultancy-api.herokuapp.com/api/add/appointment',{
            
                patient:logged,
                doctor:email,
                time:created_at,
                confirm:false 

        })
        .then((response)=>{
            setIsLoading(false);
            //console.log(response.data);
            navigation.navigate('Success');

        })
        .catch((err)=>console.log(err));


    }

    if (isLoading){
        return (
        <Center flex={1}>
        <VStack space={2} alignItems="center">
        <Spinner size="lg" accessibilityLabel="Trying to sign you in!" />
        <Heading color="primary.500" fontSize="xl">
          Please wait as we book for your appointment...
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
                        Doctor's Details!
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
                        Doctor's Name:
                    </Text>
                        {name}

                        <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        Doctor's id:
                    </Text>
                        {id}

                        <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        # Doctors Registration No:
                    </Text>
                        {regno}

                        <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        Availability status:
                    </Text>
                        {availability? 
                        <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        Online (available for bookings)
                    </Text>: 
                        <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        offline(not available for bookings)
                    </Text>}


                    <Button variant="outline" colorScheme="success"
                        onPress={BookAppointmentHandler}>
                        Book Appointment
                    </Button>

                    </Box>

                </VStack>
            </Alert></Center>
    )}
}