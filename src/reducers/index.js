const defaultState = {
  apikey:     process.env.REACT_APP_APIKEY || 'YOUR_API_KEY_HERE',
  entryPoint: process.env.REACT_APP_ENTRYPOINT || 'YOUR_ENTRY_POINT_HERE',
  wsUrl: process.env.REACT_APP_WS_URL || 'YOUR_WS_URL',
  languageCode: '',
  targetLanguage: '',
  localId: '',
  translateResults: []
}

const TYPES = {
  SET_LOCALID: 'SET_LOCALID',
  SET_LANG_SETTING: 'SET_LANG_SETTING',
  ADD_TRANSLATE_RESULT: 'ADD_TRANSLATE_RESULT'
}

////////////////////////////////////////////////////
// definitions of action
////////////////////////////////////////////////////
export const setLocalId = ( localId ) => {
  return {
    type: TYPES.SET_LOCALID,
    meta: null,
    payload: {
      localId
    }
  }
}

export const setLangSetting = ( {languageCode, targetLanguage} ) => {
  return {
    type: TYPES.SET_LANG_SETTING,
    meta: null,
    payload: {
      languageCode,
      targetLanguage
    }
  }
}

export const addTranslateResult = ( result ) => {
  return {
    type: TYPES.ADD_TRANSLATE_RESULT,
    meta: null,
    payload: result
  }
}

///////////////////////////////////////////////////
// reducer
///////////////////////////////////////////////////
const reducer = ( state = defaultState, action ) => {
  switch( action.type ) {
    case TYPES.SET_LOCALID:
      return Object.assign( {}, state, { localId: action.payload.localId })
    case TYPES.SET_LANG_SETTING:
      return Object.assign( {}, state, {
        languageCode: action.payload.languageCode,
        targetLanguage: action.payload.targetLanguage
      })
    case TYPES.ADD_TRANSLATE_RESULT:
      const results = state.translateResults.slice(0) // clone array
      results.push( action.payload )
      return Object.assign( {}, state, { translateResults: results })
    default:
      return state
  }
}


export default reducer