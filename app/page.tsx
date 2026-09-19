import Home from '@/components/Home';
import { platforms, site } from '@/lib/site';
import { absoluteUrl, jsonLd, pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Renda extra com IA: compare plataformas e requisitos','Conheça Hub, Crowtado e Invent Money. Compare tarefas, celulares compatíveis e condições para contribuir com o treinamento de inteligência artificial.','/');
export default function Page(){
 const data={'@context':'https://schema.org','@graph':[
 {'@type':'Organization','@id':absoluteUrl('/#organization'),name:site.name,url:site.url,logo:absoluteUrl(site.logo)},
 {'@type':'WebSite','@id':absoluteUrl('/#website'),name:site.name,url:site.url,inLanguage:'pt-BR',publisher:{'@id':absoluteUrl('/#organization')}},
 {'@type':'CollectionPage','@id':absoluteUrl('/#page'),name:'Renda extra com IA: compare plataformas e requisitos',url:absoluteUrl('/'),isPartOf:{'@id':absoluteUrl('/#website')},mainEntity:{'@type':'ItemList',itemListElement:platforms.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.name,url:absoluteUrl(`/plataformas/${p.id}/`)}))}}
 ]};return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(data)}}/><Home/></>;
}
