import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UrgentImportant from './pages/UrgentImportant';
import UrgentNotImportant from './pages/Urgentnotimportant';
import ImportantNotUrgent from './pages/ImportantButNotUrgent';
import NotUrgentNotImportant from './pages/NotUrgentNotImportant';
import EditTaskDateTime from './pages/EditTaskDateTime';
import SplashScreen from './components/Splash_Screen';
import Calendar from './pages/Calendar';
// import Settings from './components/Settings'; // Changed from Setting to Settings to match the actual file

// Import other category components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar/>} /> 
        <Route path="/urgent-important" element={<UrgentImportant />} />
        <Route path="/urgent-not-important" element={<UrgentNotImportant />} />
        <Route path="/important-not-urgent" element={<ImportantNotUrgent />} />
        <Route path="/not-urgent-not-important" element={<NotUrgentNotImportant />} />
        <Route path="/edit-task-datetime/:id" element={<EditTaskDateTime />} />
        {/* <Route path="/settings" element={<Settings />} />  */}
        
        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;