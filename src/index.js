import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import toursReducer from './store/reducers/tours';
import authReducer from './store/reducers/auth';
import reviewPeopleReducer from './store/reducers/reviewPeople';
import reviewsReducer from './store/reducers/reviews';
import bookingReducer from './store/reducers/booking';
import toursFetchingReducer from './store/reducers/toursFetching';
import requestTourReducer from './store/reducers/requestTour';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  tours: toursReducer,
  auth: authReducer,
  reviewPeople: reviewPeopleReducer,
  booking: bookingReducer,
  toursFetching: toursFetchingReducer,
  requestTour: requestTourReducer,
  reviews: reviewsReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));  

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="lucid-tours/">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
