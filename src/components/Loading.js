import React from 'react'
import loadingGif from '../images/gif/loading-arrow.gif'

export default function Loading() {
  return (
    <div className="loading">
      <span className="loading-span">rooms data loading</span>
      <img src={loadingGif} alt="loadingGif" />
    </div>
  )
}
