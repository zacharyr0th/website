import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import fs from 'fs/promises';
import path from 'path';

interface Metadata {
  composer: string;
  name: string;
  tags: string[];
}

export async function addMetadataToPDF(filePath: string, metadata: Metadata): Promise<void> {
  const pdfFile = await fs.readFile(filePath);
  let pdfDoc;
  try {
    pdfDoc = await PDFDocument.load(pdfFile);
  } catch (error) {
    if (error instanceof Error && error.message.includes('encrypted')) {
      console.warn(`PDF file is encrypted: ${filePath}. Attempting to load with ignoreEncryption option.`);
      pdfDoc = await PDFDocument.load(pdfFile, { ignoreEncryption: true });
    } else {
      throw error;
    }
  }

  pdfDoc.setTitle(metadata.name);
  pdfDoc.setAuthor(metadata.composer);
  pdfDoc.setSubject(metadata.tags.join(', '));

  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(filePath, pdfBytes);
}

export async function addMetadataToZIP(filePath: string, metadata: Metadata): Promise<void> {
  const zipFile = await fs.readFile(filePath);
  const zip = await JSZip.loadAsync(zipFile);

  const metadataContent = JSON.stringify(metadata, null, 2);
  zip.file('metadata.json', metadataContent);

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
  await fs.writeFile(filePath, zipBuffer);
}

export async function addMetadataToMSCZ(filePath: string, metadata: Metadata): Promise<void> {
  // MSCZ files are ZIP files, so we can use the same approach as ZIP
  await addMetadataToZIP(filePath, metadata);
}

export async function addMetadataToFile(filePath: string, metadata: Metadata): Promise<void> {
  const fileExtension = path.extname(filePath).toLowerCase();

  switch (fileExtension) {
    case '.pdf':
      await addMetadataToPDF(filePath, metadata);
      break;
    case '.zip':
      await addMetadataToZIP(filePath, metadata);
      break;
    case '.mscz':
      await addMetadataToMSCZ(filePath, metadata);
      break;
    default:
      throw new Error(`Unsupported file type: ${fileExtension}`);
  }
}

export async function processAllPDFsInFolder(folderPath: string, getMetadataForFile: (fileName: string) => Metadata): Promise<void> {
  const files = await fs.readdir(folderPath);
  const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');

  for (const pdfFile of pdfFiles) {
    const filePath = path.join(folderPath, pdfFile);
    try {
      const metadata = getMetadataForFile(pdfFile);
      await addMetadataToPDF(filePath, metadata);
      console.log(`Successfully added metadata to ${pdfFile}`);
    } catch (error) {
      console.error(`Error processing ${pdfFile}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}