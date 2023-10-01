import React from 'react'
import { FormGroup } from 'reactstrap'
import { Input, InputGroup, InputGroupText } from 'reactstrap'
import { RiSearchLine } from 'react-icons/ri'

export default function Searchbar(props) {
  
  return (
    <div style={{width: "40%"}}>
    <FormGroup>
      <InputGroup>
        <InputGroupText style={{border: "1px solid gray"}}>
          <RiSearchLine/>
        </InputGroupText>
        <Input
          id="exampleSearch"
          name="search"
          placeholder="Buscar por nombre ..."
          type="search"
          onChange={props.searcher}
          style={{border: "1px solid gray"}}
        />
      </InputGroup>
    </FormGroup></div>
  )
}