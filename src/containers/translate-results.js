import { connect } from 'react-redux'
import TranslateResults from '../components/translate-results'

const mapStateToProps = state => {
  return state
}

const TranslateResultsContainer =  connect(
  mapStateToProps, null
)(TranslateResults)

export default TranslateResultsContainer