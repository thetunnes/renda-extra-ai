import { guides } from './content';
import { platforms,site } from './site';
import { absoluteUrl } from './seo';
export const feedEntries=[...platforms.map(p=>({id:absoluteUrl(`/plataformas/${p.id}/`),title:`${p.name}: como funciona e requisitos`,text:`${p.description}\nDispositivos: ${p.supportedModels}\nEquipamento: ${p.equipment}\nGanhos e tarefas não são garantidos. Consulte a fonte oficial: ${p.url}`,updatedAt:site.updatedAt})),...guides.map(g=>({id:absoluteUrl(`/guias/${g.slug}/`),title:g.title,text:g.text,updatedAt:g.updatedAt}))];
export const xml=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
