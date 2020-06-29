import React, {useReducer, createContext} from 'react';

//--------START TYPES----------

type Tlang = 'id' | 'en';

interface IAppState {
  lang: Tlang;
  loggedIn: boolean;
}

type TAction = {type: 'SET_LANG_EN'} | {type: 'SET_LANG_ID'};

const initialState: IAppState = {
  lang: 'id',
  loggedIn: false,
};

//--------END TYPES----------

//-------START REDUCER-------

const reducer = (state: IAppState, action: TAction): IAppState => {
  switch (action.type) {
    case 'SET_LANG_EN':
      return {...state, lang: 'en'};
    case 'SET_LANG_ID':
      return {...state, lang: 'id'};
  }
};

//------END REDUCER-------

//ref: kenapa state sama dispatch lebih baik dipisah contextnya https://hswolff.com/blog/how-to-usecontext-with-usereducer/
const StateContext = createContext(initialState);
const DispatchContext = createContext<(action: TAction) => void>(() => {});

function ContextProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export {StateContext, DispatchContext, ContextProvider};
