export function formatDateForFilename(date: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);

  const year = parts.find(p => p.type === "year")?.value;
  const month = parts.find(p => p.type === "month")?.value;
  const day = parts.find(p => p.type === "day")?.value;
  const hours = parts.find(p => p.type === "hour")?.value;
  const minutes = parts.find(p => p.type === "minute")?.value;

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