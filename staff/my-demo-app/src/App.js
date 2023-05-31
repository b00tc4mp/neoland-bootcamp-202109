import React from 'react';
import SignUp from './components/SignUp';
import Poster from './components/Poster';

// Logic Business
// import { signinUser, signupUser } from "./logic";


class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="container">
        <SignUp />
        <Poster />
      </div>
    )
  }
}
export default App;