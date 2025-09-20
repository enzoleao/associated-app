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
  if (!dateStr) return "-";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function formatCpfCnpj(value?: string | null): string {
  if (typeof value !== 'string') {
    return '';
  }

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

export function validatePermission(menus: any[], permissionName: string): boolean {
  if (!Array.isArray(menus)) return false;
  return menus.some(menu => {
    const permissions = menu.resource?.permissions || [];
    const hasPermission = permissions.some((p: { name: string; }) => p.name === permissionName);

    const subMenus = menu.subMenus || [];
    const subMenuHasPermission = subMenus.some((sub: { resource: { permissions: any; }; }) => {
      const subPermissions = sub.resource?.permissions || [];
      return subPermissions.some((p: { name: string; }) => p.name === permissionName);
    });

    return hasPermission || subMenuHasPermission;
  });
}


export const formatPhoneNumber = (number?: string | null): string => {
  if (typeof number !== 'string') {
    return '';
  }

  const digits = number.replace(/\D/g, '');

  if (digits.length === 11) {
    const areaCode = digits.slice(0, 2);
    const nineDigit = digits.slice(2, 3);
    const part1 = digits.slice(3, 7);
    const part2 = digits.slice(7);
    return `(${areaCode}) ${nineDigit} ${part1}-${part2}`;
  } else if (digits.length === 10) {
    const areaCode = digits.slice(0, 2);
    const part1 = digits.slice(2, 6);
    const part2 = digits.slice(6);
    return `(${areaCode}) ${part1}-${part2}`;
  } else {
    return number; // or 'Invalid number' if you prefer
  }
};
