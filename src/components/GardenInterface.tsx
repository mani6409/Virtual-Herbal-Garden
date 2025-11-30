import { useState } from "react";
import { SearchSection } from "./SearchSection";
import { PlantGrid } from "./PlantGrid";
import { PlantDetails } from "./PlantDetails";
import { SettingsPanel } from "./SettingsPanel";
import { useTextSize } from "@/contexts/TextSizeContext";
import { motion } from "framer-motion";

// Import plant images
import turmericImage from "@/assets/turmeric-plant.jpg";
import aloeVeraImage from "@/assets/aloe-vera-plant.jpg";
import gingerImage from "@/assets/ginger-plant.jpg";
import echinaceaImage from "@/assets/echinacea-plant.jpg";
import lavenderImage from "@/assets/lavender-plant.jpg";
import ginkgoImage from "@/assets/ginkgo-plant.jpg";
import ginsengImage from "@/assets/ginseng-plant.jpg";
import teaTreeImage from "@/assets/tea-tree-plant.jpg";
import chamomileImage from "@/assets/chamomile-plant.jpg";
import willowImage from "@/assets/willow-plant.jpg";

export interface HighlightedPart {
  part: string;
  position: { x: number; y: number };
  description: string;
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  description: string;
  medicinalUses: string[];
  activeCompounds: string[];
  diseases: string[];
  category: string;
  highlightedParts?: HighlightedPart[];
}

interface GardenInterfaceProps {
  onBackToLanding: () => void;
}

