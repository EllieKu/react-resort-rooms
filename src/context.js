import React, { useState, useEffect } from 'react'
import axios from 'axios';

const RoomContext = React.createContext()

function RoomProvider({children}) {
  const [state, setState] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
  })
  const [condition, setCondition] = useState({
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  })

  useEffect(() => {
    function requestRooms() {
      axios.get('/.netlify/functions/rooms')
        .then(response => {
          let rooms = formatData(response.data)
          let featuredRooms = rooms.filter(room => room.featured === true)
          let maxPrice = Math.max(...rooms.map(item => item.price))
          let maxSize = Math.max(...rooms.map(item => item.size))
          setCondition(prev => ({
            ...prev,
            price: maxPrice,
            maxPrice,
            maxSize,
          }))
          setState(prev => ({
            ...prev,
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
          }))
        })
        .catch(error => {
          console.log(error)
        })
    }

    requestRooms()
  }, [])

  const formatData = items => {
    let tempItems = items.map(item => {
      let id = item.sys.id
      let images = item.fields.images.map(image => image.fields.file.url)
      
      let room = { ...item.fields, images, id }
      return room
    })
    return tempItems
  }

  const getRoom = slug => {
    let tempRooms = [...state.rooms]
    const room = tempRooms.find(room => room.slug === slug)
    return room
  }

  const handleChange = event => {
    const {type, name} = event.target
    const value = type === 'checkbox' ? event.target.checked : event.target.value 
    setCondition(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    const filterRooms = () => {
      const { rooms } = state
      let {
        type,
        capacity,
        price,
        minSize,
        maxSize,
        breakfast,
        pets,
      } = condition
  
      let tempRooms = [...rooms]
      capacity = parseInt(capacity)
      price = parseInt(price)
      if (type !== 'all') {
        tempRooms = tempRooms.filter(room => room.type === type)
      }
      if (capacity !== 1) {
        tempRooms = tempRooms.filter(room => room.capacity >= capacity)
      }
      tempRooms = tempRooms.filter(room => room.price <= price)
      tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
      if (breakfast) {
        tempRooms = tempRooms.filter(room => room.breakfast)
      }
      if (pets) {
        tempRooms = tempRooms.filter(room => room.pets)
      }
      setState(prev =>({
        ...prev,
        sortedRooms: tempRooms
      }))
    }
    filterRooms()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition])


  return (
    <RoomContext.Provider
      value={{ 
        ...state,
        ...condition,
        getRoom,
        handleChange,
      }}>
      {children}
    </RoomContext.Provider>
  )
}

export { RoomProvider, RoomContext }