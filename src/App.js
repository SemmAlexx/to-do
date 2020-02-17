/* eslint-disable no-lone-blocks */
import React, { Component } from 'react'
import collectionIcons from './components/collectionIcons'
import EditNote from './components/editNote'
import ClickedComment from './components/commentNote'
import CurrentNote from './components/currentNote'
import ChoiceSettings from './components/choiceSettings'
import fire from './fire'
import './App.css'
import * as firebase from 'firebase';
let uniqid = require('uniqid')

class App extends Component {
  constructor (props) {
    super(props)
   
    this.state = {
      notes: [],
      isActive: false,
      clickedEdit: false,
      clickedComent: false,
      openNote: false,
      choiseLocalStorage:false,
      choiseDataBase:false
    }
    // this.SelectedDataBase = this.SelectedDataBase.bind(this)
    // this.SelectedLocalStorage = this.SelectedLocalStorage.bind(this)
  }
  id = uniqid()
  componentWillMount(){
    let curentSelect = JSON.parse(localStorage.getItem("curentSelect"))

    if(curentSelect!==null){
      this.setState({choiseDataBase:curentSelect.choiseDataBase,choiseLocalStorage:curentSelect.choiseLocalStorage})
     }
  }
 componentDidMount(){

    if(this.state.choiseDataBase){

    this.setState({choiseLocalStorage:false,choiseDataBase:true})
    firebase.database().ref('notes').once('value').then(snapShot=>{
    snapShot.forEach(item=>{

        this.state.notes.push({
          id:item.key,
          noteTitle:item.val().noteTitle,
          noteBody:item.val().noteBody,
          comments:[]
        })

        {for(let key in item.val()){
         this.state.notes.map(el=>el.id===item.key&&item.val()[key].author!==undefined?
        el.comments.push({
          author:item.val()[key].author,
          comment:item.val()[key].comment,
          date:item.val()[key].date}):null)
        }}

    this.renderNotes()
    this.setState({})
  })
})
   }else{
   let returnObj = JSON.parse(localStorage.getItem("myKey"))
   this.setState({choiseLocalStorage:true,choiseDataBase:false})
   returnObj===null?this.renderNotes():

   returnObj.map(obj=>{
      this.state.notes.push({id:obj.id,noteTitle:obj.noteTitle,noteBody:obj.noteBody,comments:[]})
      obj.comments.map(elem=>{
      this.state.notes.map(item=>item.id===obj.id?item.comments.push({author:elem.author,comment:elem.comment,date:elem.date}):null)
     })
    console.log(this.state)
    this.renderNotes()
    this.setState({})
    })}
}


save = () =>{
 
  let noteTitle = document.querySelector('.inputTitle').value
  let noteBody = document.querySelector('.enterTextContent').value

  if(this.state.choiseDataBase){
    firebase.database().ref('notes').push({noteTitle:noteTitle,noteBody:noteBody})
    firebase.database().ref('notes').once('value').then(snapShot=>{
    this.state.notes.push(snapShot.val())
    })
  }else{
    
    this.state.notes.push({id:uniqid(), noteTitle:noteTitle,noteBody:noteBody,comments:[]})
    let curent = JSON.stringify(this.state.notes)
    localStorage.setItem("myKey", curent)
   }
}

deleteNote = e => {
  const Id = e.currentTarget.dataset.set
  if(this.state.choiseDataBase){
    
    firebase.database().ref('notes').child(Id).remove();
    const curentIndex=this.state.notes.findIndex(el=>el.id===Id)
    this.setState(this.state.notes.splice(curentIndex,1))

  }else{

    let returnObj = JSON.parse(localStorage.getItem("myKey"))
    const curentIndex=returnObj.findIndex(el=>el.id===Id)
    returnObj.splice(curentIndex,1)
    let curent = JSON.stringify(returnObj)
    localStorage.setItem("myKey", curent)
    this.setState(this.state.notes.splice(curentIndex,1))
   
  }
}

editNoteInDB=()=>{
  const curent = this.state.curentNote
  firebase.database().ref('notes').child(curent.id).update({noteTitle:curent.noteTitle,noteBody:curent.noteBody})
}

SelectedDataBase=()=>{
  let curentSelect = JSON.stringify({choiseLocalStorage:false,choiseDataBase:true})
  localStorage.setItem("curentSelect", curentSelect)
  // this.setState({choiseLocalStorage:false,choiseDataBase:true,notes:[]})
  this.state.choiseLocalStorage=false
  this.state.choiseDataBase=true
  this.state.notes=[]
  this.closeModal()
  this.componentDidMount()
}

SelectedLocalStorage=()=>{
  let curentSelect = JSON.stringify({choiseLocalStorage:true,choiseDataBase:false})
  localStorage.setItem("curentSelect", curentSelect)
 // this.setState({choiseLocalStorage:true,choiseDataBase:false,notes:[]})
    this.state.choiseLocalStorage=true
    this.state.choiseDataBase=false
    this.state.notes=[]
    this.closeModal()
    this.componentDidMount()
}
    
  
curentTime = () => {
  const curentDate = new Date()
  return curentDate
    .toLocaleDateString()
    .concat(' ', curentDate.toLocaleTimeString())

}
  
renderNotes = () => {
  return this.state.notes.map(el => (
     
      <div  className='col-3 note'>
        <div>
          <h2 className='noteTitle col-12'> {el.noteTitle}</h2>
          <p className='noteBody col-12'> {el.notebBody} </p>
        </div>
        <div className='iconsContainer col-12'>
          <button
            title='Edit note'
            data-set={el.id}
            onClick={e => this.editNote(e)}
            className='iconButton col-3'>
            {collectionIcons.edit}
          </button>
          <button
            title='Leave a comment'
            data-set={el.id}
            onClick={e => this.leaveComment(e)}
            className='iconButton col-3'>
            {collectionIcons.comment}
          </button>
          <button
            title='Delete note'
            data-set={el.id}
            onClick={e => this.deleteNote(e)}
            className='iconButton col-3'>
            {collectionIcons.delete}
          </button>
          <button
            onClick={e => this.openNotes(e)}
            title='View comments'
            data-set={el.id}
            className='iconButton col-3 buttonComments'>
           {collectionIcons.comments}
          <span className='numbersComments'>{el.comments.length}</span>
          </button>
        </div>
      </div>
    ))
  }

  

changeNote = e => {
  const Id = e.currentTarget.dataset.set
  const curentNote = this.state.notes.find(el => el.id === Id)
  this.setState({ curentNote: curentNote })
}

saveModifiedNotes = e => {
  const newTitle = document.querySelector('.model__changeTitle').value
  const newBody = document.querySelector('.model__changeBody').value
  const Id = e.currentTarget.dataset.set
  const curentNote = this.state.notes.find(el => el.id === Id)
  const changeTitle = (curentNote.noteTitle = newTitle)
  const changeBody = (curentNote.noteBody = newBody)

    if(this.state.choiseDataBase){

      this.setState({
        clickedEdit: false,
        noteTitle: changeTitle,
        noteBody: changeBody,
        curentNoteId:Id
      })
      this.editNoteInDB(e)

    }else{

      let editetNote = JSON.stringify(this.state.notes)
      localStorage.setItem("myKey", editetNote)
      this.setState({clickedEdit:false})
    }
}
  
