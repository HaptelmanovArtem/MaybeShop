import React from 'react';

class Select extends React.Component{
    render(){
        return(
            <>
                <select name={this.props.name} 
                    // size={this.props.size} 
                    onChange={this.props.HandleChangeField} 
                    value={this.props.value} 
                    className="addproduct-input"
                    >
                        <option value={null}>{this.props.text}</option>
                        {this.props.arraytypes.map(item=>
                            <option key = {item.id} value={item.id}>
                                {item.name}
                            </option>)}
                </select>
            </>
        )
    }
}

export default Select;