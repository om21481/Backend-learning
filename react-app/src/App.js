import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Main from './components/Main';
import Hotels from './components/hotels';
import Users from './components/users';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><h1>Hello from App</h1></>}/>
        <Route exact path="/Main/dev" element={<Main/>}/>
        <Route path='/Main' element={<><h1>this is from without exact page</h1></>} />

        <Route path='/hotels' element={
        <>
          <Hotels/>
        </>
        }/>

        <Route path='/getuser' element={
          <>
            <Users/>
          </>
          }/>

        <Route path='*' element={<><h1>This is page</h1></>} />    
      </Routes>
    </BrowserRouter>
    </>
  );
}

// we can use exact so that it renders ony that page
// path="*" This is for error page

//  we will use Link tag for going of different pages
// we will use useNavigate to navigate between pages : when clicking buttons or login of user or etc

// proxy is set for api requests in package.json


// we can use useLocation from react-router-dom to access the url : see Hotel.jsx

// https://www.youtube.com/watch?v=mbsmsi7l3r4       -- important video for refresh tokens

export default App;
