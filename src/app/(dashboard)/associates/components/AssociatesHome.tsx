import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AssociatesReport } from "./AssociatesReport";
import { IconUsers } from "@tabler/icons-react";

export function AssociatesHome() {

    const cardReports = [
      {
        id: 1,
        name: 'Total de associados',
        icon: <IconUsers />,
        value: 10,
        value_type: 'FIXED',
        color: 'bg-blue-100'
      },
      {
        id: 2,
        name: 'Associados ativos',
        icon: '',
        value: 10,
        value_type: 'FIXED',
        color: 'bg-green-100'

      },
      {
        id: 3,
        name: 'Total de dependentes',
        icon: '',
        value: 10,
        value_type: 'FIXED',
        color: 'bg-purple-100'

      },
      {
        id: 4,
        name: 'Taxa de retenção',
        icon: '',
        value: 10,
        value_type: 'FIXED',
        color: 'bg-blue-100'

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
          </div>
      </div>

    )
}