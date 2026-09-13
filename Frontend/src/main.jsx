import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext.jsx'
import AppProvider from './providers/AppProvider.jsx'

// PWA 
import { registerSW } from 'virtual:pwa-register'

registerSW({
    immediate: true,
})


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AppProvider>
            <App className="bg-secondary-bg-color" />
        </AppProvider>
    </BrowserRouter>
)
