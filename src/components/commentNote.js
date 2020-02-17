/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import collectionIcons from '../components/collectionIcons'

class ClickedComment extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const curentNote = this.props.curentNote
        const addComment = this.props.addComment
        return ( 
            <div key={curentNote.id}className = 'model'>
                <div className = 'container'>
                    <div className = 'model__openModalContainer col-8'>
                        <h3 className = 'model__change'> Title </h3>  
                        <p className = 'col-12 model__change model__changeTitle'> {curentNote.noteTitle} </p>  
                        <h3 className = 'model__change'> Body </h3> 
                        <p className = 'col-12 model__change model__changeBody--comment'> {curentNote.noteBody} </p>  
                        <div>
                            <input className = 'col-8 model__author model__author--firstName'
                            placeholder = 'Enter first name'/>
                            <input className = 'col-8 model__author model__author--secondName'
                            placeholder = 'Enter last name'/>
                            <textarea className = 'col-12 model__comment'
                            placeholder = 'Enter a comment'/>
                        </div>  
                        <button data-set = {curentNote.id}
                        className = 'model__buttonSave model__buttonSave--comment'
                        onClick = { addComment } > {collectionIcons.save} </button>  
                    </div>
                </div>  
            </div>
        )
    }
}
export default ClickedComment