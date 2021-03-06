import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Game from '../game';
import * as Actions from '../actions/action';

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);