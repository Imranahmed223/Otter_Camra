import React from 'react'
import {NativeModules, StyleSheet, View, Text, Switch, FlatList, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connections } from './Connections';


const SetupConnectionsList = ({ navigation }) => {

  const [isUpdating, setUpdating] = React.useState(false)
  const [connList, updateList] = React.useState(connections.getList())

  React.useEffect(() => {
    navigation.addListener('focus', (ev) => {
      console.log('Entering connectionList')
      updateList(connections.getList())
      setUpdating(false)
    });

    navigation.addListener('blur', (ev) => {
      console.log('Leaving connectionList')
      setUpdating(true)
    });

  }, [navigation]);

  const toggleActive = (item, newValue) => {
    var newList = connList.map((conn) => {
      if (conn.id == item.id) {
        conn.active = newValue
      }
      return conn
    })
    updateList(newList)
    connections.toggleActive(item, newValue)
  }

  const renderItem = ({ item }) => (
    <View style={styles.selectRow}>
      <View style={styles.connectionDetails}>
        <TouchableOpacity style={styles.item} onPress={ () => {
            navigation.navigate("ConnectionEditor", {id: item.id})
            } }  >
                <View>
                    <Text style={styles.title}>{item.name}</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>{item.url}</Text>
                </View>
        </TouchableOpacity>
        </View>
        <View>
          <Switch value={item.active} onValueChange={(newValue) => toggleActive(item, newValue)} />
        </View>
    </View>
);
  console.log("Create connections list " + connections.getList().length)
  return (
    <SafeAreaView edges={['top', 'left']}>
      <FlatList
      data={connList}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      refreshing={this.isUpdating}
    />
        <View>
            <TouchableOpacity style={styles.item} 
              onPress={ () => navigation.navigate("ConnectionEditor")}  >
                    <View style={styles.title}>
                        <Text>New connection</Text>
                    </View>
            </TouchableOpacity>
        </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    selectRow: {
      flexDirection: 'row',
    },
    item: {
      alignContent: 'flex-start',
      backgroundColor: '#DDDDDD',
      padding: 10
    },
    connectionDetails: {
      flexBasis: 100,
      flexGrow: 1
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold'
        
    },
    subtitle: {
        fontSize: 12
    }
  });

export default SetupConnectionsList;
