import { Provider } from "@/components/ui/provider";
import {
  TimelineConnector,
  TimelineContent, TimelineItem, TimelineRoot, TimelineTitle
} from "@/components/ui/timeline";
import {
  Button, Card, Flex, Grid, GridItem, Heading,
  Switch,
  Table, Text
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import Header from './Header';

function App({ }) {

  const [data, setData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);
  const [checked, setChecked] = useState(false)

  const getData = () => {
    fetch('data.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson)
        setSelectedDoctor(0)
      });
  }
  useEffect(() => {
    getData()
  }, [])


  return (
    <Provider>
      <Header />
      <Grid
        templateColumns="repeat(5, 1fr)"
        gap={10}
        paddingRight={10}
        height={"90vh"}
        boxSizing={"border-box"}
        marginTop={5}
      >
        <GridItem colSpan={2} backgroundColor={"bg.emphasized"} paddingTop={3} paddingBottom={3} >
          <Flex direction={"column"} align={"flex-start"}>
            <Heading paddingLeft={6} paddingBottom={3}>Physicians</Heading>
            {
              data && data.length > 0 && data.map((item) =>
                <Button
                  size="md"
                  colorPalette={selectedButton == item.index ? "blue" : "bg"}
                  key={item.index}
                  value={item.name}
                  width={"100%"}
                  justifyContent={"flex-start"}
                  paddingLeft={10}
                  variant={selectedButton == item.index ? "solid" : "ghost"}
                  onClick={() => {
                    setSelectedDoctor(item.index);
                    setSelectedButton(item.index);
                  }
                  }
                >
                  {item.name}
                </Button>
              )
            }
          </Flex>
        </GridItem>
        <GridItem colSpan={3}>

          <Grid templateColumns="repeat(6, 1fr)"
            gap={10}>
            <GridItem colSpan={4}>
              {data[selectedDoctor] ?
                (<div>
                  <Heading>{data[selectedDoctor].name}</Heading>
                  <Text>{data[selectedDoctor].email}</Text></div>) : <br />
              }

            </GridItem>
            <GridItem colSpan={2}>
              <Switch.Root
                checked={checked}
                onCheckedChange={(e) => setChecked(e.checked)}
                mb={10}
                mt={3}
              >
                <Switch.HiddenInput />
                <Switch.Label>Timeline View</Switch.Label>

                <Switch.Control>

                  <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Table View</Switch.Label>

              </Switch.Root>
            </GridItem>
          </Grid>



          {checked ?
            (<Table.Root variant={"outline"}>
              <Table.Header background={"bg.info"} color={"white"} textDecorationColor={"white"}>
                <Table.Row>
                  <Table.ColumnHeader>Time</Table.ColumnHeader>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Kind</Table.ColumnHeader>
                </Table.Row>

              </Table.Header>
              <Table.Body>
                {
                  data.length > 0 &&
                  data[selectedDoctor].appointments
                  && data[selectedDoctor].appointments.length > 0
                  && data[selectedDoctor].appointments.map
                    ((item) =>
                      <Table.Row>
                        <Table.Cell>{item.time} </Table.Cell>
                        <Table.Cell>{item.name} </Table.Cell>
                        <Table.Cell>{item.kind} </Table.Cell>
                      </Table.Row>)
                }
              </Table.Body>
            </Table.Root>) :
            (<TimelineRoot colorPalette={"blue"}>
              {data.length > 0 &&
                data[selectedDoctor].appointments
                && data[selectedDoctor].appointments.length > 0 &&
                data[selectedDoctor].appointments.map
                  ((item) => (
                    <TimelineItem>
                      <TimelineContent width="20" mt="2">
                        <TimelineTitle whiteSpace="nowrap">{item.time}</TimelineTitle>
                      </TimelineContent>
                      <TimelineConnector mt="2">
                        {item.id}
                      </TimelineConnector>
                      <TimelineContent>
                        <Card.Root >

                          <Card.Body lineHeight="tall">
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Description>{item.kind}</Card.Description>

                          </Card.Body>
                          {/* <Card.Footer>
                            ABCD
                          </Card.Footer> */}
                        </Card.Root>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
            </TimelineRoot>)}
        </GridItem>
      </Grid>

    </Provider >
  );
}

export default App;
