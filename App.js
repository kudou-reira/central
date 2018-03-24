import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider, Store } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store';
import AuthScreen from './screens/authScreen';
import WelcomeScreen from './screens/welcomeScreen';
import CentralScreen from './screens/centralScreen';
import SettingsScreen from './screens/settingsScreen';

export default class App extends React.Component {
  render() {
    const { persistor, store } = configureStore();
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          central: { screen: CentralScreen },
          settings: { screen: SettingsScreen }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
        navigationOptions: {
          tabBarVisible: false
        }
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
