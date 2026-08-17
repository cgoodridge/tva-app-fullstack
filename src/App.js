
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NexusEventList from './pages/NexusEventList';
import MembersListPage from './pages/MembersListPage';
import EventDetailPage from './pages/EventDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/Navbar';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#ff6508',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#2196f3',
      dark: '#006596',
      contrastText: '#000',
    },
  },
});


function App() {
  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme} >
          <header>
            <NavBar />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage/>} exact />
              <Route path="/about" element={<AboutPage/>} />
              <Route path="/nexus-events" element={<NexusEventList/>} />
              <Route path="/members" element={<MembersListPage/>} />
              <Route path="/timeline" element={<NexusEventList/>} />
              <Route path="/event/:code" element={<EventDetailPage/>} />
              <Route element={<NotFoundPage/>} />
            </Routes>
          </main>
          <footer>
            <p> &copy; Copyright TVA &infin; || Note: This is a fan project and not affiliated with Marvel Studios.</p>
          </footer>
        </ThemeProvider>
      </div>
    </Router>

  );
}

export default App;
