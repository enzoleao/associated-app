"use client"; // garante que é renderizado apenas no client

import * as React from "react";

export function Avatar() {
  // Se quiser pegar iniciais do usuário depois, use state
  const [initials, setInitials] = React.useState("AD");

  // Exemplo: definir iniciais dinamicamente apenas no client
  // React.useEffect(() => {
  //   const userInitials = getUserInitials(); // função que pega do contexto ou API
  //   setInitials(userInitials);
  // }, []);

  return (
    <div className="flex items-center gap-2">
      <button className="p-2 rounded-full hover:bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
        {initials}
      </div>
    </div>
  );
}
