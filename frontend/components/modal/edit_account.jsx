import React from 'react';
import { Redirect } from 'react-router-dom';
import '../modal/modal.css'

class EditAccount extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {

        }
    }

    handleSubmit(e){

        
    }

    render(){
        if (this.state.redirect === true){
        this.props.closeModal();
        return (
          <Redirect to={`/users`}/>
        )
      }
        

        return(
            <div className='modal-form'>
                <form onSubmit={this.handleSubmit}>
                    <div className='modal-box'>

                        <input id='modal-btn' type="submit" value="Edit Account"/>
                    </div>
                </form>
            </div>
        )
    }

}

export default EditAccount