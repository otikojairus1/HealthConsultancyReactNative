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
export default function ViewMessage({route,navigation}) {
    const {id, sender, receiver,logged, created_at, message} = route.params;
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
           Message id: {id}
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
           Message Content: {message}
          </Text>
          <HStack>
              <Text
            fontSize="lg"
            fontWeight="bold"
            _dark={{
              color: "coolGray.800",
            }}
          >
           Sent by: {sender}
          </Text>
      </HStack>

      <HStack>
              <Text
            fontSize="lg"
            fontWeight="bold"
            _dark={{
              color: "coolGray.800",
            }}
          >
           Sent at: {created_at}
          </Text>
      </HStack>
      <Button colorScheme="success"
          onPress={() => navigation.navigate('Reply Message', {
              'sender':sender,
              "receiver":receiver,
              "logged":logged
          })}>
            Reply to this message
        </Button>
          </Box>
        </VStack>
      </Alert></Center>
    )
}