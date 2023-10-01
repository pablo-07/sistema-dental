import React, { useState, useEffect } from 'react'
import { Input, Button } from 'reactstrap'
import { IconContext } from 'react-icons'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    // Llamar al callback solo cuando cambia el valor del input
    onSearch(searchTerm)
  }, [searchTerm]) // Añadir searchTerm como dependencia

  // const handleSearch = () => {
  //   onSearch(searchTerm)
  // }

  const toggleInput = () => {
    setShowInput(!showInput)
    setSearchTerm('') // Limpiar el término de búsqueda al ocultar el input
  }

  return (
    <div>
      {!showInput ? (
        <Button color='primary' outline onClick={toggleInput}>
          <AiOutlineSearch />
        </Button>
      ) : (
        <div style={{display: "flex"}}>
          <Input
          className='inputBuscar'
            type="text"
            placeholder="Buscar registros"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{width: "50%"}}
          />

          <Button color="danger" outline onClick={toggleInput}>
            <FaTimes />
          </Button>
        </div>
      )}
    </div>
  )
}

export default SearchInput
