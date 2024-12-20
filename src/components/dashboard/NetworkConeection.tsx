'use client'

// third-party
import { useState, useEffect } from "react";

// components
import Loading from "@/components/Loading";
import ErrorDisplayer from "@/components/Error";

// context
import { useDashBoardContext } from "@/contexts/DashBoardContext";

// utils
import { initData, fetchNetworkConnection, APIResponseSuccess, APIResponseError } from "@/utils/dashboard/fetchNetworkConnection";


const NetworkConnection = () => {
  const [connectionCount, setConnectionCount] = useState<string>(initData);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { dateTimeRange } = useDashBoardContext()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const fetchData = async () => {

      if (isLoading) return
      setIsLoading(true)
      if (dateTimeRange?.start && dateTimeRange?.end) {
        const result = await fetchNetworkConnection({ start: dateTimeRange?.start, end: dateTimeRange?.end })
        if (result.success) {
          setConnectionCount(result.content.count)
        } else {
          setError("Failed to fetch network connection data 😢. Please try again later.")
          setTimeout(() => {
            setError(null)
          }, 3000)
        }
      }
      setIsLoading(false)

    }
    fetchData()

  }, [dateTimeRange])


  return (
    <>
      {error && <ErrorDisplayer errorMessage={error} setError={setError} />}
      {
        isLoading ? <Loading /> :
          <div className=" flex flex-col h-full mr-2 bg-white rounded-lg shadow-lg p-2">
            <div className="font-bold text-sm">高風險事件總數 (風險等級8-14)</div>
            <div className="flex-grow flex flex-col items-center justify-center text-gray-700">
              <div className="font-bold text-[65px]">{connectionCount}</div>
              <div className="text-[24px]">資料筆數</div>
            </div>
          </div>
      }
    </>
  )
}

export default NetworkConnection;
