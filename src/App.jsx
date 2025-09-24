import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Nav from "./Frontend/Nav/nav";
import Home from "./Frontend/Home/home";
import Footer from "./Frontend/Footer/footer";
import AdminLogin from "./Frontend/Admin/adminlogin";
import Admin from "./Frontend/Admin/admin";

// Import your Pages (PascalCase to match file names)
import CategoryPage from "./Frontend/Pages/CategoryPage";
import CartPage from "./Frontend/Cart/cart";
import { CartProvider } from "./Frontend/Cart/CartContext";

// Layout for normal pages (with Nav + Footer)
function Layout() {
  return (
    <>
      <Nav />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Normal pages with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="category/:name" element={<CategoryPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>

          {/* Admin pages without Layout */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
