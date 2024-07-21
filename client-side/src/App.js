import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Registration></Registration>} />
            </Routes>
        </Router>
    );
}

export default App;
