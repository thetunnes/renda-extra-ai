# granaextracomia

Portal independente para comparar plataformas de contribuição para IA. Next.js, React e exportação estática; GitHub privado e hospedagem pública mantidos separadamente.

## Início

Requer Node.js 22.20+ e Python 3 para a verificação do HTML.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Para produção local: `npm run build` e `npm start`. Para hospedagem estática: `npm run build:export` gera `out/`. Depois da exportação, refaça `npm run build` antes de usar `npm start`.

## Customização e harness AI

- Marca e SEO: `config/brand.json`.
- Cores, fontes e dimensões: `config/theme.json`.
- Animações, hero e organização: `config/experience.json`.
- Textos e conteúdo: `content/`.
- Regras de negócio: `domain/`.
- Componentes por seção: `components/home/`; componentes compartilhados: `components/ui/`.

[Manual do harness](docs/harness/README.md) · [Receitas de customização](docs/harness/CUSTOMIZATION.md) · [Critérios de aceitação](docs/harness/EVALUATIONS.md) · [SEO](docs/SEO.md).

```sh
npm run theme     # Gera CSS após editar configurações visuais
npm run format    # Formata módulos e conteúdo
npm run check     # Validação + tema + formatação + tipos + testes
npm run verify    # Check + exportação + contrato SEO do HTML
```

O build valida os registros e gera o tema automaticamente. O workflow do GitHub executa `verify`. Leia `AGENTS.md` antes de alterações assistidas por IA. O harness não exige API de modelos ou segredos.
