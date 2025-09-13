export const titles: Record<string, string> = {
    "/": "Dashboard",
    "/associates": "Associados",
    "/payments": "Pagamentos",
    "/settings": "Configurações",
};

export const convertPercentage  = (value: number) => {
    const percentage = new Intl.NumberFormat("pt-BR", {
      style: "percent",
      minimumFractionDigits: 0,
    }).format(value);

    return percentage
}

export function formatToDDMMYYYY(dateStr: string): string {
  if (!dateStr) return "";

  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

export function formatCpfCnpj(value: string): string {
  const onlyNumbers = value.replace(/\D/g, "");

  if (onlyNumbers.length === 11) {
    return onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (onlyNumbers.length === 14) {
    return onlyNumbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }

  return value;
}

export function getBadgeClasses(color: string) {
  const textColor = `text-${color}-500`;
  const bgColor = `bg-${color}-100`;
  return `${textColor} ${bgColor}`;
}