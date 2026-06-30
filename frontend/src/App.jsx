import { useEffect, useMemo, useState } from "react";
import {
  fetchServices,
  fetchRecommendations,
  fetchOffers,
  submitBooking,
  sendChatMessage,
  upgradeToSubscriber,
  getApiErrorMessage,
} from "./api";
import { useUser } from "./context/UserContext";
import LoginScreen from "./components/LoginScreen";
import AdminDashboard from "./components/AdminDashboard";
import ServicesGrid from "./components/ServicesGrid";
import Recommendations from "./components/Recommendations";
import ChatWindow from "./components/ChatWindow";
import CartPanel from "./components/CartPanel";
import HierarchicalServiceBrowser from "./components/HierarchicalServiceBrowser";
import AppHeader from "./components/AppHeader";
import MobileNav from "./components/MobileNav";
import Toast from "./components/Toast";
import LocationBar from "./components/LocationBar";
import HeroCarousel from "./components/HeroCarousel";
import CategoryRail from "./components/CategoryRail";
import FeaturedRow from "./components/FeaturedRow";
import OffersStrip from "./components/OffersStrip";
import MyBookings from "./components/MyBookings";

function CustomerApp() {
  const { user, setUser, location, setLocation, logout } = useUser();
  const [services, setServices] = useState([]);
  const [offers, setOffers] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [browserOpen, setBrowserOpen] = useState(false);
  const [browserServiceId, setBrowserServiceId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileTab, setMobileTab] = useState("browse");
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [bookingsRefresh, setBookingsRefresh] = useState(0);
  const [servicesLoading, setServicesLoading] = useState(true);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => setToast({ message: "", type: "info" }), 4000);
  };

  const loadCatalog = async () => {
    setServicesLoading(true);
    try {
      const [svc, off] = await Promise.all([fetchServices(), fetchOffers()]);
      setServices(svc);
      setOffers(off);
    } catch (error) {
      console.error(error);
      showToast(getApiErrorMessage(error, "Could not load services."), "error");
    } finally {
      setServicesLoading(false);
    }
  };

  const loadRecommendations = async () => {
    try {
      const data = await fetchRecommendations(user.email);
      setRecommendations(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCatalog();
    loadRecommendations();
  }, [user.role, user.email]);

  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) =>
        s.title?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q)
    );
  }, [services, searchQuery]);

  const openBrowser = (serviceId = null) => {
    setBrowserServiceId(serviceId);
    setBrowserOpen(true);
    setMobileTab("browse");
  };

  const handleAddToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
    showToast(`${item.name} added to cart`, "success");
  };

  const handleRemoveFromCart = (index) => {
    const removed = cartItems[index];
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast(`${removed.name} removed`, "info");
  };

  const handleCheckout = async () => {
    if (!location.trim()) {
      showToast("Please set your location (area / pincode)", "error");
      return;
    }
    if (!address.trim()) {
      showToast("Please enter your service address", "error");
      return;
    }
    if (cartItems.length === 0) {
      showToast("Your cart is empty", "error");
      setMobileTab("cart");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitBooking({
        userId: Number(user.id),
        userName: user.name,
        userEmail: user.email,
        userRole: user.role,
        phone: phone.trim(),
        location: location.trim(),
        address: address.trim(),
        items: cartItems,
        totalAmount: cartItems.reduce((sum, item) => sum + item.price, 0),
      });
      showToast("Request sent — waiting for admin approval", "success");
      setCartItems([]);
      setBookingsRefresh((k) => k + 1);
      setMobileTab("bookings");
    } catch (error) {
      console.error(error);
      const msg = getApiErrorMessage(error, "Could not submit booking");
      showToast(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatSend = async (message) => {
    setConversation((prev) => [...prev, { from: "user", text: message }]);
    try {
      const response = await sendChatMessage(message, user.id);
      setConversation((prev) => [...prev, { from: "assistant", text: response.answer }]);
    } catch {
      setConversation((prev) => [
        ...prev,
        { from: "assistant", text: "Sorry, I could not process that. Please try again." },
      ]);
    }
  };

  const handleUpgrade = async () => {
    try {
      const updated = await upgradeToSubscriber(user.id);
      setUser(updated);
      showToast("You are now a subscriber — enjoy member pricing!", "success");
      loadCatalog();
    } catch {
      showToast("Upgrade failed", "error");
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const showBrowse = mobileTab === "browse";
  const showBookings = mobileTab === "bookings";
  const showCart = mobileTab === "cart";
  const showHelp = mobileTab === "help";

  return (
    <div className="app-shell app-shell--premium">
      <div className="app-top">
        <AppHeader
          cartCount={cartItems.length}
          onCartClick={() => setMobileTab("cart")}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          user={user}
          onLogout={logout}
        />
        <LocationBar location={location} onLocationChange={setLocation} user={user} />
      </div>

      {showBrowse && (
        <section className="bento">
          <div className="bento__hero">
            <HeroCarousel onExplore={openBrowser} />
          </div>
          <div className="bento__side">
            <CategoryRail onSelect={openBrowser} compact />
            <OffersStrip offers={offers} userRole={user.role} onUpgrade={handleUpgrade} compact />
          </div>
          <div className="bento__featured">
            <FeaturedRow userRole={user.role} offers={offers} onBookItem={openBrowser} />
          </div>
        </section>
      )}

      {showHelp ? (
        <div className="workspace workspace--solo">
          <ChatWindow
            conversation={conversation}
            onSend={handleChatSend}
            userId={user.id}
            onHistoryLoaded={setConversation}
          />
        </div>
      ) : (
        <div className="workspace">
          <main
            className={`workspace__content ${
              !showBrowse && !showBookings ? "workspace__content--hidden-mobile" : ""
            }`}
          >
            {showBookings && (
              <section className="section-block">
                <h2 className="section-title">My bookings</h2>
                <p className="section-sub">Track approval status for your requests</p>
                <MyBookings refreshKey={bookingsRefresh} />
              </section>
            )}

            {showBrowse && (
              <>
                <section className="section-block">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">All services</h2>
                      <p className="section-sub">Tap a service to choose sub-options</p>
                    </div>
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => openBrowser(null)}>
                      View all
                    </button>
                  </div>
                  {servicesLoading ? (
                    <div className="services-grid services-grid--dense">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="service-card service-card--skeleton" aria-hidden="true" />
                      ))}
                    </div>
                  ) : filteredServices.length === 0 ? (
                    <p className="empty-state">No services match your search.</p>
                  ) : (
                    <ServicesGrid services={filteredServices} onServiceSelect={(s) => openBrowser(s.id)} />
                  )}
                </section>
                <Recommendations recommendations={recommendations} onSelect={(item) => openBrowser(item.id)} />
              </>
            )}
          </main>

          <aside
            className={`workspace__rail ${
              showCart ? "workspace__rail--visible-mobile" : "workspace__rail--hidden-mobile"
            } ${showBookings ? "workspace__rail--hidden-mobile" : ""}`}
          >
            <CartPanel
              cartItems={cartItems}
              onRemoveItem={handleRemoveFromCart}
              onCheckout={handleCheckout}
              isCheckingOut={isSubmitting}
              phone={phone}
              onPhoneChange={setPhone}
              address={address}
              onAddressChange={setAddress}
              location={location}
            />
          </aside>
        </div>
      )}

      {cartItems.length > 0 && showBrowse && (
        <div className="mobile-cart-bar">
          <div>
            <span className="mobile-cart-bar__label">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
            </span>
            <strong>₹{cartTotal}</strong>
          </div>
          <button type="button" className="btn btn--primary" onClick={() => setMobileTab("cart")}>
            View cart
          </button>
        </div>
      )}

      <MobileNav activeTab={mobileTab} onTabChange={setMobileTab} cartCount={cartItems.length} />

      {browserOpen && (
        <HierarchicalServiceBrowser
          initialServiceId={browserServiceId}
          userRole={user.role}
          offers={offers}
          onAddToCart={handleAddToCart}
          onClose={() => {
            setBrowserOpen(false);
            setBrowserServiceId(null);
          }}
        />
      )}

      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "info" })} />
    </div>
  );
}

function App() {
  const { user, authReady, setUser } = useUser();

  if (!authReady) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) return <LoginScreen onLogin={setUser} />;
  if (user.role === "admin") return <AdminDashboard />;
  return <CustomerApp />;
}

export default App;
