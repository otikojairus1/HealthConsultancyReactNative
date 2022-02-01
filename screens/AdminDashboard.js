import * as React from "react"
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input, IconButton,
  CloseIcon,
  Link, Spinner,
  Button, Alert,
  HStack, useToast,
  Center, Select, CheckIcon,
  NativeBaseProvider,
} from "native-base"
import axios from 'axios'
export default function AdminDashboard({ routes, navigation }) {


  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [regno, setRegNo] = React.useState('');
  const [password, setPassword] = React.useState(['']);

  let [service, setService] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false);
  let [alert, setAlert] = React.useState(false);
  let [AlertMessage, setAlertMessage] = React.useState("");


  const toast = useToast()

  const onChangeEmail = (event) => {
    setEmail(event)
    //console.log(email);
  }

  const onChangeUsername = (event) => {
    setUsername(event)
    //console.log(password);
  }

  const onChangeRegNo = (event) => {
    setRegNo(event)
    //console.log(username);
  }

  const onChangePassword = (event) => {
    setPassword(event)
    //console.log(username);
  }

  const onSubmitHandler2 = () => {
      navigation.navigate('All Doctors');
  }



  //navigation.navigate('Hello');
  // setIsLoading(false);
  const onSubmitHandler = (event) => {
   // console.log(email, username, regno, password);
    event.preventDefault();
    setIsLoading(true);
    axios.post('https://consultancy-api.herokuapp.com/api/add/doctor', {
        "name":username,
        "password":password,
        "email":email,
        "regno":regno,
        "availability":false
       
    })
      .then(function (response) {

        setIsLoading(false);

        if (typeof response.data.error !== "undefined") {
          setAlert(true);
          setAlertMessage("An error occured while creating your account, you may have provided an invalid Email");
        } else {
          //setAlertMessage("We successfully registered you to the system, you can now go back and sign in");
          console.log(response.data);
          navigation.navigate('Success');
          

        };




      })
      .catch(function (error) {
        console.log(error);
      });
  }

  let AlertRender;
  if (alert) {
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
              Kindly double check your entries!
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
  } else {
    AlertRender = "";
  }



  return (
    
      <Center flex={1} px="3" bg="primary.200">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome Admin! {service}
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
            Add new doctors here! Remember to tell them the default password you'll use, they'll ultimately need that to log in.
          </Heading>

          {AlertRender}


          {isLoading ? <HStack space={2} alignItems="center">
            <Spinner size="lg" accessibilityLabel="Trying to sign you in!" />
            <Heading color="primary.500" fontSize="xl">
              Adding a new Doctor...
            </Heading>
          </HStack> :

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input name="email" value={email} onChangeText={onChangeEmail} />
              </FormControl>

              <FormControl>
                <FormControl.Label>Username</FormControl.Label>
                <Input name="username" value={username} onChangeText={onChangeUsername} />
              </FormControl>
            

              <FormControl>

                <FormControl.Label>Password</FormControl.Label>
                <Input name="password" value={password} onChangeText={onChangePassword} type="password" />

              </FormControl>
              <FormControl>

                <FormControl.Label> Registration no.</FormControl.Label>
                <Input name="cpassword" value={regno} onChangeText={onChangeRegNo} type="password" />
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Read the staff policy...
                </Link>
              </FormControl>
              <Button type="submit" mt="2" colorScheme="blue"
                onPress={onSubmitHandler}>
                Add Doctor
              </Button>
              <Button type="submit" mt="2" colorScheme="blue"
                onPress={onSubmitHandler2}>
                All Doctor
              </Button>
        
            </VStack>}
        </Box>
      </Center>
    
  )
}