import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { convertPercentage } from "@/utils"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
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
  card_data: AssociateCardType[]
}

export function AssociatesReport({
  card_data
}: AssociatesReportProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 ">
      {
        card_data.map((card)=> {
          return (
            <Card className="@container/card bg-white " key={card.id}>
              <CardHeader >
                <CardDescription>{card.name}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {
                    card.value_type === "PERCENTAGE" 
                    ? convertPercentage(card.value) 
                    : card.value
                  }
                </CardTitle>
                <CardAction className={`p-3 ${card.background_color} rounded-lg`}>
                  {<card.icon className={`${card.color}`} />}
                  {/* <Badge variant="outline">
                    <IconTrendingUp />
                    +12.5%
                  </Badge> */}
                </CardAction>
              </CardHeader>
              {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Trending up this month <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Visitors for the last 6 months
                </div>
              </CardFooter> */}
            </Card>
          )
        })
      }
    </div>
  )
}
