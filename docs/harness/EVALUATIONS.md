# Critérios de aceitação do harness

| Cenário                                       | Resultado esperado                                                 | Cobertura                    |
| --------------------------------------------- | ------------------------------------------------------------------ | ---------------------------- |
| Visitante só tem computador                   | Nenhuma compatibilidade inventada                                  | Teste de domínio             |
| Visitante prefere áudio no celular            | Crowtado entre os registros atuais                                 | Teste de domínio             |
| Plataforma sem requisitos confirmados         | Visível no catálogo, ausente da recomendação                       | Teste de domínio             |
| Comissão alterada                             | Mesma seleção e ordem                                              | Teste de domínio             |
| Indicação vazia                               | URL oficial e ausência de sponsored                                | Regra/teste de destino       |
| Link executável ou entrada inválida de agente | Rejeição                                                           | Teste de domínio             |
| ID duplicado, fonte ausente, data impossível  | Falha antes da publicação                                          | Validador e testes negativos |
| Imagem ausente, externa, sem alt ou dimensões | Falha de configuração                                              | Validador                    |
| Nova marca/plataforma ou reordenação          | Contratos continuam válidos                                        | Teste de customização        |
| CSS gerado desatualizado                      | Check falha com instrução de geração                               | theme --check                |
| Novo conteúdo                                 | Rota, canonical, links e feeds coerentes                           | Teste do HTML exportado      |
| Tela 390px e desktop                          | Conteúdo legível, sem sobreposição ou rolagem horizontal da página | Inspeção visual              |
| Teclado no modal                              | Foco contido, Escape fecha, foco retorna ao botão                  | Verificação manual           |
| Movimento reduzido                            | Sem animação, transição ou deslocamento em hover                   | CSS e verificação manual     |

Comandos: `npm run check` para o ciclo curto; `npm run verify` para entrega. O segundo deixa `.next` no modo exportação: execute `npm run build` antes de `npm start` para produção local.

Nenhum teste garante SEO comercial, aprovação em programas de indicação, veracidade das fontes ou acessibilidade completa. Não registrar uma inspeção manual como concluída se ela não foi executada.
