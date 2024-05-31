import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../components/admin/theme';
import Sidebar from '../components/admin/Sidebar';

import PreOrders from '../components/admin/PreOrders';
import PreOrderDetails from '../components/admin/PreOrderDetails';
import { useSelector } from 'react-redux';
import SmartLightApps from '../components/admin/SmartLightApps';
import Users from '../components/admin/Users';
import Solutions from '../components/admin/Solutions';
import ProfileImages from '../components/admin/ProfileImages';
import Dashboard from '../components/admin/Dashboard';


function Admin() {
  const [theme, colorMode] = useMode();
  const pageAdmin = useSelector((state) => state.admin.pageAdmin);


  return (


    <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
    backgroundImage: `url(./apBg.svg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
     }}
    className="flex justify-center min-h-screen items-center relative "
    >
    <ColorModeContext.Provider value={colorMode}>
  <ThemeProvider theme={theme}>    
    <CssBaseline />
    <div className="app flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* İçerik */}
        
        {pageAdmin === 'Dashboard' && <Dashboard/>}
        {pageAdmin === 'Users' && <Users />}
        {pageAdmin === 'Solutions' && <Solutions />}
        {pageAdmin === 'Pre Orders' && <PreOrders />}
        {pageAdmin === 'Pre Order Details' && <PreOrderDetails />}
        {pageAdmin === 'Smart Light Apps' && <SmartLightApps />}
        {pageAdmin === 'Profile Images' && <ProfileImages />}
      </main>
    </div>
  </ThemeProvider>
</ColorModeContext.Provider>
</div>
  );
}

export default Admin;
