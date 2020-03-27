import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react';
import {connect} from 'react-redux'

import {search} from '../actions/productActions'

class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            searchvisibility:"none",
            searchTerm:"",
            //item:[]
        }
    }
    displaySearchIcon=()=>{
        if(this.state.searchvisibility===""){
            this.setState({
                searchvisibility:"none"
            })
        }
        else if(this.state.searchvisibility==="none"){
            this.setState({
                searchvisibility:""
            })
        }
       
    }

    
    render(){
      
        return(
            <React.Fragment>
                <input type="text" onChange={this.props.onChange} style={{display:this.state.searchvisibility}} name="searchTerm" autoFocus/>
                <FontAwesomeIcon className="searchicon" onClick={this.displaySearchIcon} icon={faSearch}>
                Search</FontAwesomeIcon>
            </React.Fragment>
        )
    }      
}


const mapStateToProps=state=>(
    { 
        products:state.products.items,
    })
export default connect(mapStateToProps,{search})(Search);