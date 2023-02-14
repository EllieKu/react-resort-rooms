import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Banner from '../components/Banner'
import RoomFilter from '../components/RoomFilter'
import RoomList from '../components/RoomList'
import Loading from '../components/Loading'
import { RoomContext } from '../context'
import { Link } from 'react-router-dom'

const RoomContainer = () => {
  const context = useContext(RoomContext)
  const { loading, sortedRooms, rooms } = context
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <RoomFilter rooms={rooms} />  
      <RoomList rooms={sortedRooms}/>  
    </>
  )
}

export default function Rooms() {
  window.scrollTo({
    top: 0,
  })

  return (
    <>
      <Navbar />
      <Header headerClass="roomsHeader">
        <Banner title="Our Rooms">
          <Link to="/" className="btn-primary">
            return home
          </Link>
        </Banner>
      </Header>
      <RoomContainer />
    </>
  )
}