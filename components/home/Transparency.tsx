import { ShieldCheck } from 'lucide-react';
import copy from '@/content/copy.json';
export default function Transparency() {
  return (
    <>
      <section className="transparency wrap">
        <div className="transparency-title">
          <ShieldCheck size={26} />
          <h2>
            {copy.transparency.title}
            <br />
            {copy.transparency.titleLine2}
          </h2>
        </div>
        <div className="transparency-grid">
          {copy.transparency.items.map(([t, d]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
