
import React, { useState ,useEffect} from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Spinner,
  Center,
} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
let data=[];
export default function AvailaibleDoctors({navigation, logged}) {
  const [mode, setMode] = useState('Basic');
 useEffect(()=>{
  // data = [];
 });
  return (
    <NativeBaseProvider>
      <Box bg="white" flex="1" safeAreaTop>
        <Heading p="4" pb="3" size="lg">
          Hi there, check out our availaible doctors
        </Heading>
        <Basic logged={logged} nav={navigation}/>
      </Box>
    </NativeBaseProvider>
  );
}



function Basic({nav, logged}) {

  
  const [listData, setListData] = useState(data);
  const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      data = [];
        //using a fake rest api, will replace with the voters api when done
        fetch('https://consultancy-api.herokuapp.com/api/available/doctors')
        .then(response => response.json())
        .then(
          function (response){
           // console.log(response.Data[0]);
            response.response.forEach(element => {
              
              data.push(element);
              setIsLoading(false);
            });
          }
            );
           
            
        } );
      
      
 
console.log(data);
 
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
   // setTimeout(() => setIsLoading(false), 1000);
    setListData(newData);

  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const renderItem = ({ item, index }) => (
      
    <Box>
      <Pressable onPress={
  ()=>{
    nav.navigate('Book Appointment', {
      "id": item.id,
      "name": item.name,
      "email": item.email,
      "regno": item.regno,
      "availability": item.availability,
      "created_at": item.created_at,
      "updated_at": item.updated_at,
      "logged":logged
  });
    
  }


      } bg="white">
        <Box
          pl="4"
          pr="5"
          py="2"
          >

            
          <HStack alignItems="center" space={3}>
            <Avatar size="48px" source={{uri: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'}} />
            <VStack>
              <Text color="coolGray.800"  _dark={{ color: 'warmGray.50' }}  bold>
                {item.name}
              </Text>
              <Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}>{item.regno}</Text>
            </VStack>
            <Spacer />
            {item.availability?
            <Text fontSize="xs" color="coolGray.800"  _dark={{ color: 'warmGray.50' }} alignSelf="flex-start">
              Online
            </Text>:
            <Text fontSize="xs" color="coolGray.800"  _dark={{ color: 'warmGray.50' }} alignSelf="flex-start">
              Offline
            </Text>}
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );


  if (!isLoading){
    return (
        <Box bg="white" safeArea flex="1">
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-130}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
             </Box> 
      
      );
  }else{
      return(

        <Center flex={1} px="3">
    <HStack space={2} alignItems="center">
    <Spinner accessibilityLabel="Loading posts" />
    <Heading color="primary.500" fontSize="md">
      We are Personalizing your experience...!
    </Heading>
  </HStack>
  </Center>);
  }

  

 
}