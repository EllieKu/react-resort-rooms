import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { RoomContext } from '../context'
import Banner from '../components/Banner'
import StyledHero from '../components/StyledHero'
import defaultImg from '../images/room-1.jpeg'

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
      <StyledHero img={mainIng || defaultImg}>
        <Banner title={`${name}`}>
          <Link to='/rooms' className='btn-primary'>
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className='single-room'>
        <div className='single-room-images'>
          {defaultImgs.map((item, index) => {
            return <img key={index} src={item} alt={name}/>
          })}
        </div>
        <div className='single-room-info'>
          <article className='desc'>
            <h3>detail</h3>
            <p>{description}</p>
          </article>
          <article className='info'>
            <h3>info</h3>
            <h6>
              <span>price:</span> 
              <span> ${price}</span>
            </h6>
            <h6>
              <span>size:</span> 
              <span> ${size} SQFT</span>
            </h6>
            <h6>
              <span>max capacity:</span> 
              <span>{capacity > 1 ? ` ${capacity} people` : ` ${capacity} person`}</span>
            </h6>
            <h6>
              <span>{ pets ? "pets allowed" : "no pets allowed" }</span> 
            </h6>
            <h6>
              <span>{ breakfast && "free breakfast included" }</span> 
            </h6>
          </article>
        </div>
      </section>
      <section className='room-extras'>
        <article className='desc'>
          <h3>Extras</h3>
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
