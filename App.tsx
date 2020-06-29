/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useContext} from 'react';
import {SafeAreaView, View, Text, Button} from 'react-native';
import {StateContext, DispatchContext, ContextProvider} from './src/context';
import useFilms from './src/api/hooks/useFilms';
import useFilm from './src/api/hooks/useFilm';

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

/** dibawah ini adalah component 1,2,3,4 **/

const Component1: React.FC = () => {
  const AppState = useContext(StateContext);

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
  const AppState = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

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
      {AppState.lang === 'en' ? <Component3 /> : <Component4 />}
    </>
  );
};

const Component3: React.FC = () => {
  const {isLoading, isError, data, error} = useFilms();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    console.log(error);
    return <Text>Error!</Text>;
  }

  return (
    <>
      {data.results.map((item: any) => (
        <View key={item.episode_id}>
          <Text>{item.title}</Text>
        </View>
      ))}
    </>
  );
};

const Component4: React.FC = () => {
  const {data: filmsData, isLoading: filmsIsLoading} = useFilms();
  const {isLoading, isError, data, error} = useFilm(5);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    console.log(error);
    return <Text>Error!</Text>;
  }

  return (
    <View key={data.id}>
      <Text>{data.title}</Text>
      <Text>
        Total Films :
        {filmsIsLoading ? 'Loading Films..' : filmsData.results.length}
      </Text>
    </View>
  );
};

export default App;
