/**
 * MALEO - Context & react-query demo
 *
 * @format
 */

import React, {FC, useContext} from 'react';
import {SafeAreaView, View, Text, Button} from 'react-native';
import {StateContext, DispatchContext, ContextProvider} from './src/context';
import useFilms from './src/api/hooks/useFilms';
import useFilm from './src/api/hooks/useFilm';
import {queryCache} from 'react-query';

const App: FC = () => {
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

const Component1: FC = () => {
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

const Component2: FC = () => {
  const AppState = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <Text>
        {AppState.lang === 'en' ? 'Select Language:' : 'Pilih Bahasa:'}
      </Text>
      <Button
        title={'English (Set Lang context to EN)'}
        color="#841584"
        onPress={() => dispatch({type: 'SET_LANG_EN'})}
      />
      <Button
        title={'Bahasa (Set Lang context to ID)'}
        color="#841584"
        onPress={() => dispatch({type: 'SET_LANG_ID'})}
      />
      <Button
        title={'Change Film cache data'}
        color="#841584"
        onPress={() =>
          queryCache.setQueryData(['film', 5], {
            episode_id: 5,
            title: 'mantap!',
          })
        }
      />
      {AppState.lang === 'en' ? <Component3 /> : <Component4 />}
    </>
  );
};

const Component3: FC = () => {
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

const Component4: FC = () => {
  const {isLoading, isError, data, error} = useFilm(5);
  const {data: filmsData, isLoading: filmsIsLoading} = useFilms();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    console.log(error);
    return <Text>Error!</Text>;
  }

  return (
    <View>
      <Text>{data.title}</Text>
      <Text>
        Total Films :
        {filmsIsLoading ? 'Loading Films..' : filmsData.results.length}
      </Text>
    </View>
  );
};

export default App;
