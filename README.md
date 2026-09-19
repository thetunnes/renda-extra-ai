# granaextracomia

Portal de curadoria de plataformas de contribuição para IA, em Next.js.

## Desenvolvimento

```sh
npm install
npm run dev
```

Abra http://localhost:3000. Mantenha o terminal aberto durante o uso.
As alterações no projeto aparecem automaticamente.

## Produção local

```sh
npm run build
npm start
```

Abra http://localhost:3000. Pare o servidor de desenvolvimento antes de iniciar o de produção na mesma porta.

## Exportação estática opcional

`npm run build:export` gera a pasta `out/` para hospedagem estática.
Para voltar ao servidor Next.js, execute `npm run build` novamente antes de `npm start`.

## Identidade e plataformas

- Nome e links: `lib/site.ts`
- Logotipo: `public/granaextracomia-logo.svg`
- Ícone: `public/favicon.svg`
- Estilos: `app/globals.css`
