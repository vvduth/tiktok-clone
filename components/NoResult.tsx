import React from 'react'
interface Iprops {
    text: string 
}

const NoResult = ({text}: Iprops) => {
  return (
    <div>
      No Result
    </div>
  )
}

export default NoResult
