import React, {useState, useEffect} from 'react';
import {
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    View,
    Modal,
    RefreshControl
} from 'react-native';

import {
    colors
} from '../styles/style';

import { Button } from 'react-native-elements';
import { colorscopy, stylescopy } from '../styles/copyStyle';

import { 
    useSelector
} from 'react-redux';

import {CalendarList} from 'react-native-calendars';

const Reservations = ({navigation}) =>{

    const [refreshing, setRefreshing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [reservedDate, setreservedDate] = useState();
    const [dateReservelist, setdateReservelist] = useState();

    const Tokendata = useSelector(state => state.products.Tokendata);

    useEffect(()=>{
        getReservationsList()
    },[])

    const reserveService = async () =>{
        setModalOpen(false)
        setRefreshing(true)
        try {
            const  response = await fetch('http://www.bbalansag.online/api/customer/service/reserve/date', {
                method:'POST',
                headers:{
                    'Content-type': 'application/json',
                    'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                    'Authorization': 'Bearer ' + Tokendata
                },
                body: JSON.stringify({
                    reservedDate
                })
            });
            const responseData = await response.json();

            alertMessage(responseData)
        } catch (error) {
            alertMessage(error.message)
        }
        setRefreshing(false)
    }

    const getReservationsList = async () =>{
        setRefreshing(true)
        try {
            const  response = await fetch('http://www.bbalansag.online/api/customer/service/reservation-list', {
                headers:{
                    'Content-type': 'application/json',
                    'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                    'Authorization': 'Bearer ' + Tokendata
                }
            });
            const responseData = await response.json();
            const arraydate = []
            responseData.data.map(item =>{
                arraydate.push(item.reservationDate)
            })

            let newDaysObject = {};
            arraydate.forEach(element => {
                newDaysObject[element] = {
                    selected: true,
                    marked: true,
                    selectedColor: 'blue'
                }
            })

            setdateReservelist(newDaysObject)

        } catch (error) {
            alertMessage(error.message)
        }
        setRefreshing(false)
    }


    const alertMessage = (message) => {
        Alert.alert(
            "An error occured",
            message,
            [ { text: "OKAY"}],
            { cancelable: false }
        );
    }

    const reserveDate = (date) =>{
        setModalOpen(true)
        setreservedDate(date.dateString)
    }

    const calendarItem = () =>{
        return(
            <CalendarList
                onDayPress={(day) => {reserveDate(day)}}
                pagingEnabled={false}
                calendarWidth={320}
                pastScrollRange={0}
                futureScrollRange={2}
                scrollEnabled={true}
                markedDates={
                    dateReservelist
                }
                hideArrows={true}
                horizontal={false}
            />
        );
    }
    
    return(
        <SafeAreaView style={[stylescopy.pY2, stylescopy.h100, {backgroundColor:colors.lightColor}]}>
            {
                refreshing 
                ?
                    <>
                        <ActivityIndicator size="large" color={colors.primaryColor}/> 
                    </>
                :
                    <>
                        <View>
                            <Modal 
                                animationType = {"slide"} 
                                visible = {modalOpen}
                                transparent = {true}
                            >
                                <View style = {[{flex:1, justifyContent:'center', paddingHorizontal:20, backgroundColor:'rgba(0, 0, 0, .4)'}]}>
                                    <View style = {[stylescopy.rounded, {paddingVertical:20, paddingHorizontal:10, backgroundColor:'white'}]}>
                                        <TouchableOpacity onPress={() => setModalOpen(false)} style={[stylescopy.flexEnd]}>
                                            <Text style={[stylescopy.font15, stylescopy.textDanger]}>Close</Text>
                                        </TouchableOpacity>
                                       <View>
                                           <Text style={[stylescopy.font17]}>Do you want to reserve this date?</Text>
                                           <Text style={[stylescopy.font17, stylescopy.textCenter, stylescopy.backgroundPrimary, stylescopy.mT1, stylescopy.p1, stylescopy.textWhite]}>
                                               {reservedDate}
                                            </Text>
                                       </View>
                                        <View style={[stylescopy.mT2, stylescopy.flexRow, stylescopy.flexEnd]}>
                                            <View style={[{marginRight:10}]}>
                                                <Button onPress={() => reserveService()} title="Yes"/>
                                            </View>
                                           <View>
                                                <Button onPress={() => setModalOpen(false)}  title="No"/>
                                           </View>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <FlatList 
                            ListHeaderComponent={calendarItem}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={getReservationsList} />
                            }
                        />
                    </>
            }
            
        </SafeAreaView>
    );
}

export default Reservations;