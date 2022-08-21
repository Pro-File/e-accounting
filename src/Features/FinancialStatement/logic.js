import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";

const RATE = 2.83464566929;

// A3 297mm x 419mm
const PAGE_WIDTH = 297 * RATE;
const PAGE_HEIGHT = 619 * RATE;
const CONTENT_WIDTH = 297 * RATE;
const CONTENT_HEIGHT = 619 * RATE;
const PAGE_MARGINS = [0 * RATE, 0 * RATE];

/**
 * HTMLからPDFを生成
 * @param {HTMLElement} element
 */
export async function createPdfFromHtml(element) {
  const pdfProps = await createPdfProps(element);
  createPdf(pdfProps);
}

/**
 * PDF出力用のPdfPropsを作成
 * @param {HTMLElement} element
 * @returns {Promise<PdfProps>}
 */
async function createPdfProps(element) {
  // html2canvas実行
  const options = {
    scale: 2,
  };
  const canvas = await html2canvas(element, options);

  const dataUrl = canvas.toDataURL();

  const pdfProps = {
    dataUrl,
    pageSize: {
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
    },
    pageOrientation: "PORTRAIT",
    contentSize: {
      width: CONTENT_WIDTH,
      height: CONTENT_HEIGHT,
    },
    pageMargins: PAGE_MARGINS,
  };

  return pdfProps;
}

/**
 * エンコードされた画像URLを貼り付けたPDFを出力する
 * @param {PdfProps} pdfProps
 */
function createPdf(pdfProps) {
  const { dataUrl, contentSize, pageMargins } = pdfProps;
  const pageSize = pdfProps.pageSize;
  const pageOrientation = pdfProps.pageOrientation;

  const documentDefinitions = {
    pageSize,
    pageOrientation,
    content: {
      image: dataUrl,
      ...contentSize,
    },
    pageMargins,
  };

  pdfMake.createPdf(documentDefinitions).download();
}
