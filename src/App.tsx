import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useReducer } from 'react'
import { type Action, type State } from './types'

const initialState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

function reducer (state: State, action: Action) {
  const { type } = action

  switch (type) {
    case 'INTERCHANGE_LANGUAGES':
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }

    case 'SET_FROM_LANGUAGE':
      return {
        ...state,
        fromLanguage: action.payload
      }

    case 'SET_TO_LANGUAGE':
      return {
        ...state,
        toLanguage: action.payload
      }

    case 'SET_FROM_TEXT':
      return {
        ...state,
        loading: true,
        fromText: action.payload,
        result: ''
      }

    case 'SET_RESULT':
      return {
        ...state,
        loading: false,
        result: action.payload
      }

    default:
      return state
  }
}

function App () {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  return (
        <div className="App">
            <h1>Google Translate</h1>
            <button onClick={() => {
              dispatch({ type: 'SET_FROM_LANGUAGE', payload: 'es' })
            }}> Cambiar a Español </button>
            {fromLanguage}
        </div>
  )
}

export default App
