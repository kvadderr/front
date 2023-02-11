import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import RequireAuth from './pages/RequireAuth';

import Client from './pages/Client/Client'
import Operator from './pages/Operator/Operator'
import Home from './pages/Home/Home'
import Layout from './pages/Layout/Layout'
import { Provider } from 'react-redux';
import { Store } from './redux/store';

const ROLES = {
  'CLIENT': 'CLIENT',
  'OPERATOR': 'OPERATOR',
}

function App() {

  return (
    
      
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="/login" element={<Home />} />
          <Route element={<RequireAuth allowedRoles={[ROLES.CLIENT]} />}>
            <Route path="client" element={<Client/>} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.OPERATOR]} />}>
            <Route path="operator" element={<Operator/>} />
          </Route>  

          

          

        </Route>
      </Routes>
  )
}

export default App
