import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { RoomContext } from '../context'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import defaultImg from '../images/room-1.jpeg'
import styled from "styled-components";

const StyledHeader = styled.header`
  min-height: 40vmax;
  background-image: url(${props => props.img ? props.img : defaultImg});
`

export default function SingleRoom() {
  window.scrollTo({
    top: 0,
  })
  const params = useParams()
  const context = useContext(RoomContext)
  const { getRoom } = context
  const room = getRoom(params.slug)

  if (!room) {
    return (
      <div className="error">
        <h3>no such room could be found...</h3>
        <Link to='/rooms' className='btn-primary'>
          back to rooms
        </Link>
      </div>
    )
  }
  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images
  } = room

  const [mainIng, ...defaultImgs] = images
  return (
    <>
      <Navbar />
      <StyledHeader img={mainIng || defaultImg} className="header">
        <Banner title={name}>
          <Link to='/rooms' className='btn-primary'>
            back to rooms
          </Link>
        </Banner>
      </StyledHeader>
      <section className='single-room'>
        <div className='single-room-images'>
          {
            defaultImgs.map((item, index) => <img key={index} src={item} alt={name}/>)
          }
        </div>
        <div className='single-room-info'>
          <article className='desc'>
            <h1>detail</h1>
            <p>{description}</p>
          </article>
          <article className='info'>
            <h1>info</h1>
            <div>
              <span>price:</span> 
              <span> ${price}</span>
            </div>
            <div>
              <span>size:</span> 
              <span> ${size} SQFT</span>
            </div>
            <div>
              <span>max capacity:</span> 
              <span>{capacity > 1 ? ` ${capacity} people` : ` ${capacity} person`}</span>
            </div>
            <div>
              <span>{ pets ? "pets allowed" : "no pets allowed" }</span> 
            </div>
            <div>
              <span>{ breakfast && "free breakfast included" }</span> 
            </div>
          </article>
        </div>
      </section>
      <section className='room-extras'>
        <article className='desc'>
          <h1>Extras</h1>
        </article>
        <ul className='extras'>
          {extras.map((item, index) => {
            return <li key={index}>- {item}</li>
          })}
        </ul>
      </section>
    </>
  )
}
