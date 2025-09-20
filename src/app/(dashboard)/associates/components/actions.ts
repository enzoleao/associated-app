export function formatDateForFilename(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}_${month}_${day}_${hours}_${minutes}`;
}

/**
 * Faz download do arquivo PDF de uma URL que retorna o blob.
 * 
 * @param baseName Nome base para o arquivo (ex: 'ENZO GABRIEL')
 * @param associatedId ID para montar a URL da API
 * @param urlBase Base da URL da API para buscar o arquivo
 */
export async function downloadProfilePdfReport(baseName: string, associatedId: string) {

  const response = await fetch(`/api/associates/pdf-report/${associatedId}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    alert('Erro ao baixar arquivo');
    return;
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;

  const formattedDate = formatDateForFilename();
  a.download = `${baseName}_${formattedDate}.pdf`;

  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}