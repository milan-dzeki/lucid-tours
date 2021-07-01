import React, { Suspense, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './store/actions/index';
import { Switch, Route } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import Home from './pages/Home/Home';
import Loader from './components/UI/Loader/Loader';

// lazy loaded pages
const SignUp = React.lazy(() => import('./pages/SignUp/SignUp'));
const About = React.lazy(() => import('./pages/About/About'));
const Tours = React.lazy(() => import('./pages/Tours/Tours'));
const RequestTour = React.lazy(() => import('./pages/RequestTour/RequestTour'));
const Reviews = React.lazy(() => import('./pages/Reviews/Reviews'));
const LeaveReview = React.lazy(() => import('./pages/LeaveReview/LeaveReview'));
const SingleTourPage = React.lazy(() => import('./pages/SingleTourPage/SingleTourPage'));
const YourPage = React.lazy(() => import('./pages/YourPage/YourPage'));
const YourPageAlt = React.lazy(() => import('./pages/YourPageAlt/YourPageAlt'));
const MeditationTours = React.lazy(() => import('./pages/MeditationTours/MeditationTours'));
const HealthTours = React.lazy(() => import('./pages/HealthTours/HealthTours'));

const App = props => {
  // is Auth
  const isAuth = useSelector(state => state.auth.token);
  // check if there is token in local storage when app loads
  const dispatch = useDispatch();
  const onCheckAuthState = useCallback(() => dispatch(actions.checkAuthState()), [dispatch]);
  useEffect(() => {
    onCheckAuthState();
  }, [onCheckAuthState]);

  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/" render={() => <Home {...props}/>}/>
            <Route
              path="/signup"
              exact
              component={SignUp} />
            <Route
              path="/about"
              exact
              component={About}/>
            <Route
              path="/tours"
              exact
              component={Tours}/>
            {isAuth !== null ? <Route
              path="/your-page"
              exact
              component={YourPage}/> : <Route
              path="/your-page"
              exact
              component={YourPageAlt}/>}
            <Route
              path="/tours/:id"
              exact
              children={<SingleTourPage />}/>
            <Route
              path="/request-tour"
              exact
              component={RequestTour}/>
            <Route
              path="/reviews"
              exact
              component={Reviews}/>
            <Route
              path="/leave-review"
              exact
              component={LeaveReview}/>
            <Route
              path="/meditation"
              exact
              component={MeditationTours}/>
            <Route
              path="/health"
              exact
              component={HealthTours}/>
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
