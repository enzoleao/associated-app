"use client"

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconSearch } from "@tabler/icons-react";

export function AssociatesSearchSection() {
    const selectData = [
        { id: "1", name: 'Todos os status' },
        { id: "2", name: 'Ativo' },
        { id: "3", name: 'Inativo' },
        { id: "4", name: 'Pendente' },
    ]

    return (
        <div className="p-6 bg-white shadow-xs border rounded-lg flex flex-col gap-5 sm:flex-row">
            <Input 
                placeholder="Buscar por nome, email ou CPF ..." 
                className="h-11" 
                prefixIcon={<IconSearch />} 
            />
            <Select defaultValue="1">
                <SelectTrigger className="w-full md:w-[180px]" size="large">
                    <SelectValue placeholder="Selecione status" />
                </SelectTrigger>
                <SelectContent>
                    {selectData.map((i) => (
                        <SelectItem key={i.id} value={i.id.toString()}>
                            {i.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
