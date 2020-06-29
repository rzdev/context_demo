/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, View, Text, Button} from 'react-native';
import {StateContext, DispatchContext, ContextProvider} from './src/context';

const App: React.FC = () => {
  return (
    <>
      <SafeAreaView>
        <ContextProvider>
          <Component1 />
        </ContextProvider>
      </SafeAreaView>
    </>
  );
};

const Component1: React.FC = () => {
  const AppState = React.useContext(StateContext);

  return (
    <>
      <SafeAreaView>
        <View>
          <Text>{AppState.lang === 'en' ? 'Welcome' : 'Selamat Datang'}</Text>
          <Component2 />
        </View>
      </SafeAreaView>
    </>
  );
};

const Component2: React.FC = () => {
  const AppState = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  return (
    <>
      <Text>
        {AppState.lang === 'en' ? 'Select Language:' : 'Pilih Bahasa:'}
      </Text>
      <Button
        title={'English'}
        color="#841584"
        onPress={() => dispatch({type: 'SET_LANG_EN'})}
      />
      <Button
        title={'Bahasa'}
        color="#841584"
        onPress={() => dispatch({type: 'SET_LANG_ID'})}
      />
    </>
  );
};

export default App;
