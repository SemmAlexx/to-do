/* eslint-disable no-useless-constructor */

import React, { Component } from 'react'
import collectionIcons from '../components/collectionIcons'
class CurrentNote extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const curentNote = this.props.curentNote
        const closeModal = this.props.closeModal
        
return(
    <div className='model'>
        <div className='container'>
            <div className='model__openModalContainer col-8'>
                <h3 className='model__change'>Title</h3>
                <p className='col-12 model__change model__changeTitle'>{curentNote.noteTitle}</p>
                <h3 className='model__change'>Body</h3>
                <p className='col-12 model__change model__changeBody--comment'>{curentNote.noteBody}</p>
                {curentNote.comments.map(el=><div className='commentContainer'><h5 className='col-8'>Author: {el.author}</h5><p className='col-12'>Comment: {el.comment}</p><p className='col-12 comentDate'>Date: {el.date}</p></div>)}
                <button data-set={curentNote.id} onClick={closeModal} className='model__buttonSave model__buttonSave--comment'>{collectionIcons.save}</button>
            </div>
        </div>
    </div>
)
}
}
export default CurrentNote