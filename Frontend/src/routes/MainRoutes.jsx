import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/home"
import { Login } from "../pages/login"
import { Register } from "../pages/register"
import { Partner } from "../pages/Partner"
import { DeliveryPartner } from "../pages/DeliveryPartner"
import { TermsAndConditions } from "../pages/t&c"
import { About } from "../pages/about"
import { ContactUs } from "../pages/Contact"
import { Dashboard } from "../pages/Dashboard"
import ProtectedRoute from "./ProtectedRoute"
import OrderHistory from "../pages/OrderHistory"
import Products from "../pages/Products"
import Analytics from "../pages/Analytics"

export const MainRoutes = () =>{

    return(<>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/almighty/partner" element={<Partner />} />
            <Route path="/almighty/partner/register" element={<Register />} />
            <Route path="/almighty/delivery" element={<DeliveryPartner />} />
            <Route path="/almighty/policies" element={<TermsAndConditions />} />
            <Route path="/almighty/about-us" element={<About />} />
            <Route path="/almighty/contact-us" element={<ContactUs />} />

            <Route path="/almighty/partner/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />

            <Route path="/almighty/partner/dashboard/history" element={<OrderHistory />} />
            <Route path="/almighty/partner/dashboard/products" element={<Products />} />
            <Route path="/almighty/partner/dashboard/analytics" element={<Analytics />} />
        </Routes>
    </>)
}