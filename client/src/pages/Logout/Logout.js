import React, { useEffect, useState } from 'react'

const Logout = _ => {
  
  useEffect(() => {
    sessionStorage.removeItem('userInfo')
    window.location.replace('/')
  }, [])

  return (
    <div className="container">
    </div>
  )
}

export default Logout