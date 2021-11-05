import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang="es" />
        <body>
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
