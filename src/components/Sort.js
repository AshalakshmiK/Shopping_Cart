import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import React,{Component} from 'react';
import {connect} from 'react-redux'
import Popup from "reactjs-popup";

import {fetchProducts,sortByPrice} from '../actions/productActions'


class Sort extends Component{
    
    handleRadioChange=(event)=> {
        // set the new value of checked radion button to state using setState function which is async funtion
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
      render(){
        if(this.props.isMobile || window.innerWidth<600){
            return <div>
             <Popup trigger={<button className="button"><FontAwesomeIcon icon={faSort} 
             style={{"color":"black"}}/> Sort </button>} 
                modal>
                 {close => (
                    <div className="popupSort">
                    <input type="radio" name="sort" onChange={this.handleRadioChange} checked={this.props.sortType === "ascending"} value="ascending"
                    onClick={()=>this.props.sortByPrice(this.props.products,"ascending",this.props.searchTerm,this.props.range)}/>Price -- Low High<br/>

                    <input type="radio" name="sort" onChange={this.handleRadioChange}  checked={this.props.sortType === "descending"} value="descending"
                    onClick={()=>this.props.sortByPrice(this.props.products,"descending",this.props.searchTerm,this.props.range)}/>Price -- High Low<br/>

                    <input type="radio" name="sort" onChange={this.handleRadioChange} checked={this.props.sortType === "discount"} value="discount"
                    onClick={()=>this.props.sortByPrice(this.props.products,"discount",this.props.searchTerm,this.props.range)}/>Discount<br/>
                       
                    <button className="button" onClick={close}>
                        Apply
                       </button>
                    
                    </div>
                )}
            </Popup>
           </div>
        }else{
            return(
                <div>
                <ul>
                    <li>
                    <b>Sort By</b></li>
                            
                   <li> <span style={{color:this.props.sortType==="ascending"?"blue":"black",textDecoration:this.props.sortType==="ascending"?"underline":""}}
                     onClick={()=>this.props.sortByPrice(this.props.products,"ascending",this.props.searchTerm,this.props.range)}>
                     Price -- Low High</span></li>
                   <li> <span style={{color:this.props.sortType==="descending"?"blue":"black",textDecoration:this.props.sortType==="descending"?"underline":""}} 
                    onClick={()=>this.props.sortByPrice(this.props.products,"descending",this.props.searchTerm,this.props.range)}>
                    Price -- High Low</span></li>

                   <li> <span style={{color:this.props.sortType==="discount"?"blue":"black",textDecoration:this.props.sortType==="discount"?"underline":""}} 
                    onClick={()=>this.props.sortByPrice(this.props.products,"discount",this.props.searchTerm,this.props.range)}>
                    Discount</span></li>
                 </ul>   
                </div>
            )
        }
        
    }
}

const mapStateToProps=state=>(
    { 
        products:state.products.items,
        range:state.products.range,
        sortType:state.products.sort,
        searchTerm:state.products.searchTerm,
    })

export default connect(mapStateToProps,{sortByPrice,fetchProducts})(Sort);