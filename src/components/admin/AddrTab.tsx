import{useState}from'react';
import{useLanguage}from'../../contexts/LanguageContext';
import{addr}from'../../utils/mockData';
import{Button}from'../ui/Button';
import{Trash2,MapPin,Mail,Phone,Clock}from'lucide-react';
export default function AddrTab(){
const{t,language}=useLanguage();
const[list,setList]=useState(addr.all());
const refresh=()=>setList(addr.all());
const doDel=(id:string)=>{addr.del(id);refresh()};
return(
<div className="space-y-4">
<h3 className="font-semibold text-slate-800">{t('nav.addr')}</h3>
<div className="space-y-3">{list.map(a=>(
<div key={a.id} className="bg-white rounded-xl border border-slate-200 p-5">
<div className="flex items-start gap-3">
<div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-blue-600"/></div>
<div className="flex-1 min-w-0">
<p className="font-semibold text-slate-800">{language==='ar'?a.nameAr:a.name}</p>
<p className="text-sm text-slate-600 mt-1">{language==='ar'?a.addressAr:a.address}</p>
<p className="text-xs text-slate-500 mt-0.5">{language==='ar'?a.cityAr:a.city}, {language==='ar'?a.countryAr:a.country}</p>
<div className="flex flex-wrap gap-3 mt-2">
<span className="flex items-center gap-1 text-xs text-slate-500"><Phone className="w-3 h-3"/>{a.phone}</span>
<span className="flex items-center gap-1 text-xs text-slate-500"><Mail className="w-3 h-3"/>{a.email}</span>
<span className="flex items-center gap-1 text-xs text-slate-500"><Clock className="w-3 h-3"/>{language==='ar'?a.workingHoursAr:a.workingHours}</span>
</div>
</div>
<Button size="sm" variant="destructive" onClick={()=>doDel(a.id)}><Trash2 className="w-3 h-3"/></Button>
</div>
</div>))}
</div>
</div>
);
}