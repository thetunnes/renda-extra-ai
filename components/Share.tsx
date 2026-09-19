'use client';
import { useState } from 'react';
export default function Share({title,url}:{title:string;url:string}){
 const [status,setStatus]=useState('');
 async function share(){try{if(navigator.share){await navigator.share({title,url});setStatus('');}else if(navigator.clipboard){await navigator.clipboard.writeText(url);setStatus('Link copiado.');}else{setStatus(`Copie o endereço: ${url}`);}}catch(e){if((e as Error).name!=='AbortError')setStatus(`Copie o endereço: ${url}`);}}
 return <div className="share-control"><button className="button" onClick={share}>Compartilhar página ↗</button><span role="status">{status}</span></div>;
}
