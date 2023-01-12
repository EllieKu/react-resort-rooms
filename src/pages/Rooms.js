import React from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import RoomContainer from '../components/RoomContainer'

export default function Rooms() {
  window.scrollTo({
    top: 0,
  })

  return (
    <>
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