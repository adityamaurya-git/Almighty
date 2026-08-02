import { useEffect } from 'react';
import { Navbar } from './components/Navbar.jsx'
import { Footer } from './pages/footer.jsx'
import { Home } from './pages/home.jsx'
import { MainRoutes } from './routes/MainRoutes.jsx'
import { Toaster } from "react-hot-toast";

export const App = () =>{

  useEffect(() =>{
    if("Notification" in window){
      Notification.requestPermission();
    }
  },[]);

  
  return(<>
    <Toaster position="top-right" />
  
    <main className="w-full h-full  font-gilroyBold">
      {/* <Navbar /> */}
      <MainRoutes />
      <Footer />
    </main>
  </>)
}