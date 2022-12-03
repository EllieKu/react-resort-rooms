import React, { Component } from 'react'
import axios from 'axios';

const RoomContext = React.createContext()

class RoomProvider extends Component {
  state = {
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
  }

  componentDidMount() {
    this.requestRooms()
  }

  requestRooms() {
    axios({
      method: 'post',
      url: '/app/data-ewlkc/endpoint/data/v1/action/find',
      headers: {
        'api-key': 'wkvgy83SQnNYUeqOds9Z7jJ3W2BOvrmIDCH9PzRjzbaPLcPfmkSqihDen34Gdfxd',
      },
      data: {
        "collection":"rooms",
        "database":"dev",
        "dataSource":"Cluster0",
      }
    })
      .then(response => {
        let rooms = this.formatData(response.data.documents)
        let featuredRooms = rooms.filter(room => room.featured === true)
        let maxPrice = Math.max(...rooms.map(item => item.price))
        let maxSize = Math.max(...rooms.map(item => item.size))
        this.setState({
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

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id
      let images = item.fields.images.map(image => image.fields.file.url)
      
      let room = { ...item.fields, images, id }
      return room
    })
    return tempItems
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms]
    const room = tempRooms.find(room => room.slug === slug)
    return room
  }

  handleChange = event => {
    const {type, name} = event.target
    const value = type === 'checkbox' ? event.target.checked : event.target.value 
    this.setState(
      {
      [name]: value
      },
      this.filterRooms
    )
  }

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state

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

  render() {
    return (
      <RoomContext.Provider
        value={{ 
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}>
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}

const RoomConsumer = RoomContext.Consumer

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return <RoomConsumer>
      { value => <Component {...props} context={value} /> }
    </RoomConsumer>
  }
}

export { RoomProvider, RoomConsumer, RoomContext }