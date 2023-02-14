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
    maxPrice,
    minPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context
  let types = getUnique(rooms, 'type')
  types = ['all', ...types]
  types = types.map((item, index) => <option key={index} value={item}>{item}</option>)

  let people = getUnique(rooms, 'capacity')
  people = people.map((item, index) => <option key={index} value={item}>{item}</option>)

  return (
    <section className='filter-container'>
      <Title title="search rooms" />
      <form className='filter-form'>
        {/* select type */}
        <div>
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
        {/* select guest */}
        <div>
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className='form-control'
            onChange={handleChange}
          >
            {people}
          </select>
        </div>
        {/* end select guest */}
        {/* price */}
        <div>
          <label htmlFor="price">room price ${price}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            id="price"
            onChange={handleChange}
            className='form-control'
          />
        </div>
        {/* end price */}
        {/* size */}
        <div>
          <label htmlFor="size">room size</label>
          <div className='size-inputs'>
            <input
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              onChange={handleChange}
              className='size-input'
              min="0"
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              onChange={handleChange}
              className='size-input'
            />
          </div>
        </div>
        {/* end size */}
        {/* extras */}
        <div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='breakfast'
              id='breakfast'
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor='breakfast'>breakfast</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor='pets'>pets</label>
          </div>
        </div>
        {/* end extras */}
      </form>
    </section>
  )
}
