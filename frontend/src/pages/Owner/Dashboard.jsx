import React, { useContext, useEffect, useState } from 'react'
import { assets, dashboardDummyData } from '../../assets/assets'
import { UserContext } from '../../context/Usercontext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Dashboard = () => {

    const {
        token,
        settoken,
        backend_url,
        userData,
        setuserData,
        room,
        setroom,
        currencysymbol,getAllRoom,getRoom
      }=useContext(UserContext)
      const [dashboardData, setdashboardData] = useState()
      const getbookingData=async()=>{
        try{
          const {data}=await axios.post(`${backend_url}/api/booking/booking-host`,{},{ headers: { token } })
          console.log(data)
          if(data.success){
            setdashboardData(data.dashboardData)
          }
        }
        catch(error){
            toast.error("error")
        }
      }
      
      useEffect(()=>{
        getbookingData();
      },[token])
    

    return (
        <div className='px-6 pt-6 max-w-6xl mx-auto'>
            <div className="mb-10">
                <h1 className="font-playfair text-4xl text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600 text-base max-w-3xl">
                    Monitor your room listings, track bookings, and analyze revenue — all in one place. Stay updated with real-time insights to ensure smooth operations.
                </p>
            </div>

            
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 my-8'>
                <div className='bg-[#fdf8e4] border border-yellow-200 rounded-lg p-4 flex items-center shadow-sm'>
                    <img src={assets.totalBookingIcon} alt="Total Booking" className='h-10 hidden sm:block' />
                    <div className='ml-4'>
                        <p className='text-blue-600 text-lg font-semibold'>Total Bookings</p>
                        <p className='text-gray-700 text-xl font-bold mt-1'>{dashboardData?.totalBookings}</p>
                    </div>
                </div>

                <div className='bg-[#fdf8e4] border border-yellow-200 rounded-lg p-4 flex items-center shadow-sm'>
                    <img src={assets.totalRevenueIcon} alt="Total Revenue" className='h-10 hidden sm:block' />
                    <div className='ml-4'>
                        <p className='text-blue-600 text-lg font-semibold'>Total Revenue</p>
                        <p className='text-gray-700 text-xl font-bold mt-1'>Rs. {dashboardData?.totalRevenue}</p>
                    </div>
                </div>
            </div>

           
            <h2 className='text-xl text-blue-950/80 font-semibold mb-4'>Recent Bookings</h2>
            <div className='w-full overflow-x-auto border border-gray-200 rounded-lg max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300'>
                <table className='min-w-full text-left'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='py-3 px-4 text-gray-800 font-semibold text-sm'>User Name</th>
                            <th className='py-3 px-4 text-gray-800 font-semibold text-sm max-sm:hidden'>Room Name</th>
                            <th className='py-3 px-4 text-gray-800 font-semibold text-sm'>Total Amount</th>
                            <th className='py-3 px-4 text-gray-800 font-semibold text-sm text-center'>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white text-sm'>
                        {
                            dashboardData?.bookings?.map((item, idx) => (
                                <tr key={idx} className='hover:bg-gray-50 transition'>
                                    <td className='py-3 px-4 border-t border-gray-200 text-gray-700'>{item.user.username}</td>
                                    <td className='py-3 px-4 border-t border-gray-200 text-gray-700 max-sm:hidden'>{item.room.title}</td>
                                    <td className='py-3 px-4 border-t border-gray-200 text-gray-700'>Rs. {item.totalPrice}</td>
                                    <td className='py-3 px-4 border-t border-gray-200 text-center'>
                                        <span className={`py-1 px-3 text-xs font-medium rounded-full ${item.isPaid ? 'bg-green-300 text-green-600' : 'bg-yellow-300 text-yellow-800'}`}>
                                            {item.isPaid ? 'Completed' : 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
