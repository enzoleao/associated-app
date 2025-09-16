"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAssociateReport } from "@/hooks/useAssociateReport"
import { convertPercentage } from "@/utils"
import { IconCheck, IconTrendingDown, IconTrendingUp, IconTrophy, IconUsers, IconUsersGroup } from "@tabler/icons-react"
import { Icon } from "@tabler/icons-react"

type AssociateCardType = {
  id: number;
  name: string
  value: number
  value_type: string
  icon: Icon
  color: string
  background_color: string
}

interface AssociatesReportProps {
}

export function AssociatesReport({}: AssociatesReportProps) {
  const { data: associatesReportFetchData, isLoading: associateReportFetchLoading } = useAssociateReport()

  const cardReports =  [
    {
      id: 1,
      name: 'Total de Associados',
      icon: IconUsers,
      value: associatesReportFetchData?.associate_total_count,
      value_type: 'FIXED',
      background_color: 'bg-blue-100',
      color: 'text-blue-400'
    },
    {
      id: 2,
      name: 'Associados Ativos',
      icon: IconCheck,
      value: associatesReportFetchData?.associate_active_count,
      value_type: 'FIXED',
      background_color: 'bg-green-100',
      color: 'text-green-400',
    },
    {
      id: 3,
      name: 'Total de Dependentes',
      icon: IconUsersGroup,
      value: 0,
      value_type: 'FIXED',
      background_color: 'bg-purple-100',
      color: 'text-purple-400',
    },
    {
      id: 4,
      name: 'Taxa de Retenção',
      icon: IconTrophy,
      value: associatesReportFetchData?.retention_rate,
      value_type: 'PERCENTAGE',
      background_color: 'bg-blue-100',
      color: 'text-blue-400',
    },
  ]

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 ">
      {cardReports.map((card) => {
        return (
          <Card className="@container/card bg-white min-h-30" key={card.id}>
            <CardHeader>
              <CardDescription>{card.name}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {associateReportFetchLoading ? (
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                ) : (
                  card.value_type === "PERCENTAGE"
                    ? convertPercentage(card.value)
                    : card.value
                )}
              </CardTitle>
              <CardAction className={`p-3 ${card.background_color} rounded-lg`}>
                {associateReportFetchLoading ? (
                  <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
                ) : (
                  <card.icon className={`${card.color}`} />
                )}
              </CardAction>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}
