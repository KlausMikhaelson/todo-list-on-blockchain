import React from 'react'

const Connectwallet = ({connectWallet}) => {
  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
    <button style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10%", cursor: "pointer", padding: "15px", borderRadius: "10px"}} onClick={connectWallet}>Connectwallet</button>
    </div>
  )
}

export default Connectwallet