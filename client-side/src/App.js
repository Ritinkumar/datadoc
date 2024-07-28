import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Addrepository from './components/Addrepository';
function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Registration></Registration>} />
                <Route
                    path='/test'
                    element={<Addrepository></Addrepository>}
                ></Route>
            </Routes>
        </Router>
    );
}

export default App;
