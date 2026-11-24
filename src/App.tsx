import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ModalQr } from './components/ModalQr';
import { ModalTour } from './components/ModalTour';
import { Toast } from './components/Toast';

// 10 Screens
import { Home } from './pages/Home';
import { GardenProfile } from './pages/GardenProfile';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { QuickPost } from './pages/QuickPost';
import { OrderManagement } from './pages/OrderManagement';
import { LiveStream } from './pages/LiveStream';
import { EcoMap } from './pages/EcoMap';
import { YouthHonor } from './pages/YouthHonor';

export const App: React.FC = () => {
  const { activeScreen } = useApp();

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <Home />;
      case 'garden':
        return <GardenProfile />;
      case 'product_detail':
        return <ProductDetail />;
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
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink font-sans selection:bg-green-100 selection:text-green-800">
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
