'use client';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Brand from '@/components/ui/Brand';
import copy from '@/content/copy.json';
import experience from '@/config/experience.json';
export default function Header() {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <a className="skip" href="#plataformas">
        {copy.header.skip}
      </a>
      <header>
        <div className="nav wrap">
          <Brand />
          <nav className={menu ? 'is-open' : ''} aria-label="Navegação principal">
            {experience.navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a className="button nav-cta" href="#plataformas">
            {copy.header.explore}
            <ArrowUpRight size={15} />
          </a>
          <button
            className="menu-button"
            aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
