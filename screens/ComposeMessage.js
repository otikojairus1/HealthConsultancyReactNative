import * as React from "react"
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input, IconButton,
  Link,  Spinner,
  Button,  Alert,CheckIcon,
  HStack, useToast, AlertDialog,
  Center,  CloseIcon, TextArea,
  NativeBaseProvider,
} from "native-base"
import axios from 'axios'
export default function ComposeMessage ({ navigation, route }){
const {sender, logged, receiver} = route.params;
  
const [email, setEmail] = React.useState('');

const [message, setMessage] = React.useState('');
let [alert, setAlert] = React.useState(false);
let [AlertMessage, setAlertMessage] = React.useState("");
const [isLoading, setIsLoading] = React.useState(false);
  // useEffect(() => {
  //   //using a fake rest api, will replace with the voters api when done
  //   fetch('https://jsonplaceholder.typicode.com/todos/1')
  //   .then(response => response.json())
  //   .then(setIsLoading(false))
  // });

    const toast = useToast();

const onChangeEvent = (event) => {
 setEmail(event)
  //console.log(email);
}

const onChangeEvent2 = (event) => {
 setMessage(event)
  //console.log(password);
}

const onSubmitHandler = (event) => {
  event.preventDefault();
  setIsLoading(true);
  axios({
    method: 'post',
    url: 'https://consultancy-api.herokuapp.com/api/add/message',
    data: {
      "sender":logged,
      "receiver":sender,
      "message":message
  },
    config: { headers: {'Content-Type': 'application/json' }}
    })
     .then(function (response){
      // console.log(response.data);
      if(typeof response.data.error !== "undefined"){
        setIsLoading(false);
        setAlert(true);
        setAlertMessage("We encountered an error signing you in! Please try again later");
      }else{
        setIsLoading(false);
        
       //console.log(response.data);
       navigation.navigate('Sent');
 
      
      }
   
     }).catch((err)=>console.log(err));
 
}


let AlertRender;
if (alert){
  AlertRender = <Alert w="100%" status="info" colorScheme="info">
  <VStack space={2} flexShrink={1} w="100%">
    <HStack
      flexShrink={1}
      space={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack flexShrink={1} space={2} alignItems="center">
        <Alert.Icon />
        <Text fontSize="md" fontWeight="medium" color="coolGray.800">
          Your inputs has a few problems!
        </Text>
      </HStack>
      <IconButton
        variant="unstyled"
        icon={<CloseIcon size="3" color="coolGray.600" />}
      />
    </HStack>
    <Box
      pl="6"
      _text={{
        color: "coolGray.600",
      }}
    >
     {AlertMessage}
    </Box>
  </VStack>
</Alert>
}else{
  AlertRender = "";
}


  return (
    <NativeBaseProvider>
     <Center flex={1} px="3">
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading
        size="lg"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        You can send a message to your doctor with ease!
      </Heading>
      <Heading
        mt="1"
        _dark={{
          color: "warmGray.200",
        }}
        color="coolGray.600"
        fontWeight="medium"
        size="xs"
      >
        Just let us know  what you need us to send. Clicking send will send the message directly to the doctor's inbox. His or her reply will appear in your inbox upon reply.
      </Heading>

      {AlertRender}

      {isLoading ? <HStack space={2} alignItems="center">
      <Spinner size="lg" accessibilityLabel="Trying to sign you in!" />
      <Heading color="primary.500" fontSize="2xl">
        Please wait while we try sending your message..
      </Heading>
    </HStack> : 

      <VStack space={3} mt="5">
      
        <Box alignItems="center" w="100%">
      <TextArea h={20} value={message} onChangeText={onChangeEvent2} placeholder="Your message contents goes here..." w="100%" maxW="300" />
    </Box>
      
        <Button type="submit"mt="2" colorScheme="indigo"
        onPress={onSubmitHandler}>
         Send Direct Message
        </Button>
        <HStack mt="6" justifyContent="center">
    
          {/* <Button variant="ghost" colorScheme="success"
          onPress={() => navigation.navigate('Register')}>
            Sign Up
        </Button> */}
        </HStack>
      </VStack>}
    </Box>
    </Center>
    </NativeBaseProvider>
  )
}