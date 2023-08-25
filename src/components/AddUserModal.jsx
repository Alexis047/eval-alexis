import React from 'react'
import { useState } from 'react'
import '../style/addUserModal.css'
import { useEffect } from 'react'

const AddUserModal = ({addUser, closePopIn, context, userToEdit, updateUser, deleteUser}) => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (context === 'edit') {
      setFirstname(userToEdit.firstname)
      setLastname(userToEdit.lastname)
      setAge(userToEdit.age)
      setGender(userToEdit.gender)
    }
  }, [])


  return (
    <div className="addUserForm">
      <form onSubmit={(e) => {
        e.preventDefault()
        if(firstname === "" || lastname === "" || age === "" || gender === "") {
          setMessage("Vous devez remplir tous les champs")
        } else {
          if(context === 'add') {
            addUser(firstname, lastname, age, gender)
          } else {
            updateUser(firstname, lastname, age, gender, userToEdit.id)
          }
          closePopIn()
        }
        
      }}>
        <h1>{context === 'add' ? 'Ajouter' : 'Modifier'} un utilisateur</h1>
        <p>{message}</p>
        <div className="labelContainer">
          <label htmlFor="firstname">Prénom : </label>
          <input value={firstname} type="text" onChange={(e) => { setFirstname(e.target.value) }} />
        </div>
        <div className="labelContainer">
          <label htmlFor="lastname">Nom : </label>
          <input value={lastname} type="text" onChange={(e) => { setLastname(e.target.value) }} />
        </div>
        <div className="labelContainer">
          <label htmlFor="age">Age : </label>
          <input value={age} type="text" onChange={(e) => { setAge(e.target.value) }} />
        </div>
        <div className="labelContainer">
          <label htmlFor="gender">Genre : </label>
          <select value={gender} onChange={(e) => { setGender(e.target.value) }}>
            <option value="">Choisir</option>
            <option value="Autre">Autre</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>
        <div className="btnContainer">
          <button type='submit'>{context === 'edit' ? 'Editer' : 'Ajouter'}</button>
          <button onClick={() => {
            closePopIn()
          }}>Fermer</button>
          
        </div>
      </form>
      {context === 'edit' && <button onClick={() => {
            deleteUser(userToEdit.id)
            closePopIn()
          }}>Supprimer</button>}
    </div>
  )
}

export default AddUserModal