// third-party
import { useState, useEffect } from 'react'

// context
import { useDashBoardContext } from '@/contexts/DashBoardContext'

// components
import PieGraph from "@/components/dashboard/PieGraph";
import ErrorDisplayer from '@/components/Error'

// utils
import { initData, EntirePieDataType, fetchPieGraphData } from '@/utils/dashboard/fetchPieGaphData1'



const PieGraphContainer = () => {

  const { dateTimeRange } = useDashBoardContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [chartData, setChartData] = useState<EntirePieDataType>(initData)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    if (isLoading) return
    setIsLoading(true)
    const fetchData = async () => {
      try {
        setChartData(initData)
        if (dateTimeRange?.start && dateTimeRange?.end) {
          const response = await fetchPieGraphData({ start: dateTimeRange.start, end: dateTimeRange.end })
          if (response.success) {
            setChartData(response.content)
          } else {
            throw new Error('Failed to fetch data')
          }
        }
      } catch (error) {
        console.log(error)
        setError('Failed to fetch pie graph data 😢. Please try again later.')
        setTimeout(() => {
          setError(null)
        }, 3000)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [dateTimeRange])




  return (
    <div className='flex flex-wrap justify-center space-y-2  '>
      {error && <ErrorDisplayer errorMessage={error} setError={setError} />}
      <div className=' md:w-1/2 '>

        <PieGraph title="Top_agents" data={chartData.top_agents} />
      </div>
      <div className=' md:w-1/2'>
        <PieGraph title="Top_event_counts" data={chartData.top_mitre} />
      </div>
      <div className=' md:w-1/2'>

        <PieGraph title="Top_events_counts_by_agents" data={chartData.top_event_counts} />
      </div>
      <div className=' md:w-1/2'>
        <PieGraph title="Top_events" data={chartData.top_events} />

      </div>
    </div>
  )
}


export default PieGraphContainer;
