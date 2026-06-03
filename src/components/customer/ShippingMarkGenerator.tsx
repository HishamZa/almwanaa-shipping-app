import { useState, useRef } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Download, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { User } from '../../types';

interface ShippingMarkGeneratorProps {
  user: User;
  userAddress?: string; // Optional override if address is stored separately
}

export function ShippingMarkGenerator({ user, userAddress }: ShippingMarkGeneratorProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Determine the address to use
  const displayAddress = userAddress || user.address || 'No address provided';

  const generateShippingMark = () => {
    setIsGenerating(true);
    
    // Use a slight delay to allow the UI to show loading state
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        setIsGenerating(false);
        return;
      }

      // Set dimensions (High resolution for better quality)
      const width = 800;
      const height = 400;
      canvas.width = width;
      canvas.height = height;

      // Draw Background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Text Configuration
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000000';
      
      // Increased Font Size for better visibility
      const fontSize = 50;
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;

      // 1. Company Name (Top)
      ctx.fillText('Almwanaa Co', width / 2, 120);

      // 2. Customer Name (Middle)
      ctx.fillText(user.name || user.username, width / 2, 190);

      // 3. Address (Bottom)
      const maxWidth = width - 100;
      const words = displayAddress.split(' ');
      let line = '';
      let y = 260;
      
      // Simple word wrap logic
      for(let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, width / 2, y);
          line = words[n] + ' ';
          y += fontSize + 10; // Add line height based on font size
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, width / 2, y);

      // Convert to Image URL
      const dataUrl = canvas.toDataURL('image/png');
      setImageUrl(dataUrl);
      setIsGenerating(false);
    }, 100);
  };

  const downloadImage = () => {
    if (!imageUrl) return;

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `shipping-mark-${user.username || 'user'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <ImageIcon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">Shipping Mark Generator</CardTitle>
            <CardDescription>Generate and download your official shipping label</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={generateShippingMark} 
              disabled={isGenerating}
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white h-11"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Generate Mark
                </>
              )}
            </Button>
            
            {imageUrl && (
              <Button 
                onClick={downloadImage}
                variant="outline"
                className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 h-11"
              >
                <Download className="h-4 w-4 mr-2" />
                Save to Gallery
              </Button>
            )}
          </div>

          {/* Preview Area */}
          {imageUrl ? (
            <div className="space-y-3 animate-in fade-in zoom-in duration-300">
              <div className="text-sm font-medium text-slate-500 text-center">Preview</div>
              <div className="relative bg-slate-100 rounded-xl p-4 border-2 border-dashed border-slate-300 flex justify-center">
                <img 
                  src={imageUrl} 
                  alt="Shipping Mark Preview" 
                  className="max-w-full h-auto rounded shadow-md border border-slate-200"
                  style={{ maxHeight: '300px' }}
                />
              </div>
              <p className="text-xs text-center text-slate-400">
                This image contains your shipping details. Tap "Save to Gallery" to download it to your device.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                <ImageIcon className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-600">No mark generated yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Click "Generate Mark" to create your shipping label image.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}