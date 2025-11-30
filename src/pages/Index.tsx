import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { GardenInterface } from "@/components/GardenInterface";

const Index = () => {
  const [showGarden, setShowGarden] = useState(false);

  const handleEnterGarden = () => {
    setShowGarden(true);
  };

  const handleBackToLanding = () => {
    setShowGarden(false);
  };

  return (
    <>
      {!showGarden ? (
        <LandingPage onEnterGarden={handleEnterGarden} />
      ) : (
        <GardenInterface onBackToLanding={handleBackToLanding} />
      )}
    </>
  );
};

export default Index;
