import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Sun, Moon, Type, Home, ArrowLeft, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useTextSize } from "@/contexts/TextSizeContext";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsPanelProps {
  showHomeButton?: boolean;
  showBackButton?: boolean;
  onHome?: () => void;
  onBack?: () => void;
}

export const SettingsPanel = ({ 
  showHomeButton = false, 
  showBackButton = false, 
  onHome, 
  onBack 
}: SettingsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { textSize, setTextSize } = useTextSize();

  const textSizeOptions = [
    { value: 'small', label: 'Small', class: 'text-sm' },
    { value: 'medium', label: 'Medium', class: 'text-base' },
    { value: 'large', label: 'Large', class: 'text-lg' },
    { value: 'extra-large', label: 'Extra Large', class: 'text-xl' }
  ] as const;

  return (
    <>
      {/* Fixed Settings Button */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Navigation Buttons */}
        {showHomeButton && (
          <Button
            onClick={onHome}
            variant="outline"
            size="icon"
            className="bg-background/90 backdrop-blur-md shadow-garden border-border/50 hover:shadow-glow transition-all duration-300"
          >
            <Home className="w-4 h-4" />
          </Button>
        )}
        
        {showBackButton && (
          <Button
            onClick={onBack}
            variant="outline"
            size="icon"
            className="bg-background/90 backdrop-blur-md shadow-garden border-border/50 hover:shadow-glow transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}

        {/* Settings Toggle */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="icon"
          className="bg-background/90 backdrop-blur-md shadow-garden border-border/50 hover:shadow-glow transition-all duration-300"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Settings Card */}
            <motion.div
              initial={{ opacity: 0, x: 300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed top-4 right-4 z-50"
            >
              <Card className="w-80 bg-background/95 backdrop-blur-md shadow-garden border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Settings
                    </CardTitle>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Theme Toggle */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">Theme</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setTheme('light')}
                        variant={theme === 'light' ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1"
                      >
                        <Sun className="w-3 h-3 mr-1" />
                        Light
                      </Button>
                      <Button
                        onClick={() => setTheme('dark')}
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1"
                      >
                        <Moon className="w-3 h-3 mr-1" />
                        Dark
                      </Button>
                    </div>
                  </div>

                  {/* Text Size */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Type className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">Text Size</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {textSizeOptions.map((option) => (
                        <Button
                          key={option.value}
                          onClick={() => setTextSize(option.value)}
                          variant={textSize === option.value ? 'default' : 'outline'}
                          size="sm"
                          className={`${option.class} transition-all duration-200`}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Current Settings Display */}
                  <div className="pt-3 border-t border-border/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current:</span>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="capitalize">
                          {theme}
                        </Badge>
                        <Badge variant="secondary" className="capitalize">
                          {textSize.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};