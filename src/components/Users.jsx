import React from 'react'
import { useState, useEffect } from 'react'
import avatarMan from '../assets/avatar-man.svg'
import avatarWoman from '../assets/avatar-woman.svg'
import { v4 as uuidv4 } from 'uuid'
import AddUserModal from './AddUserModal'
import '../style/users.css'

const Users = () => {

  const [context, setContext] = useState('')
  const [popInVisible, setPopInVisible] = useState(false)
  const [userToEdit, setUserToEdit] = useState(null)
  
  useEffect(() => {
    console.log('composant chargé');
  }, [])

  const [users, setUsers] = useState([
    { id: '1', firstname: 'John', lastname: 'Doe', age: 25, gender: 'Homme', photo: avatarMan, },
    { id: '2', firstname: 'Jane', lastname: 'Smith', age: 30, gender: 'Femme', photo: avatarWoman, },
    { id: '3', firstname: 'Michael', lastname: 'Johnson', age: 28, gender: 'Homme', photo: avatarMan, },
    { id: '4', firstname: 'Emily', lastname: 'Williams', age: 22, gender: 'Femme', photo: avatarWoman, },
    { id: '5', firstname: 'David', lastname: 'Brown', age: 35, gender: 'Homme', photo: avatarMan, },
    { id: '6', firstname: 'Emma', lastname: 'Jones', age: 27, gender: 'Femme', photo: avatarWoman, },
    { id: '7', firstname: 'Daniel', lastname: 'Miller', age: 29, gender: 'Homme', photo: avatarMan, }
  ])

  function addUser(firstname, lastname, age, gender) {
    let photo = avatarMan
    if (gender === 'Femme' || gender === 'Autre') {
      photo = avatarWoman
    }
    setUsers([...users, {
      id: uuidv4(),
      firstname: firstname,
      lastname: lastname,
      age: age,
      gender: gender,
      photo: photo
    }])
  }

  function updateUser(firstname, lastname, age, gender, id) {
    let copyUsers = [...users]
    let index = copyUsers.findIndex((u) => u.id === id)
    copyUsers[index].firstname = firstname
    copyUsers[index].lastname = lastname
    copyUsers[index].age = age
    copyUsers[index].gender = gender
    setUsers(copyUsers)
  }

  function deleteUser(id) {
    let copyUsers = [...users].filter((u) => u.id !== id)
    setUsers(copyUsers)
  }

  function closePopIn() {
    setPopInVisible(false)
  }


  return (
    <>
      <button className='addUser' onClick={() => {
        setPopInVisible(true)
        setContext('add')
      }}>Ajouter un utilisateur</button>
      {popInVisible && <AddUserModal addUser={addUser} closePopIn={closePopIn} context={context} userToEdit={userToEdit} updateUser={updateUser} deleteUser={deleteUser}/>}
      <div className='usersContainer'>
        {users.map((user, index) => {
          return (
            <div key={index} className="userCard" onClick={() => {
              let newUsers = [...users]
              let index = newUsers.findIndex((u) => u.id === user.id)
              console.log(newUsers[index])
              setUserToEdit(newUsers[index])
              setPopInVisible(true)
              setContext('edit')
            }}>
              <img src={user.photo} alt="profil" />
              <p>{user.firstname} {user.lastname}</p>
              <p>Age : {user.age} ans</p>
              <p>Genre : {user.gender}</p>
            </div>
          )
          
        })}
      </div>
    </>
  )
}

export default Users