  modalWindow = () => {
    const { clickedEdit, clickedComent, openNote,clickedSettings } = this.state
    const Edit = EditNote
    const Comment = ClickedComment
    const Note = CurrentNote
    const Settings = ChoiceSettings
    const curentNote = this.state.curentNote
   
    return (
      <>
       {clickedEdit ? 
          <Edit
            saveModifiedNotes={this.saveModifiedNotes}
            curentNote={curentNote}/>:null
        }

        {clickedComent ? 
          <Comment
            addComment={e => this.addComment(e)}
            curentNote={curentNote}/>: 
         null
        }

        {openNote ? 
          <Note closeModal={this.closeModal}
           curentNote={curentNote} />: 
          null
        }

        {clickedSettings?<Settings SelectedLocalStorage={this.SelectedLocalStorage} SelectedDataBase={this.SelectedDataBase}/>: 
          null}
      </>
    )
  }
 
 
  openWindow = e => {
    this.modalWindow(e)
  }

  editNote = e => {
    this.changeNote(e)
    
    this.setState({ clickedEdit: true })
  }

  leaveComment = e => {
    this.changeNote(e)
    
    this.setState({ clickedComent: true })
  }

  openNotes = e => {
   this.changeNote(e)
   this.setState({ openNote: true })
  }

  closeModal = () => {
    this.setState({ openNote: false })
    this.setState({clickedSettings:false})
  }
  openSettings=(e)=>{
    e.preventDefault()
   this.setState({clickedSettings:true})
    }

    toUpperCase = e => {
      const Id = e.currentTarget.dataset.set
      const curentNote = this.state.notes.find(el => el.id === Id)
      let author = curentNote.comments
    
      for(let key in author){

      let string = author[key].author
      let splits = string.split(" ");
      let stringItog = "";
        for (let i = 0; i < splits.length; i++) {
        let Name = splits[i];
        let First = Name.substring(0, 1).toUpperCase();
        let Leftovers = Name.substring(1, Name.length)
        stringItog += First + Leftovers + " ";
      }

    author[key].author =stringItog
    }
  }

  addComment = e => {
    const curent = this.state.curentNote
    const curentId = this.state.notes.find(el => el.id === curent.id)
    const firstName = document.querySelector('.model__author--firstName').value
    const secondName = document.querySelector('.model__author--secondName').value
    const currentComment = document.querySelector('.model__comment').value
    const object = {
      id:curent.id,
      author: firstName+'  '+secondName,
      comment: currentComment,
      date: this.curentTime()
    }
    firstName === '' || secondName === ''||currentComment===''
      ? alert('All fields must be filled')
      : this.setState({ clickedComent: false, clickedEdit: false }) ||
        curentId.comments.push(object)
        
    this.setState({ openNote: false })
    this.toUpperCase(e)
    if(this.state.choiseDataBase){
      firebase.database().ref('notes').child(curent.id).push(object)
    }else{
      const addedComments =JSON.stringify(this.state.notes)
      localStorage.setItem("myKey", addedComments)
    }
    
  }

  render () {
    const RenderNotes = this.renderNotes
    const Modal = this.modalWindow
    return (
      <>
        <div key={uniqid()}className='container-fluid'>
          <div key={uniqid()}className='col-2 logo'>{collectionIcons.logo}
          </div>
          <form key={uniqid()}className='container'>
             <input
              className='col-8 inputTitle'
              placeholder={'Enter a note name'}
              type='text'/>
             <textarea
              className='col-8 enterTextContent'
              placeholder={'Enter note text'}
              type='text'/>
              <div key={uniqid()}className='containeButtons'>
                <button className='containeButtons__button' title='Add note' onClick={e=>this.save(e)} >
                  {collectionIcons.add}
                </button>
                <button key={uniqid()}title='Settings'onClick={e=>this.openSettings(e)}     className='containeButtons__button'>   
                  {collectionIcons.settings}
                </button>
              </div>
          </form>
          <div key={uniqid()} className='container-fluid'>
            <div key={uniqid()}className='notesContainer'>
              <RenderNotes key={uniqid()}/>
            </div>
          </div>
          <Modal/>
        </div>
      </>
    )
  }
}

export default App


      
  