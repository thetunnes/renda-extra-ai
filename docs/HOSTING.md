# GitHub Pages e domínio próprio

## Publicação

Repositório existente: `thetunnes/renda-extra-ai`. Domínio principal: `https://granaextracomia.com.br`. O proprietário tornou o repositório público para habilitar GitHub Pages no plano gratuito. O site publicado contém a exportação estática; o código e o histórico do repositório também são públicos. Se a visibilidade for alterada para privada futuramente, Pages exigirá um plano GitHub compatível, como Pro.

O workflow `.github/workflows/quality.yml` executa `npm ci` e `npm run verify`. Em pushes para `main` ou execução manual nessa branch, envia a pasta `out/` verificada e publica no ambiente `github-pages`. Pull requests não publicam. Se qualquer verificação falhar, não há publicação. Não são necessários tokens pessoais, chaves ou serviços adicionais.

O comando `build:export` ativa `output: 'export'` no Next.js. `trailingSlash: true` gera arquivos `index.html` para os slugs e `images.unoptimized: true` dispensa servidor de imagens. O domínio próprio serve o site na raiz, sem `basePath` ou prefixo do repositório. Não use a URL de projeto `thetunnes.github.io/renda-extra-ai/` como validação de assets antes de configurar o domínio próprio.

## Ativação no GitHub

1. Abra [Settings → Pages](https://github.com/thetunnes/renda-extra-ai/settings/pages) no repositório existente.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Em **Custom domain**, salve `granaextracomia.com.br` antes de apontar o DNS.
4. Publique o commit em `main` e acompanhe o workflow **Application harness** na aba Actions.
5. Depois de o DNS ser validado e o certificado emitido, habilite **Enforce HTTPS**.

Com publicação via Actions, o domínio é definido nas configurações do Pages. Um arquivo `CNAME` no build não substitui essa configuração e não é necessário.

Para verificar a propriedade, use **Settings da conta → Pages → Add a domain** e adicione no Registro.br o TXT exato fornecido pelo GitHub. Esse código é gerado pela conta; não invente seu valor.

## DNS no Registro.br

Na administração de `granaextracomia.com.br`, confira quais servidores DNS estão ativos. Se forem os do Registro.br, use **DNS → Configurar zona DNS**, no modo avançado. Se forem externos, os registros precisam ser configurados no provedor que responde pela zona.

Depois de salvar o domínio no GitHub, configure:

| Tipo  | Nome                            | Valor                 |
| ----- | ------------------------------- | --------------------- |
| A     | `granaextracomia.com.br` (raiz) | `185.199.108.153`     |
| A     | `granaextracomia.com.br` (raiz) | `185.199.109.153`     |
| A     | `granaextracomia.com.br` (raiz) | `185.199.110.153`     |
| A     | `granaextracomia.com.br` (raiz) | `185.199.111.153`     |
| CNAME | `www.granaextracomia.com.br`    | `thetunnes.github.io` |

Se o editor completa automaticamente o domínio, deixe o campo de nome vazio para a raiz e use somente `www` para o CNAME. O destino do CNAME não inclui `https://` nem o nome do repositório.

Substitua apenas registros web conflitantes da raiz e de `www`. Preserve MX e TXT de e-mail ou outras verificações. Caso existam registros AAAA na raiz apontando para outra hospedagem, substitua-os pelos quatro endereços IPv6 oficiais do Pages ou remova apenas esses registros conflitantes. IPv6 é opcional:

```text
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

A propagação do DNS e a disponibilidade de HTTPS podem levar até 24 horas. Com o domínio principal sem `www`, o Pages redireciona a versão `www` quando ambos estão configurados corretamente.

## Validação e retorno

Execute `npm run format` e `npm run verify` antes de publicar. Depois, confirme a execução remota bem-sucedida e confira no domínio HTTPS a página inicial, páginas de plataformas e guias, CSS/JS, `sitemap.xml`, `robots.txt`, `feed.xml`, `feed.json` e `llms.txt`. Confira também o redirecionamento de `www` e a página 404.

Não encerre a hospedagem anterior antes da validação no domínio. O endereço anterior em `chatgpt.site` só poderá redirecionar se aquela hospedagem oferecer esse recurso; alterar o canonical não cria redirecionamentos. Para voltar, restaure os registros DNS anteriores anotados antes da mudança e o `brand.url` correspondente; reexecute o fluxo de publicação da hospedagem anterior.

## Referências

- [GitHub: workflows personalizados para Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub: domínio personalizado e registros DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub: planos e limites do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
