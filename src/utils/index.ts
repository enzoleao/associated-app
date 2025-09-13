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