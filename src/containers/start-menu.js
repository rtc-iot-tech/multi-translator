import { connect } from 'react-redux'
import StartMenu from '../components/start-menu'
import { 
  setLocalId,
  addTranslateResult,
  setLangSetting
} from '../reducers'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    handleStreamingStarted: ( { localId } ) => {
      dispatch( setLocalId( localId ) )
    },
    handleTranslateResult: ( result ) => {
      dispatch( addTranslateResult( result ) )
    },
    handleSubmitLanguage: ( { languageCode, targetLanguage} ) => {
      dispatch( setLangSetting({
        languageCode,
        targetLanguage
      }))

    }
  }
}

const StartMenuContainer = connect(
  mapStateToProps, mapDispatchToProps
)( StartMenu )

export default StartMenuContainer