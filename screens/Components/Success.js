import React from 'react'
import { View } from 'react-native'
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input, Alert,
    Link,
    Button,Spinner,
    HStack, TextArea,
    Center,
    NativeBaseProvider,
  } from "native-base"
export default function Done() {
    return (
        <Center flex={1} mx={4}>
        <Alert w="100%" status="success">
        <VStack space={1} flexShrink={1} w="100%" alignItems="center">
          <Alert.Icon size="md" />
          <Text
            fontSize="lg"
            fontWeight="bold"
            _dark={{
              color: "coolGray.800",
            }}
          >
           You've done it!
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
           You've successfully booked an appointment. Make sure to check with your inbox. We will immidiately inbox you upon doctor's approval and confirmation.
      

          </Box>
        </VStack>
      </Alert></Center>
    )
}