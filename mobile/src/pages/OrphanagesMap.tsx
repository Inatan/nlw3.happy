import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import {RectButton} from 'react-native-gesture-handler'
import MapView, {Marker, Callout,PROVIDER_GOOGLE} from 'react-native-maps';
import MapMarker from '../images/map-marker.png'
import {Feather} from '@expo/vector-icons';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

export default function OrphanagesMap() {
    const navigation = useNavigation();
    const [orphanages,setOrphanages] = useState<Orphanage[]>([]);

    useFocusEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    })
    
    function handleNavigateToOrphanageDetails(id:number){
        navigation.navigate('OrphanageDetails',{id});
    }

    function handleNavigateToSelectMapPosition(){
        navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>

      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -30.0603358,
          longitude: -51.2193373,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008, 
        }}
      >
          {   
            orphanages.map(orphanage => {
                return (
                    <Marker 
                        key={orphanage.id}
                        icon={MapMarker}
                        coordinate={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude,
                            }}
                        calloutAnchor={{
                            x: 2.7,
                            y: 0.8,
                        }}>
                        <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                            <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}> 
                                {orphanage.name}
                            </Text>
                            </View>
                        </Callout>
                    </Marker>
                    );
                }
            )}
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToSelectMapPosition}>
            <Feather name="plus" size={20} color="#FFF"></Feather>
        </RectButton>
      </View>

    </View>
    );    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  
     map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      justifyContent: 'center',
      elevation: 3,
    },
  
    calloutText: {
      color: '#0089A5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold'
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 10,
    },
    footerText: {
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold'
    },
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#16C3D6',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center'
    },
    
  });
  