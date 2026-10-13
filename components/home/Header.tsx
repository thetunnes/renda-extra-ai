'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X, Pause, Play } from 'lucide-react';
import Brand from '@/components/ui/Brand';
import copy from '@/content/copy.json';
import experience from '@/config/experience.json';
export default function Header() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('');
  const [paused, setPaused] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-15% 0px -60% 0px' },
    );
    for (const [, id] of experience.navigation) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused || !experience.motion.enabled ? 'off' : 'on';
    return () => {
      document.documentElement.dataset.motion = experience.motion.enabled ? 'on' : 'off';
    };
  }, [paused]);
  return (
    <>
      <a className="skip" href="#plataformas">
        {copy.header.skip}
      </a>
      <header
        onKeyDown={(e) => {
          if (e.key === 'Escape' && menu) {
            setMenu(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="nav wrap">
          <Brand />
          <nav
            id="main-navigation"
            className={menu ? 'is-open' : ''}
            aria-label="Navegação principal"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setMenu(false);
                menuButton.current?.focus();
              }
            }}
          >
            {experience.navigation.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? 'location' : undefined}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            className="motion-toggle"
            aria-label={paused ? copy.header.resumeMotion : copy.header.pauseMotion}
            title={paused ? copy.header.resumeMotion : copy.header.pauseMotion}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
            disabled={!experience.motion.enabled}
          >
            {paused ? <Play size={17} /> : <Pause size={17} />}
          </button>
          <a className="button nav-cta" href="#plataformas">
            {copy.header.explore}
            <ArrowUpRight size={15} />
          </a>
          <button
            className="menu-button"
            ref={menuButton}
            aria-controls="main-navigation"
            aria-label={menu ? copy.header.menuClose : copy.header.menuOpen}
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
