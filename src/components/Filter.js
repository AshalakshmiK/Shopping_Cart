import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import React,{Component} from 'react';
import InputRange from 'react-input-range';
import '!style-loader!css-loader!react-input-range/lib/css/index.css'
import Popup from "reactjs-popup";
import {connect} from 'react-redux'

import {fetchProducts,filterByPriceRange} from '../actions/productActions';


class Filter extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        value: { min: 100, max: 1000 },
        minValue:100,
        maxValue:1000
      }
    }
  onChangeComplete=(val)=>{
   // console.log("value",this.state.value)
      this.props.filterByPriceRange(this.props.productswithoutfilter,val,this.props.sortType,
      this.props.searchItems,this.props.searchTerm,this.state.minValue,
      this.state.maxValue,this.props.filter)
  }
    render() {
      if(this.props.isMobile || window.innerWidth<600){
        if(this.props.searchItems.length){
          return(
            <div>
            <Popup  trigger={<button className="button"><FontAwesomeIcon icon={faFilter} 
            style={{"color":"black"}}/> Filter </button>} 
               modal>
                {close => (
                   <div className="popupFilter">
                   <h4>Filters</h4> <br/><br/>
                   <InputRange 
                   className="inputrange"
                   step={100}
                   maxValue={this.state.maxValue}
                   minValue={this.state.minValue}
                   value={this.state.value}
                   onChange={value => this.setState({ value })} 
                   onChangeComplete={value => this.onChangeComplete(value)}/> 
                       <button className="button" onClick={close}>
                       Apply
                      </button>
                   </div>
               )}
           </Popup>
  
            </div>
          )
        }else{
          return ""
        }
        
      }else{
        if(this.props.searchItems.length===0 && this.props.searchTerm.length){
          return ""
      }else{
        return (
          <div>
          <h4>Filters</h4> <br/><br/>
            <InputRange
            className="inputrange"
            step={100}
            maxValue={1000}
            minValue={100}
            value={this.state.value}
            onChange={value => this.setState({ value })} 
            onChangeComplete={value => this.onChangeComplete(value)}/>
      </div>);
      }     
      }
     
    }
  }
  
  const mapStateToProps=state=>(
    { 
        cartItems:state.cart.items,
        filter:state.filter,
        productswithoutfilter :state.products.items,
        sortType:state.products.sort,
        searchItems:state.products.searchItems,
        searchTerm:state.products.searchTerm
    })

    export default connect(mapStateToProps,{filterByPriceRange,fetchProducts})(Filter);