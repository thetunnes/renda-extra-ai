# Harness de desenvolvimento assistido por IA

Este harness é a estrutura de trabalho do portal granaextracomia: contexto para agentes, limites de arquitetura, configurações editáveis, regras executáveis e verificações. Não inclui um chatbot, API de modelos ou credenciais. O único recurso de interação com agentes no navegador é o filtro WebMCP progressivo já existente, isolado em `hooks/usePlatformTools.ts` e desativável.

## Mapa de decisões

| Alteração                                           | Fonte de verdade                     | Verificação                             |
| --------------------------------------------------- | ------------------------------------ | --------------------------------------- |
| Nome, logo, favicon, domínio e SEO inicial          | `config/brand.json`                  | Conteúdo, assets e SEO exportado        |
| Cores, fontes, largura, bordas                      | `config/theme.json`                  | Geração de tokens e inspeção visual     |
| Animações, imagem hero, ordem das seções, navegação | `config/experience.json`             | Validação, teclado e movimento reduzido |
| Títulos, CTAs, FAQ, passos, transparência           | `content/copy.json`                  | TypeScript e revisão editorial          |
| Plataformas, indicação, dispositivos, fontes        | `content/platforms.json`             | Regras de domínio e testes              |
| Guias, datas, ícones, imagens                       | `content/guides.json`                | Validação, rotas, feeds e sitemap       |
| Elegibilidade, filtro, destino afiliado             | `domain/platforms.ts`                | `tests/domain.test.mjs`                 |
| HTML, metadados, exportação                         | `app/`, `lib/seo.ts`, `lib/feeds.ts` | `scripts/check-seo.py`                  |

## Fluxo de uma alteração

1. Ler `AGENTS.md` e localizar a fonte da mudança na tabela. Para APIs Next, ler a documentação instalada indicada em AGENTS.
2. Descrever objetivo, critérios observáveis e informações ainda não confirmadas. Não preencher lacunas com suposições comerciais.
3. Editar a configuração ou o módulo responsável. Uma alteração editorial não deve exigir mexer em regras de recomendação.
4. Executar `npm run theme` após mudar tokens; `npm run format` após editar código ou conteúdo.
5. Executar `npm run verify`: configurações, tema sincronizado, formatação, TypeScript, testes de domínio, exportação e SEO.
6. Para alterações visuais, conferir 390px e desktop, navegação por teclado, contraste e movimento reduzido. Os testes automáticos não medem contraste nem aparência.
7. Revisar o diff, registrar commit e publicar pelo fluxo da hospedagem existente quando a tarefa incluir a aplicação. Registrar o resultado e qualquer limitação real.

O workflow `.github/workflows/quality.yml` repete a verificação em pull requests e pushes para main. Não publica nem recebe credenciais de hospedagem. A execução remota depende do GitHub Actions estar habilitado; o resultado local não prova execução remota.

## Arquitetura

```text
config/ + content/ → lib/site.ts / lib/content.ts → páginas e feeds
                           ↓
                    domain/ (regras puras)
                           ↓
components/Home.tsx (composição server) → components/home/ (seções)
                                              ↓
                                    components/ui/ (primitivos)
config/theme.json + experience.json → scripts/theme.mjs → styles/tokens.css
```

`Home` compõe as seções no servidor. Menu, catálogo e questionário mantêm estado local em componentes client. O modal nativo concentra foco, Escape, fechamento e restauração do foco. `PlatformLink` aplica a regra de destino e `rel`; fontes oficiais continuam apontando para a fonte, não para indicação. `Brand` compartilha a identidade entre cabeçalhos e rodapés.

Os arquivos `lib/site.ts` e `lib/content.ts` são fachadas para compatibilidade com páginas e feeds. Os JSONs passam por validação antes de desenvolvimento e builds. Os tipos do domínio orientam a implementação; a validação de dados é necessária porque JSON não tem unions TypeScript em tempo de execução.

## Invariantes do produto

- Portal de curadoria, não empregador nem processador de pagamentos.
- Nenhuma promessa de renda, vaga, aprovação ou saque. Exibir incertezas e fontes.
- `taskDevices` contém somente dispositivos confirmados para tarefas; acesso web é outra informação.
- Plataformas `unconfirmed` permanecem no catálogo, mas não entram nas recomendações. A recomendação ainda exige conferir modelo, região e condições diretamente na plataforma.
- Comissão nunca ordena nem seleciona resultados. Usar indicação quando configurada e fonte oficial quando vazia. Preservar o código fornecido pelo proprietário.
- IDs e slugs públicos são estáveis. Remoções/migrações requerem tratamento deliberado dos links anteriores.
- Metadados e feeds refletem os registros visíveis. Não inventar ratings, autores, datas ou atualização automática de fontes.
- Imagens locais com dimensões e texto alternativo. Não usar URLs arbitrárias como código ou HTML.
- Conteúdo permanece legível em HTML sem JavaScript. Respeitar a preferência de movimento reduzido.

## Limites deliberados

Não há CMS administrativo, banco de dados ou editor visual. A customização é feita em arquivos versionados, com validação antes da publicação. Não há rastreamento de cliques ou armazenamento de respostas do questionário. Cores decorativas existentes foram preservadas como tokens `tone-*`; os tokens semânticos são a entrada recomendada para rebranding. Logo SVG e favicon têm cores próprias e devem ser trocados ou editados junto da marca.

As fontes e descrições existentes foram preservadas nesta refatoração, não novamente pesquisadas. Validar URL e presença de fonte não comprova a verdade de uma afirmação. Revisão editorial e checagem de fontes continuam necessárias.

Veja [receitas de customização](CUSTOMIZATION.md) e [critérios de aceitação](EVALUATIONS.md).
