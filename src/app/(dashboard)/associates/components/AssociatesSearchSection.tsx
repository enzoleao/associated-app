"use client"

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFilters } from "@/contexts/FilterContext";
import { IconSearch } from "@tabler/icons-react";

interface StatusOption {
    id: string;
    name: string;
    color: string;
}

export function AssociatesSearchSection() {
    const { searchTerm, setSearchTerm, associateStatusId, setAssociateStatusId } = useFilters();
    const [inputValue, setInputValue] = useState(searchTerm || "");

    const selectData: StatusOption[] = [
        { id: "1", name: 'Ativo', color: 'green' },
        { id: "2", name: 'Inativo', color: 'red' },
        { id: "3", name: 'Pendente', color: 'yellow' },
    ];

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchTerm(inputValue);
        }, 500);

        return () => clearTimeout(handler);
    }, [inputValue, setSearchTerm]);

    const handleStatusChange = (value: string) => {
        if (value === "0") {
            setAssociateStatusId("0");
        } else {
            setAssociateStatusId(value);
        }
    };

    return (
        <div className="p-6 bg-white shadow-xs border rounded-lg flex flex-col gap-5 sm:flex-row">
            <Input 
                placeholder="Buscar por nome, email ou CPF ..." 
                className="h-11" 
                prefixIcon={<IconSearch />} 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />

            <Select
                value={associateStatusId ?? "0"} // default para "Todos os status"
                onValueChange={handleStatusChange}
            >
                <SelectTrigger className="w-full md:w-[180px]" size="large">
                    <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Todos os status</SelectItem>
                    {selectData.map((i) => (
                        <SelectItem key={i.id} value={i.id}>
                            {i.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
