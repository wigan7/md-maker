import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { DocumentTypeId, ProjectDocument } from '@/types/project';

export function downloadSingleDocument(fileName: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  saveAs(blob, fileName);
}

export async function downloadProjectZip(
  projectName: string,
  documents: Partial<Record<DocumentTypeId, ProjectDocument>>
) {
  const zip = new JSZip();
  const folderSlug = projectName.toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'project';
  const folder = zip.folder(folderSlug);

  if (!folder) return;

  Object.values(documents).forEach((doc) => {
    if (doc && doc.content) {
      folder.file(doc.fileName, doc.content);
    }
  });

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${folderSlug}-specifications.zip`);
}