import { useState } from "react";
import { LandingPage } from "@/components/landing/LandingPage";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { useNavigate } from 'react-router-dom';

const Index = () => {
   const navigate = useNavigate();
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
      if (showDashboard) {
      navigate("/dashboard");
    }
  }

  return <LandingPage onGetStarted={() => setShowDashboard(true)} />;
  // return <LandingPage onGetStarted={() => navigate('/dashboard')} />;
};

export default Index;
