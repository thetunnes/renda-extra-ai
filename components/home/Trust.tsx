import { ShieldCheck, SlidersHorizontal, Globe2, CheckCheck } from 'lucide-react';
import copy from '@/content/copy.json';
export default function Trust() {
  return (
    <>
      <div className="trust-strip">
        <div className="wrap">
          <span>
            <CheckCheck size={18} />
            {copy.trust.Curadoria_independente}
          </span>
          <span>
            <SlidersHorizontal size={17} />
            {copy.trust.Compare_antes_de_escolher}
          </span>
          <span>
            <ShieldCheck size={18} />
            {copy.trust.Sem_promessas_de_renda}
          </span>
          <span>
            <Globe2 size={18} />
            {copy.trust.Pensado_para_o_Brasil}
          </span>
        </div>
      </div>
    </>
  );
}
