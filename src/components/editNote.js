/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import collectionIcons from '../components/collectionIcons'

class EditNote extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        const curentNote = this.props.curentNote
        const saveModifiedNotes = this.props.saveModifiedNotes
        return (
          
            <div key={curentNote.id}className = 'model' >
                <div className = 'container' >
                    <div className = 'model__openModalContainer col-8' >
                        <h3 className = 'model__change' > Edit note title </h3> 
                        <input className = 'col-12 model__change model__changeTitle'
                        defaultValue = {curentNote.noteTitle}
                        type = 'text'/>
                        <h3 className = 'model__change' > Edit note body </h3> 
                        <textarea className = 'col-12 model__change model__changeBody'
                        defaultValue = {curentNote.noteBody}
                        type = 'text'/>
                        <button data-set = {curentNote.id}
                        className = 'model__buttonSave model__buttonSave--comment'
                        onClick = {saveModifiedNotes} > {collectionIcons.save} </button> 
                    </div> 
                </div> 
            </div>
        
        )
}
}
export default EditNote