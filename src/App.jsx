import React from "react";
import WeatherFetch from "./components/weatherFetch/weatherFetch";
import Logo from './components/logo/Logo';

// import {ThemeContextProvider} from "./ThemeContext.jsx";
function App() {
  return (
    <>
{/* <ThemeContextProvider> */}
    <div className="App">

      <header className="App-header">
        <Logo />
        <h1>My Weather App</h1>
      </header>
      <main>
        
          <WeatherFetch />
          {/* <WeekContainer /> */}
        
      </main>
      <footer>
        Page created by mimietruddy
      </footer>

    </div>
    {/* </ThemeContextProvider> */}
    </>
  )
}
export default App;
