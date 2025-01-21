import React from 'react'

// internal Imports
import Style from "./SearchBar.module.css"

const SearchBar = () => {
  return (
    <div className={Style.searchBar} >
        <input type="text" placeholder='Search candidate by name or email'/>
    </div>
  )
}

export default SearchBar