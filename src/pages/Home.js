import React from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Services from '../components/Services'
import FeaturedRooms from '../components/FeaturedRooms'
import { Link } from 'react-router-dom'

export default function Home() {
  window.scrollTo({
    top: 0,
  })

  return (
    <>
      <Header>
        <Banner
          title="luxurious rooms"
          subtitle="deluxe rooms starting at $299">
            <Link to="/rooms" className="btn-primary">
              our rooms
            </Link>
          </Banner>
      </Header>
      <Services />
      <FeaturedRooms />
    </>
  )
}
