import React, { useState, useEffect } from 'react'
import axios from 'axios';

const RoomContext = React.createContext()

function RoomProvider({children}) {
  const [state, setState] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
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
          setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize,
          })
        })
        .catch(error => {
          console.log(error)
        })
    }

    requestRooms()
  }, [])

  function formatData(items) {
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

  function handleChange(event) {
    const {type, name} = event.target
    const value = type === 'checkbox' ? event.target.checked : event.target.value 
    this.setState(
      {
      [name]: value
      },
      filterRooms
    )
  }

  const filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = state

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
    this.setState({
      sortedRooms: tempRooms
    })
  }

  return (
    <RoomContext.Provider
      value={{ 
        ...state,
        getRoom,
        handleChange,
      }}>
      {children}
    </RoomContext.Provider>
  )
}

export { RoomProvider, RoomContext }