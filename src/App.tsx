import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ModalQr } from './components/ModalQr';
import { ModalTour } from './components/ModalTour';
import { Toast } from './components/Toast';

// Screens
import { Home } from './pages/Home';
import { ProductsList } from './pages/ProductsList';
import { ProductDetail } from './pages/ProductDetail';
import { GardensList } from './pages/GardensList';
import { GardenProfile } from './pages/GardenProfile';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { QuickPost } from './pages/QuickPost';
import { OrderManagement } from './pages/OrderManagement';
import { LiveStream } from './pages/LiveStream';
import { EcoMap } from './pages/EcoMap';
import { YouthHonor } from './pages/YouthHonor';
import { AdminUsers } from './pages/AdminUsers';

export const App: React.FC = () => {
  const { activeScreen, currentRole } = useApp();

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <Home />;
      case 'products':
        return <ProductsList />;
      case 'product_detail':
        return <ProductDetail />;
      case 'gardens':
        return <GardensList />;
      case 'garden':
        return <GardenProfile />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'quick_post':
        return <QuickPost />;
      case 'orders':
        return <OrderManagement />;
      case 'live':
        return <LiveStream />;
      case 'map':
        return <EcoMap />;
      case 'volunteer':
        return <YouthHonor />;
      case 'admin_users':
        return <AdminUsers />;
      default:
        return <Home />;
    }
  };

  const isElderlyFarmer = currentRole === 'farmer';

  return (
    <div className={`min-h-screen flex flex-col bg-cream text-ink font-sans selection:bg-green-100 selection:text-green-800 ${
      isElderlyFarmer ? 'text-lg md:text-xl' : ''
    }`}>
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:py-10">
        {renderActiveScreen()}
      </main>
      <Footer />

      {/* Global Modals & Notifications */}
      <ModalQr />
      <ModalTour />
      <Toast />
    </div>
  );
};