export const GardenInterface = ({ onBackToLanding }: GardenInterfaceProps) => {
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getTextSizeClass } = useTextSize();

  // Mock data for medicinal plants
  const mockPlants: Plant[] = [
    {
      id: "1",
      name: "Turmeric",
      scientificName: "Curcuma longa",
      image: turmericImage,
      description: "A flowering plant in the ginger family, known for its powerful anti-inflammatory and antioxidant properties.",
      medicinalUses: ["Anti-inflammatory", "Antioxidant", "Pain relief", "Digestive aid"],
      activeCompounds: ["Curcumin", "Turmerone", "Zingiberene"],
      diseases: ["Arthritis", "Digestive issues", "Wound healing", "Inflammation"],
      category: "Spice",
      highlightedParts: [
        { part: "Rhizome/Root", position: { x: 30, y: 70 }, description: "The underground stem (rhizome) contains the highest concentration of curcumin, the main active compound. Used in traditional medicine for reducing inflammation and treating digestive disorders." }
      ]
    },
    {
      id: "2",
      name: "Aloe Vera",
      scientificName: "Aloe barbadensis",
      image: aloeVeraImage,
      description: "A succulent plant known for its soothing and healing gel contained within its thick, fleshy leaves.",
      medicinalUses: ["Skin healing", "Burns treatment", "Moisturizing", "Anti-inflammatory"],
      activeCompounds: ["Aloin", "Acemannan", "Anthraquinones"],
      diseases: ["Burns", "Eczema", "Dry skin", "Minor cuts"],
      category: "Succulent",
      highlightedParts: [
        { part: "Leaf Gel", position: { x: 50, y: 40 }, description: "The clear gel inside the leaves contains acemannan and other compounds that provide healing, moisturizing, and anti-inflammatory effects for skin conditions." }
      ]
    },
    {
      id: "3",
      name: "Ginger",
      scientificName: "Zingiber officinale",
      image: gingerImage,
      description: "A flowering plant whose rhizome is widely used as a spice and folk medicine for digestive issues.",
      medicinalUses: ["Nausea relief", "Digestive aid", "Anti-inflammatory", "Motion sickness"],
      activeCompounds: ["Gingerol", "Shogaol", "Zingerone"],
      diseases: ["Nausea", "Motion sickness", "Arthritis", "Digestive disorders"],
      category: "Spice",
      highlightedParts: [
        { part: "Rhizome", position: { x: 40, y: 65 }, description: "The underground rhizome contains gingerol and other bioactive compounds that help with nausea, digestion, and reducing inflammation." }
      ]
    },
    {
      id: "4",
      name: "Echinacea",
      scientificName: "Echinacea purpurea",
      image: echinaceaImage,
      description: "A group of herbaceous flowering plants known for boosting immune system function.",
      medicinalUses: ["Immune booster", "Cold prevention", "Anti-viral", "Wound healing"],
      activeCompounds: ["Echinacoside", "Chicoric acid", "Alkamides"],
      diseases: ["Common cold", "Flu", "Upper respiratory infections", "Immune deficiency"],
      category: "Herb",
      highlightedParts: [
        { part: "Roots", position: { x: 50, y: 80 }, description: "The roots contain the highest concentration of immune-boosting compounds like echinacoside and alkamides." },
        { part: "Flowers", position: { x: 50, y: 20 }, description: "Purple flowers contain chicoric acid and other compounds that support immune function and have anti-viral properties." }
      ]
    },
    {
      id: "5",
      name: "Lavender",
      scientificName: "Lavandula angustifolia",
      image: lavenderImage,
      description: "An aromatic flowering plant known for its calming and relaxing properties.",
      medicinalUses: ["Anxiety relief", "Sleep aid", "Antiseptic", "Pain relief"],
      activeCompounds: ["Linalool", "Linalyl acetate", "Camphor"],
      diseases: ["Insomnia", "Anxiety", "Minor burns", "Headaches"],
      category: "Herb",
      highlightedParts: [
        { part: "Flowers", position: { x: 50, y: 25 }, description: "The purple flower spikes contain essential oils rich in linalool and linalyl acetate, providing calming and antiseptic effects." }
      ]
    },
    {
      id: "6",
      name: "Ginkgo",
      scientificName: "Ginkgo biloba",
      image: ginkgoImage,
      description: "An ancient tree species whose leaves are used to improve cognitive function and circulation.",
      medicinalUses: ["Memory enhancement", "Circulation improvement", "Antioxidant", "Cognitive support"],
      activeCompounds: ["Ginkgolides", "Bilobalide", "Flavonoids"],
      diseases: ["Memory loss", "Poor circulation", "Dementia", "Vertigo"],
      category: "Tree",
      highlightedParts: [
        { part: "Leaves", position: { x: 45, y: 35 }, description: "Fan-shaped leaves contain ginkgolides and flavonoids that improve blood circulation and support brain function." }
      ]
    },
    {
      id: "7",
      name: "Ginseng",
      scientificName: "Panax ginseng",
      image: ginsengImage,
      description: "A slow-growing perennial plant with fleshy roots, prized for its energy-boosting properties.",
      medicinalUses: ["Energy booster", "Stress relief", "Immune support", "Cognitive enhancement"],
      activeCompounds: ["Ginsenosides", "Polysaccharides", "Peptides"],
      diseases: ["Fatigue", "Stress", "Erectile dysfunction", "Diabetes"],
      category: "Herb",
      highlightedParts: [
        { part: "Root", position: { x: 50, y: 75 }, description: "The fleshy root contains ginsenosides, the primary active compounds responsible for ginseng's adaptogenic and energy-boosting effects." }
      ]
    },
    {
      id: "8",
      name: "Tea Tree",
      scientificName: "Melaleuca alternifolia",
      image: teaTreeImage,
      description: "A small tree native to Australia, whose oil has powerful antimicrobial properties.",
      medicinalUses: ["Antimicrobial", "Antifungal", "Antiseptic", "Acne treatment"],
      activeCompounds: ["Terpinen-4-ol", "α-Terpineol", "γ-Terpinene"],
      diseases: ["Acne", "Fungal infections", "Cuts", "Dandruff"],
      category: "Tree",
      highlightedParts: [
        { part: "Leaves", position: { x: 55, y: 40 }, description: "The narrow leaves contain essential oils rich in terpinen-4-ol, providing strong antimicrobial and antifungal properties." }
      ]
    },
    {
      id: "9",
      name: "Chamomile",
      scientificName: "Matricaria chamomilla",
      image: chamomileImage,
      description: "A daisy-like flowering plant known for its calming and anti-inflammatory properties.",
      medicinalUses: ["Calming", "Anti-inflammatory", "Digestive aid", "Sleep inducer"],
      activeCompounds: ["Chamazulene", "Apigenin", "Bisabolol"],
      diseases: ["Insomnia", "Anxiety", "Digestive issues", "Skin irritation"],
      category: "Herb",
      highlightedParts: [
        { part: "Flowers", position: { x: 50, y: 30 }, description: "The white and yellow flowers contain chamazulene and apigenin, compounds that provide calming and anti-inflammatory effects." }
      ]
    },
    {
      id: "10",
      name: "Willow Bark",
      scientificName: "Salix alba",
      image: willowImage,
      description: "The bark of the white willow tree, historically used as a natural pain reliever.",
      medicinalUses: ["Pain relief", "Anti-inflammatory", "Fever reducer", "Headache treatment"],
      activeCompounds: ["Salicin", "Tannins", "Flavonoids"],
      diseases: ["Headaches", "Back pain", "Arthritis", "Fever"],
      category: "Tree",
      highlightedParts: [
        { part: "Bark", position: { x: 35, y: 50 }, description: "The inner bark contains salicin, which the body converts to salicylic acid (similar to aspirin), providing natural pain relief and anti-inflammatory effects." }
      ]
    }
  ];

  const handleSearch = async (query: string, searchType: 'plant' | 'disease') => {
    setIsLoading(true);
    setSearchQuery(query);
    
    // Simulate API call
    setTimeout(() => {
      if (searchType === 'plant') {
        const results = mockPlants.filter(plant => 
          plant.name.toLowerCase().includes(query.toLowerCase()) ||
          plant.scientificName.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
      } else {
        const results = mockPlants.filter(plant =>
          plant.diseases.some(disease => 
            disease.toLowerCase().includes(query.toLowerCase())
          )
        );
        setSearchResults(results);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handlePlantSelect = (plant: Plant) => {
    setSelectedPlant(plant);
  };

  const handleBackToResults = () => {
    setSelectedPlant(null);
  };

  const handleBackToLanding = () => {
    onBackToLanding();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Settings Panel with Navigation */}
      <SettingsPanel 
        showHomeButton={true}
        showBackButton={selectedPlant !== null}
        onHome={handleBackToLanding}
        onBack={selectedPlant ? handleBackToResults : undefined}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 text-scalable-3xl`}>
            Virtual Herbal Garden
          </h1>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto text-scalable ${getTextSizeClass()}`}>
            Explore our collection of medicinal plants and discover their healing properties
          </p>
        </motion.div>

        {!selectedPlant ? (
          <>
            {/* Search Section */}
            <SearchSection onSearch={handleSearch} isLoading={isLoading} />

            {/* Results */}
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <PlantGrid 
                  plants={searchResults}
                  onPlantSelect={handlePlantSelect}
                  searchQuery={searchQuery}
                />
              </motion.div>
            )}

            {/* Welcome Message */}
            {searchResults.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center py-20"
              >
                <div className="bg-gradient-card rounded-2xl p-12 shadow-card-soft border border-border/50">
                  <h3 className={`text-2xl font-semibold text-foreground mb-4 text-scalable-xl`}>
                    Welcome to Our Digital Botanical Library
                  </h3>
                  <p className={`text-muted-foreground text-lg text-scalable ${getTextSizeClass()}`}>
                    Start your journey by searching for specific plants or explore remedies for various health conditions
                  </p>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <PlantDetails 
            plant={selectedPlant}
            onBack={handleBackToResults}
          />
        )}
      </motion.div>
    </div>
  );
};