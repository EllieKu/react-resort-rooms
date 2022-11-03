import React, { useContext } from 'react'
import { RoomContext } from '../context'
import Title from './Title'

// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) {
  const context = useContext(RoomContext)
  const {
    handleChange,
    type,
    capacity,
    price,
    MaxPrice,
    minPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context
  let types = getUnique(rooms, 'type')
  types = ['all', ...types]
  types = types.map((item, index) => <option key={index} value={item}>{item}</option>)
  return (
    <section className='filter-container'>
      <Title title="search rooms" />
      <form className='filter-form'>
        {/* select type */}
        <div className='form-group'>
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className='form-control'
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
        {/* end select type */}
      </form>
    </section>
  )
}
