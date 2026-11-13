import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { SeasonalCareSection } from './components/SeasonalCareSection';
import { ResultsSection } from './components/ResultsSection';
import { EstimateSection } from './components/EstimateSection';
import { Footer } from './components/Footer';
import type { PropertyType, SeasonId } from './data/servicesData';

export default function App() {
  const [propertyType, setPropertyType] = useState<PropertyType>('residential');
  const [selectedServices, setSelectedServices] = useState<string[]>(['concrete']);
  const [activeSeason, setActiveSeason] = useState<SeasonId>('spring');

  const scrollToEstimate = () => {
    const el = document.getElementById('estimate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleAddServiceToEstimate = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev : [...prev, serviceId]
    );
    if (serviceId === 'commercial') {
      setPropertyType('commercial');
    }
    scrollToEstimate();
  };

  const handleApplySeasonToEstimate = (season: SeasonId, serviceIds: string[]) => {
    setActiveSeason(season);
    setSelectedServices(serviceIds);
    if (season === 'winter' && serviceIds.includes('commercial')) {
      setPropertyType('commercial');
    }
    scrollToEstimate();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onNavigateEstimate={scrollToEstimate} />
      <main className="flex-1">
        <Hero onNavigateEstimate={scrollToEstimate} />
        <ServicesSection
          selectedServices={selectedServices}
          onAddServiceToEstimate={handleAddServiceToEstimate}
        />
        <SeasonalCareSection
          activeSeason={activeSeason}
          onSelectSeason={setActiveSeason}
          onApplySeasonToEstimate={handleApplySeasonToEstimate}
        />
        <ResultsSection />
        <EstimateSection
          propertyType={propertyType}
          onChangePropertyType={setPropertyType}
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          selectedSeason={activeSeason}
          onChangeSeason={setActiveSeason}
        />
      </main>
      <Footer />
    </div>
  );
}
