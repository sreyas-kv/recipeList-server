import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Welcome from './containers/Welcome';
import Recipes from './containers/Recipes'; 
import CreateRecipe from './containers/CreateRecipe';
import history from './util/history';
// import PrivateRoute from './containers/PrivateRoute';
import Signup from './components/Signup';
import RecipeDetails from'./components/RecipeDetails';

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipeDetails" component={RecipeDetails} />
          <Route exact path="/createRecipe" component={CreateRecipe} />
          <Redirect to="/welcome" />
          {/* <Route exact path="/signup" component={Signup} /> */}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}



export default App;
