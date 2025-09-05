import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const SalaryChart = ({ balancedata }) => {
    // Fixed undefined property access - force reload
    try {
        const chartData = []
        if (balancedata && balancedata.balance && Array.isArray(balancedata.balance)) {
            for (let index = 0; index < balancedata.balance.length; index++) {
                const balanceItem = balancedata.balance[index]
                if (balanceItem) {
                    chartData.push(
                        {
                            month: balanceItem["expensemonth"] || `Month ${index + 1}`,
                            SalriesPaid: balanceItem["totalexpenses"] || 0,
                            AvailableAmount: balanceItem["availableamount"] || 0
                        }
                    )
                }
            }
        }
        
        const chartConfig = {
            desktop: {
                label: "Salaries Paid",
                color: "hsl(var(--chart-1))",
            },
            mobile: {
                label: "Available Balance",
                color: "hsl(var(--chart-2))",
            },
        }

        let trendingUp = 0

        if (balancedata && chartData.length >= 2) {
            const lastItem = chartData[chartData.length - 1]
            const secondLastItem = chartData[chartData.length - 2]
            if (lastItem && secondLastItem && secondLastItem["AvailableAmount"] > 0) {
                const difference = lastItem["AvailableAmount"] - secondLastItem["AvailableAmount"]
                trendingUp += Math.round((difference * 100) / secondLastItem["AvailableAmount"])
            }
        }
        
        return (
            <div className="salary-container flex flex-col min-[250px]:gap-3 sm:gap-1 h-auto">
                <div className="heading px-2 my-2 min-[250px]:px-3">
                    <h1 className="min-[250px]:text-xl xl:text-3xl font-bold min-[250px]:text-center sm:text-start">Balance Chart</h1>
                </div>
                <Card className="mx-2">
                    <CardHeader>
                        <CardTitle className="min-[250px]:text-xs sm:text-md md:text-lg lg:text-xl">Available Salary Amount : {chartData && chartData.length > 0 && chartData[chartData.length - 1] ? chartData[chartData.length - 1]["AvailableAmount"] || 0 : 0}</CardTitle>
                        <CardDescription className="min-[250px]:text-xs sm:text-md md:text-lg lg:text-xl">
                            Salaries Chart
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {chartData.length > 0 ? (
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="line" className="p-2" />}
                                        className="p-[2px] flex gap-1 items-center min-[250px]:text-xs sm:text-xs"
                                    />
                                    <Area
                                        dataKey="SalriesPaid"
                                        type="natural"
                                        fill="var(--color-mobile)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-mobile)"
                                        stackId="a"
                                    />
                                    <Area
                                        dataKey="AvailableAmount"
                                        type="natural"
                                        fill="var(--color-desktop)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-desktop)"
                                        stackId="a"
                                    />
                                    <ChartLegend content={<ChartLegendContent />} />
                                </AreaChart>
                            </ChartContainer>
                        ) : (
                            <div className="flex items-center justify-center h-64 text-muted-foreground">
                                <p>No salary data available</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-start gap-2 text-sm">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    Trending up by {trendingUp} % this month
                                    <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                    {chartData.length > 0 && chartData[0] && chartData[chartData.length - 1] ? 
                                        `${chartData[0]["month"] || "Jan"} 2024 - ${chartData[chartData.length - 1]["month"] || "Dec"} 2024` : 
                                        "No data available"}
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    } catch (error) {
        console.error("Error in SalaryChart:", error)
        return (
            <>
                <div className="heading px-2 my-2 min-[250px]:px-3">
                    <h1 className="min-[250px]:text-xl xl:text-3xl font-bold min-[250px]:text-center sm:text-start">Balance Chart</h1>
                </div>
                <Card className="mx-2">
                    <CardHeader>
                        <CardTitle className="min-[250px]:text-xs sm:text-md md:text-lg lg:text-xl">Available Salary Amount : 0</CardTitle>
                        <CardDescription className="min-[250px]:text-xs sm:text-md md:text-lg lg:text-xl">
                            Salaries Chart
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center h-64 text-muted-foreground">
                            <p>Error loading salary data</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-start gap-2 text-sm">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    No data available
                                </div>
                                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                    Please try again later
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </>
        )
    }
}