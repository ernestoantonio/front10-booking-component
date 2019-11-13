import React, { Component } from 'react'
import { Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture, faPlaneArrival } from '@fortawesome/free-solid-svg-icons'

const Places = [
    { id:0, airport: 'Airport1', city: 'Miami' },    
    { id:1, airport: 'Airport2', city: 'Orlando' },
    { id:2, airport: 'Airport6', city: 'New York' },
    { id:3, airport: 'Airport7', city: 'Los Angeles' },    
    { id:4, airport: 'Airport10', city: 'Tampa' },
    { id:5, airport: 'Airport3', city: 'La Habana' },
    { id:6, airport: 'Airport4', city: 'Santa Clara' },
    { id:7, airport: 'Airport5', city: 'Santiago de Cuba' },
    { id:8, airport: 'Airport8', city: 'Cienfuegos' },    
    { id:9, airport: 'Airport11', city: 'Varadero' },
]

export default class SelectPlace extends Component {

    constructor(props) {
        super(props)
        this.state = {
            placeTyped: ""
        }
    }

    choice = (el) => this.props.choicePlace(el.city)    

    handleInputChange = (event) => this.setState({placeTyped: event.target.value})

    handleRender = () => {
        const { placeTyped } = this.state
        const { type } = this.props

        return (
            <div>
                <div className="container col-12 position-absolute  
                                border border-primary rounded bg-white "
                                style={{zIndex:1058}}
                     >
                    <div className="d-flex align-items-stretc align-items-center flex-fill mt-2 mb-4">
                        <FontAwesomeIcon icon={(type === 'o') ? faPlaneDeparture : faPlaneArrival} ></FontAwesomeIcon>
                        <Input name="place" id="idPlace" placeholder="choice a place"
                            className="border-0"
                            value={placeTyped}
                            onChange={this.handleInputChange} />
                    </div>
                    {
                        Places.filter(word => (word.city.toLowerCase().includes(placeTyped.toLowerCase()) 
                                                || word.airport.toLowerCase().includes(placeTyped.toLowerCase()) 
                                            )
                                    ).map(n => {
                            return (
                                <div key={n.id}
                                    className="d-flex align-items-start flex-column border-bottom 
                                                border-ligth"
                                    onClick={event => this.choice(n)}>
                                    <p className="font-weight-bold m-0 mt-2">{n.city}</p>
                                    <p className="text-secondary font-weight-lighter mb-1">{n.airport}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        );
    };

    render() {
        return this.handleRender();
    }

}