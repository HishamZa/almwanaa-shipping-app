import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Globe } from 'lucide-react';
import { useTranslation, Language } from '../contexts/LanguageContext';

export function LanguageSelector() {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-slate-500" />
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className="w-32 h-9 text-sm border-slate-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t('common.english')}</SelectItem>
          <SelectItem value="ar">{t('common.arabic')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}