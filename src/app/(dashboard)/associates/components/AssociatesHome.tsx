import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AssociatesReport } from "./AssociatesReport";
import { AssociatesSearchSection } from "./AssociatesSearchSection";
import { AssociatesTable } from "./AssociatesTable";
import { CreateAssociateDialogForm } from "./CreateAssociateDialogForm";

export function AssociatesHome() {
    return (
      <div className="@container/main flex flex-1 flex-col">
          <div className="flex flex-col gap-6 py-4 md:gap-7 md:py-7">
            <section className="flex justify-between items-center">
              <span className="flex flex-col">
                  <h2 className="text-3xl font-bold text-gray-900">Associados</h2>
                  <p className="text-gray-600 mt-2">Gerencie todos os associados e seus dependentes</p>
              </span>
              <CreateAssociateDialogForm>
                <Button
                  variant="primary"
                  className="text-white rounded flex items-center justify-center gap-2 h-12"
                >
                  <Plus />
                  Novo Associado
                </Button>
              </CreateAssociateDialogForm>
            </section>
            <AssociatesReport  />
            <AssociatesSearchSection />
            <AssociatesTable />
          </div>
      </div>

    )
}