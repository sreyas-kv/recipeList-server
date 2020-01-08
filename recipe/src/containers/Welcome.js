import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signup, login, recieveAuth } from '../actions/auth';
import Welcome from '../components/Welcome';

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  error: state.services.errors.auth,
});
  
  const mapDispatchToProps = dispatch =>
  bindActionCreators({ signup, login, recieveAuth }, dispatch );
  
  export default connect(mapStateToProps, mapDispatchToProps)(Welcome);