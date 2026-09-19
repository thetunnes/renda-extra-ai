# Receitas de customização

## Marca e cores

1. Em `config/brand.json`, altere `name`, `description`, `seo`, `logo` e `favicon`. Nome e SEO são decisões diferentes: revise ambos. `{brand}` no FAQ é resolvido automaticamente.
2. Coloque a nova logo em `public/` e informe seu caminho com `/`, largura e altura intrínsecas. O tamanho visual fica em `styles/responsive.css`.
3. Em `config/theme.json`, comece por `primary`, `background`, `text`, `surface`, `accent`, `muted`, `border`, `focus`, `emphasis`, `panel` e `inverse`. `tone-*` mantém cores decorativas específicas; todos os valores de cor existentes estão centralizados nesse mapa.
4. Ajuste `typography.body`, `typography.heading`, `shape` e `layout` se necessário. Fontes externas precisam de implementação de carregamento separada; escrever um nome não instala uma fonte.
5. Execute `npm run theme`, `npm run format` e `npm run verify`. Confira contraste e telas pequenas. Não edite `styles/tokens.css`: ele é gerado.

O domínio `brand.url` é a origem canônica HTTPS sem barra final. Alterá-lo modifica canonical, sitemap e feeds; isso não registra domínio nem configura DNS ou redirecionamentos na hospedagem.

## Textos e padrões editoriais

`content/copy.json` agrupa textos por seção e por função: `eyebrow`, `title`, `description`, `primaryAction`, `empty`. Preserve chaves e altere valores. Onde houver `titleLine2` ou `titleEmphasis`, os segmentos correspondem à composição visual, não a novos títulos HTML.

O tom é direto, acolhedor e informativo. Use “contribuir”, “comparar” e “consultar requisitos”. Informe incerteza quando não houver evidência. Evite “renda garantida”, “pagamento certo” e “compatível com qualquer aparelho”. O aviso de indicação fica em `brand.affiliateDisclosure`; os textos de transparência e FAQ ficam no copy. Rótulos técnicos de requisitos e regras de seleção ficam nos módulos de domínio e componentes de detalhe.

## Imagens

Os campos `experience.images.hero`, `platform.image` e `guide.image` aceitam `null` para usar a ilustração/símbolo atual, ou:

```json
{
  "src": "/minha-imagem.webp",
  "alt": "Descrição útil do conteúdo da imagem",
  "width": 1200,
  "height": 800
}
```

Coloque o arquivo em `public/`. As dimensões devem refletir o arquivo real. Hero usa carregamento imediato; guias e marcas usam lazy loading. A validação rejeita imagens ausentes, sem alt, sem dimensões ou externas. Esse contrato não gera imagens nem adiciona automaticamente uma imagem social. Para fotografia, prefira WebP/AVIF e dimensões proporcionais ao uso. Preserve licenças de uso.

## Animações e organização

Em `config/experience.json`, `motion.enabled=false` desliga movimentos. `durationMs` controla transições e entrada; `hoverLiftPx` e `cardLiftPx` controlam deslocamentos. `entrance=true` ativa uma entrada discreta do hero. A preferência `prefers-reduced-motion` prevalece sempre. Não há animações contínuas.

`sections` permite reordenar as dez seções existentes, mantendo hero primeiro. Todas são obrigatórias para preservar links, avisos e conteúdo; esconder ou adicionar seções exige alterar explicitamente o registro em `components/Home.tsx` e o validador. `navigation` controla rótulos e âncoras existentes.

## Nova plataforma ou indicação

Duplique um registro de `content/platforms.json` e revise todos os campos. Use ID minúsculo com hífens, URL HTTPS, fontes, data real de revisão e `verification`. O catálogo, comparação, rotas, sitemap e feeds são derivados do mesmo registro. `mark` aceita `asterisk`, `audio` ou `initials`; `image` sobrescreve o símbolo. `color` aceita `violet`, `orange` ou `blue` (definições em estilos/tokens).

Use `taskDevices: []` e `verification: "unconfirmed"` quando os requisitos não forem confirmados. Não confundir disponibilidade de cadastro com elegibilidade. Uma nova categoria de tarefa precisa entrar em `domain/types.ts`, `domain/platforms.ts`, ícones e validador.

Altere somente `affiliateUrl` para trocar indicação. Valor vazio usa a URL oficial. Não altere `url` nem `deviceSources` para esconder a origem. O link de indicação do AI Hub atual é protegido por um teste; uma mudança autorizada desse link exige atualizar essa expectativa deliberadamente.

## Novo guia

Adicione um registro em `content/guides.json` com slug estável, título, texto original, categoria, data de revisão e ícone (`book`, `video`, `shield`). A imagem é opcional. Hoje o renderer usa parágrafos de texto simples; não cole HTML. Conteúdo longo ou com subtítulos exige expandir o modelo com blocos tipados, antes de alterar o renderer.

## Prompts úteis para agentes

- “Altere a marca em config/brand.json e os tokens semânticos em config/theme.json. Preserve regras de recomendação e links de indicação; execute a verificação e relate o que foi realmente validado.”
- “Adicione a plataforma X com estas fontes e requisitos confirmados. Sinalize informações ausentes; não infira dispositivos de tarefas a partir do acesso web.”
- “Atualize os textos da seção quiz em content/copy.json com tom direto, mantendo as ressalvas e o estado sem resultados.”
- “Ative uma entrada discreta do hero pelo contrato de motion e confira movimento reduzido e teclado.”
