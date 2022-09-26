import React from 'react'
import {NativeModules, StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DeviceInfo from 'react-native-device-info'

const SetupRootScreen = ({ navigation, route }) => {
    const items = [
        {
            title: 'Connections',
            targetScreen: 'SetupConnections'
        },
        {
            title: 'Video',
            targetScreen: 'SetupVideo',
        },
        {
            title: 'Audio',
            targetScreen: 'SetupAudio'
        },
        {
            title: 'Recording',
            targetScreen: 'SetupRecording'
        },
    
    ]

    const version = DeviceInfo.getVersion()
    const build = DeviceInfo.getBuildNumber()
    const versionStr = `Larix-React version ${version} (${build})`

    const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity style={styles.item} onPress={ () => {
                console.log("Navigate to " + item.title);
                navigation.navigate(item.targetScreen)
                } } >
            <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
        </View>
    );    
  return (
      <SafeAreaView edges={['top', 'left']}>
    <FlatList
    data={items}
    renderItem={renderItem}
    keyExtractor={item => item.targetScreen}
  />
  <View style={styles.ver}>
      <Text>{versionStr}</Text>
  </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    item: {
      alignContent: 'flex-start',
      padding: 10
    },
    text: {
        fontSize: 16
    },
    ver: {
        borderTopColor: '#555',
        borderTopWidth: 2,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#cccccc'

    }
  });

export default SetupRootScreen;
