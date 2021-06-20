import logo from './logo.svg';
import './App.css';
import { ChakraProvider, Grid, Box, GridItem, Text, Button, ButtonGroup, Table, Thead, Tr, Th, Td } from "@chakra-ui/react"
import React, { useState, useEffect } from 'react';
import Header from './Header';

function DoctorButtons(props) {
  return (
  <Button 
    size="md"
    height="48px"
    width="200px"
    border="2px"
    borderColor="green.500">
      {props.value}
  </Button>);
}

function App({component}) {

  const [data, setData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(0);

  const getData = () => {
    fetch('data.json',
    {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
        setSelectedDoctor(0)
        //editDoctors()
      });
  }
  useEffect(() => {
    getData()
  },[])

  // const editDoctors = () => {
  //   var docs = []
  //   for (const item in data) {
  //     docs.append(item.name)
  //   }
  //   setDoctors(docs)
  //   //setDoctors(data && data.length > 0 && data.map((item) => item.name))
  //   console.log(doctors)
  // }


  return (
    <ChakraProvider>
      <Header/>
      <Grid
        templateColumns="repeat(5, 1fr)"
        gap={1}
      >
        <GridItem colSpan={2} >
        {
          data && data.length > 0 && data.map((item) => <Button 
              size="md"
              height="48px"
              width="200px"
              key={item.index}
              value={item.name} 
              backgroundColor="white"
              onClick={() => setSelectedDoctor(item.index)}
              >
                {item.name}
              </Button>
              )
        }
        {/* {
          doctors.map((doctor) =>
            <DoctorButtons 
            key={doctor.toString()}
            value={doctor} 
            onClick={doctor => setSelectedDoctor(doctor)}/>
          )
        } */}
        </GridItem>
        <GridItem colSpan={3} >
          <Table variant="simple">
            <Thead>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Time</Th>
              <Th>Kind</Th>
            </Thead>
          {
            data.length > 0 &&
            data[selectedDoctor].appointments 
            && data[selectedDoctor].appointments.length > 0 
            && data[selectedDoctor].appointments.map
              ((item) => 
              <Tr>
              <Td>{item.id} </Td>
              <Td>{item.name} </Td>
              <Td>{item.time} </Td>
              <Td>{item.kind} </Td>
              </Tr> )
          }
          </Table>
        </GridItem>
      </Grid>
      
    </ChakraProvider>
  );
}

export default App;
