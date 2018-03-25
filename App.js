import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider, Store } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store';
import AuthScreen from './screens/authScreen';
import WelcomeScreen from './screens/welcomeScreen';
import HubScreen from './screens/hubScreen';
import CentralScreen from './screens/centralScreen';
import SettingsScreen from './screens/settingsScreen';

import AlarmSettings from './componentSettingsScreens/alarmSettings';

export default class App extends React.Component {
  render() {
    const tabBarOptions = Platform.OS === 'ios' ? 
    {
      // iOS tabBarOptions
      showLabel: true,
      labelStyle: { fontSize: 12 }
    } : {
      // Android tabBarOptions
      showIcon: true,
      showLabel: true,
      labelStyle: { fontSize: 12 }
    }


    const { persistor, store } = configureStore();
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          hub: {
            screen: StackNavigator({ 
              hub: { screen: HubScreen },
              alarmSettings: { screen: AlarmSettings }
            })
          },
          central: { screen: CentralScreen },
          settings: { screen: SettingsScreen }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      animationEnabled: true
    });

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
