# Avaliação e plano de SEO — 19/09/2026

## Diagnóstico

O site já apresentava conteúdo no HTML, identidade consistente, fontes oficiais e avisos sobre ganhos. Porém, plataformas e guias abriam somente em janelas: faltavam URLs próprias para indexação e compartilhamento. Não havia canonical, sitemap, feeds ou metadados sociais completos. A avaliação é técnica; não foi atribuído um score nem medido tráfego, posições, Core Web Vitals ou indexação real.

## P0 — implementado

- Sete páginas com HTML pré-renderizado: início, três plataformas e três guias. Links normais permitem descoberta sem executar interações.
- Títulos e descrições individuais; canonical absoluto; idioma pt-BR; URLs consistentes com barra final.
- Open Graph e Twitter Cards com título e descrição. Compartilhamento nativo com alternativa de copiar link. Uma imagem social personalizada ainda pode ser criada; esta entrega não promete cards com imagem.
- Sitemap XML e robots.txt acessíveis; nenhuma regra intencional bloqueia indexação.
- RSS 2.0 e JSON Feed 1.1, descobertos no cabeçalho HTML e no rodapé. Contêm os seis conteúdos e IDs canônicos estáveis.
- JSON-LD WebSite, Organization, CollectionPage/ItemList, BreadcrumbList e Article conforme o conteúdo visível. Sem notas, avaliações ou rendimentos inventados.
- Fontes, autoria editorial da marca, ressalvas e datas visíveis; requisitos de equipamentos preservados.
- Índice llms.txt experimental. Não é requisito do Google nem garantia de leitura ou citação por IA. O trabalho principal para IA é disponibilizar conteúdo confiável em HTML com links e fontes.

## P1 — próximos passos

1. Verificar a propriedade no Google Search Console e enviar `/sitemap.xml`. Depende da conta do proprietário e do método de verificação disponível. Acompanhar indexação das sete páginas e problemas detectados; sitemap não garante indexação.
2. Ampliar os guias, hoje curtos, com exemplos originais, processo editorial e dúvidas reais. Manter somente requisitos e condições sustentados por fontes. Evitar páginas repetidas apenas para palavras-chave.
3. Medir PageSpeed Insights e Core Web Vitals em mobile e desktop. Priorizar melhorias com dados; não há medição de desempenho nesta avaliação.
4. Criar imagem social e validar prévias em redes escolhidas. Metadados não controlam integralmente a apresentação de cada aplicativo.
5. Considerar domínio próprio para continuidade da marca. Ao migrar, atualizar `site.url` em `lib/site.ts`, redirecionar URLs antigas quando a hospedagem permitir e reenviar sitemap.

## Manutenção e validação

Atualizar as datas somente quando houver revisão real. Os feeds derivam dos mesmos registros das páginas; novos conteúdos devem ter slug estável, fonte e descrição útil. O sitemap não inclui feeds, arquivos técnicos ou páginas de erro.

Executar `npm run build:export` e `python3 scripts/check-seo.py`. O teste lê o HTML exportado sem JavaScript e verifica URLs, metadados únicos, JSON-LD válido, links internos, sitemap, robots e feeds. Ele não substitui o Search Console ou a validação visual das redes sociais.

Não há garantia de posição no Google, Discover ou respostas de IA. Nenhuma configuração especial de schema ou arquivo para IA é necessária para os recursos de IA do Google.

## Referências

- [Google: recursos de IA e seu site](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: SEO para desenvolvedores](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [JSON Feed 1.1](https://www.jsonfeed.org/version/1.1/)
