import { useState } from 'react';
import PropTypes from 'prop-types';
import {AiOutlineSearch} from 'react-icons/ai'

export const Searchbar=({onSubmitSearch})=> {
  const [search, setSearch]=useState('')
//   state = { search: '' };

  const handleSubmit = e => {
    // console.log(e.target.value)
    // console.log(this.props)
    e.preventDefault();
    onSubmitSearch(search);
    setSearch('');
  };


const handleChange  = e => {
  const{value}=e.target
  setSearch(value.toLowerCase());
};

 
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm_button">
            <span className="SearchForm-button-label">Search</span>
            <AiOutlineSearch size={"30px"}/>
          </button>
          <input 
          onChange={handleChange}
          name="search"
            className="SearchForm-input "
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
          />
        </form>
      </header>
    );
  }


Searchbar.propType={onSubmitSearch:PropTypes.func.isRequired}