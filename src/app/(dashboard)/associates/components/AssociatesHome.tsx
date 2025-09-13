import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AssociatesReport } from "./AssociatesReport";
import { IconCheck, IconTrophy, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { AssociatesSearchSection } from "./AssociatesSearchSection";
import { AssociatesTable } from "./AssociatesTable";

export function AssociatesHome() {

    const cardReports = [
      {
        id: 1,
        name: 'Total de Associados',
        icon: IconUsers,
        value: 120,
        value_type: 'FIXED',
        background_color: 'bg-blue-100',
        color: "text-blue-400"
      },
      {
        id: 2,
        name: 'Associados Ativos',
        icon: IconCheck,
        value: 90,
        value_type: 'FIXED',
        background_color: 'bg-green-100',
        color: 'text-green-400',

      },
      {
        id: 3,
        name: 'Total de Dependentes',
        icon: IconUsersGroup,
        value: 47,
        value_type: 'FIXED',
        background_color: 'bg-purple-100',
        color: 'text-purple-400',

      },
      {
        id: 4,
        name: 'Taxa de Retenção',
        icon: IconTrophy,
        value: 0.94,
        value_type: 'PERCENTAGE',
        background_color: 'bg-blue-100',
        color: 'text-blue-400',

      },
    ]

    return (
      <div className="@container/main flex flex-1 flex-col">
          <div className="flex flex-col gap-6 py-4 md:gap-7 md:py-7">
            <section className="flex justify-between items-center">
              <span className="flex flex-col">
                  <h2 className="text-3xl font-bold text-gray-900">Associados</h2>
                  <p className="text-gray-600 mt-2">Gerencie todos os associados e seus dependentes</p>
              </span>
              <Button
                className="bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2 h-12"
              >
                <Plus />
                Novo Associado
              </Button>
            </section>
            <AssociatesReport card_data={cardReports} />
            <AssociatesSearchSection />
            <AssociatesTable />
          </div>
      </div>

    )
}