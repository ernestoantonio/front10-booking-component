import React, { Component } from 'react';
import { DateRangePicker  } from 'react-date-range';

export default class CustomDateRangePicker extends Component {

	
	constructor(props) {
        super(props)        
        this.state = {
            selectionRange: {
				startDate: new Date(),
				endDate: new Date(),
				key: 'selection',
			}
        }
        
    }

	handleSelect = (ranges) => {
		this.setState({selectionRange:ranges.selection})
		this.props.onChange(ranges);
	}	 
		
	
	render(){		
		return (
			<div>
				<DateRangePicker className="container col-12 p-0 position-absolute  
					border bg-white"
					ranges={[this.state.selectionRange]}
					onChange={this.handleSelect}
				/>
			</div>
		)
	}
}