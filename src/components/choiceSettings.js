/* eslint-disable no-useless-constructor */

import React, { Component } from 'react'
import collectionIcons from '../components/collectionIcons'


class ChoiceSettings extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        
        const SelectedDataBase = this.props.SelectedDataBase
        const SelectedLocalStorage = this.props.SelectedLocalStorage
        return ( 
            <div className = 'model'>
                <div className = 'container'>
                    <div className = 'model__openModalContainer model__openModalContainer--settings col-8'>
                        <h3 className = 'model__change'>Choose a provider to save data</h3>
                        <div className='model__buttonContainer'>
                            <div>
                                <button onClick={SelectedDataBase}title='Save in database' className='model__buttonContainer--button'>{collectionIcons.database}</button>
                            
                                <strong>Firebase</strong>
                            </div>
                            <div>
                                <button onClick={SelectedLocalStorage} title='Save in LocalStorage' className='model__buttonContainer--button'>{collectionIcons.localhost}</button>
                                
                                <strong>LocalStorage</strong>
                            </div>
                        </div> 
                        <button title='Close Window'  className = 'model__buttonSave'>{collectionIcons.save} </button> 
                    </div>
                </div>  
            </div>
        )
    }
}
export default ChoiceSettings