import {
  configureUnPDF,
  getDocumentProxy,
  renderPageAsImage,
} from 'unpdf';

import { Readable } from 'node:stream';

export default eventHandler(async (event) => {
  await configureUnPDF({
    // Use the official PDF.js build
    pdfjs: () => import('pdfjs-dist'),
  });

  const data = await $fetch<Blob>('https://pdfobject.com/pdf/sample.pdf');

  console.log(data)


  const pageNumber = 1;

  const buffer = await data.arrayBuffer();


  const result = await renderPageAsImage(buffer, pageNumber, {
    canvas: () => import('canvas')
  });

  //   writeFileSync("dummy-page-1.png", Buffer.from(result));

  return Readable.from([new Uint8Array(result)]);
});
