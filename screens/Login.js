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
  Center,  CloseIcon,
  NativeBaseProvider,
} from "native-base"
import axios from 'axios'
export default function Login ({ navigation }){

  
const [email, setEmail] = React.useState('');

const [password, setPassword] = React.useState('');
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
  console.log(email);
}

const onChangeEvent2 = (event) => {
 setPassword(event)
  console.log(password);
}

const onSubmitHandler = (event) => {
  event.preventDefault();
  setIsLoading(true);
  axios({
    method: 'post',
    url: 'https://consultancy-api.herokuapp.com/api/login',
    data: {
      "email":email,
      "password":password
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
        navigation.navigate('Administrator Dashboard');
       // console.log(response.data);
     if (response.data.userDetails.email == "admin@consultancy.com"){
        console.log("am an admin user");

       // navigation.navigate('Create Room', {identity: response.data.userDetails.email});
     }else{
     navigation.navigate('Patient Dashboard', {"test":response.data.userDetails.email});
     //console.log("am a normal user");
     }
      
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
        Good to see you Back! {email}
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
        Help us know who you are!
      </Heading>

      {AlertRender}

      {isLoading ? <HStack space={2} alignItems="center">
      <Spinner size="lg" accessibilityLabel="Trying to sign you in!" />
      <Heading color="primary.500" fontSize="2xl">
        Please wait us we work on your verification status..
      </Heading>
    </HStack> : 

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input name="email" value={email} onChangeText={onChangeEvent} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input  name="password" value={password} onChangeText={onChangeEvent2} type="password" />
          <Link
            _text={{
              fontSize: "md",
              fontWeight: "500",
              color: "indigo.500",
            }}
            alignSelf="flex-end"
            mt="1"
            onPress={()=>navigation.navigate('Doctor Login')}
          >
            Sign in as a doctor?
          </Link>
        </FormControl>
        <Button type="submit"mt="2" colorScheme="indigo"
        onPress={onSubmitHandler}>
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            I'm a new user.{" "}
          </Text>
          <Button variant="ghost" colorScheme="success"
          onPress={() => navigation.navigate('Register')}>
            Sign Up
        </Button>
        </HStack>
      </VStack>}
    </Box>
    </Center>
    </NativeBaseProvider>
  )
}