import { faAngleLeft, faAngleRight, faCalendarAlt, faExchangeAlt, faPlaneArrival, faPlaneDeparture, faSearch, faAngleDown, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import SelectPlace from './SelectPlace';
import CustomDateRangePicker from './CustomDateRangePicker';

const FlightTypes = [
    { id:'ft01', type: 'Round-trip' },
    { id:'ft02', type: 'One-way' },
    { id:'ft03', type: 'Multi-city' }
]

const CountPersons = [
    { id:'cp01', type: 'Adult', espec: '18-64' },
    { id:'cp02', type: 'Senior', espec: '65+' },
    { id:'cp03', type: 'Youth', espec: '12-17' },
    { id:'cp04', type: 'Child', espec: '2-11' },
    { id:'cp05', type: 'Seat Infant', espec: 'under 2' },
    { id:'cp06', type: 'Lap Infant', espec: 'under 2' }
]

const FlightClass = [
    { id:'fc01', type: 'Economy' },
    { id:'fc02', type: 'Premium Economy' },
    { id:'fc03', type: 'Business' },
    { id:'fc04', type: 'First' },
    { id:'fc05', type: 'Multile' }
]

const Places = [
    { id:0, airport: 'Airport1', city: 'Miami' },    
    { id:1, airport: 'Airport2', city: 'Orlando' },
    { id:2, airport: 'Airport6', city: 'New York' },
    { id:3, airport: 'Airport7', city: 'Los Angeles' },    
    { id:4, airport: 'Airport10', city: 'Tampa' },  

    
    
]

const Places2 = [
    { id:5, airport: 'Airport3', city: 'La Habana' },
    { id:6, airport: 'Airport4', city: 'Santa Clara' },
    { id:7, airport: 'Airport5', city: 'Santiago de Cuba' },
    { id:8, airport: 'Airport8', city: 'Cienfuegos' },    
    { id:9, airport: 'Airport11', city: 'Varadero' },
]


const joinPlaces = () => {
    let placesJoined = [];
    
    for (const p1 of Places) {
        for (const p2 of Places2) {
            placesJoined.push({
                id: `o${p1.id}-d${p2.id}`, origin: p1, destino: p2, ida: true
            })
            placesJoined.push({
                id: `o${p2.id}-d${p1.id}`, origin: p2, destino: p1, ida: false
            })
        }
    }    
    return placesJoined
}


const Companies = [
    {id:0, 
        company:'American Airlines', 
        hrSalidaIda: '07:00 am', 
        hrLlegadaIda: '08:20 am', 
        hrSalidaRegreso: '02:00 pm', 
        hrLlegadaRegreso: '03:40 pm',
        prices:{
            economy: 110,
            premium_economy: 100,
            business: 120,
            first: 150,
            multile: 100
        }
    }, 
    {id:1, 
        company:'Delta',             
        hrSalidaIda: '09:00 am', 
        hrLlegadaIda: '10:20 am', 
        hrSalidaRegreso: '04:00 pm', 
        hrLlegadaRegreso: '05:40 pm',
        prices:{
            economy: 120,
            premium_economy: 110,
            business: 130,
            first: 160,
            multile: 100
        }
    },  
    {id:2, 
        company:'Jet Blues',         
        hrSalidaIda: '11:00 am', 
        hrLlegadaIda: '12:20 pm', 
        hrSalidaRegreso: '06:00 pm', 
        hrLlegadaRegreso: '07:40 pm',
        prices:{
            economy: 140,
            premium_economy: 130,
            business: 130,
            first: 170,
            multile: 90
        }
    }, 
]

const flightsCompanies = () => {
    const placesJoined = joinPlaces();
    const rutaCompanies = []
    for (const company of Companies) {
        for (const ruta of placesJoined) {
            for (let j = 1; j < 30; j++){ 
                let idn = `c${company.id}-${ruta.id}-${j}`;
                rutaCompanies.push(
                    {...ruta, ...company, date: new Date(2019, 11, j), id: idn}
                )
            }
        }
    }    
    return rutaCompanies;
}

const Flights = flightsCompanies()

export default class Booking extends Component {

    constructor(props) {
        super(props)
        this.gccp1 = React.createRef()
        this.gccp2 = React.createRef()
        this.state = {
            origin: '...',
            destino: '...',
            showOrigin: false,
            showDestination: false,
            showDateRange: false,
            ddOpenflightType: false,
            ddOpenCountPersons: false,
            ddOpenCountPersons2: false,
            ddOpenFlightClass: false,
            flightType: "",
            idflightType: "",
            countPersons: "",
            idcountPersons: "",
            flightClass: "",
            idflightClass: 'fc01',
            startDate: new Date(),
            endDate: new Date(),
            startDateString: this.customFormatDate(new Date()),
            endDateString: this.customFormatDate(new Date()),
            hasflights: false
        }
        
    }

    /*===================Life Cycle Methods======================*/
    componentDidMount(){
        this.setState({
            flightType: FlightTypes[0].type,
            countPersons: CountPersons[0].type,
            countPersons2: CountPersons[2].type,
            flightClass: FlightClass[0].type
        })
    }

    componentDidUpdate(prevProps, prevState) {
        
    }
    /*===================End of Life Cycle Methods======================*/

    /*===================Combos===========================*/
    renderGenericCombo = (type, aux) => {
        const nArray = (type === 'FT') ? FlightTypes : ((type === 'CT') ? FlightClass : CountPersons)
        const sValue = (type === 'FT') ? this.state.flightType : ((type === 'CT') ? this.state.flightClass : this.state.countPersons)
        let tFunction = (type === 'FT') ? this.toggleFlightType : ((type === 'CT') ? this.toggleFlightClass : this.toggleCountPersons)
        const onChangeFun = (type === 'FT') ? this.onChangeFlightType : ((type === 'CT') ? this.onChangeFlightClass : this.onChangeCountPersons)
        let dOpen = (type === 'FT') ? this.state.ddOpenflightType : ((type === 'CT') ? this.state.ddOpenFlightClass : this.state.ddOpenCountPersons)
        if (type === 'CP' && aux === 2)
        {
            tFunction = this.toggleCountPersons2
            dOpen = this.state.ddOpenCountPersons2
        }

        
        return (
            <>
            <Dropdown isOpen={dOpen} toggle={tFunction}>
                <DropdownToggle color="" className="d-flex flex-row align-items-center">
                    {sValue}
                    <FontAwesomeIcon icon={faAngleDown} className="ml-2" ></FontAwesomeIcon>
                </DropdownToggle>
                <DropdownMenu className="mt-n5 ml-n1">
                    {
                        nArray.map(el => {
                            return(
                                <div key={'divitem' + el.id + '-' + aux}>
                                    {type === 'CP' && 
                                        <DropdownItem>
                                            <div className="d-flex flex-row justify-content-between">
                                                    <div onClick={() => { onChangeFun(el.type) }}>
                                                        <div className="d-inline">{el.type}</div>
                                                        <div className="d-inline text-secondary">&nbsp;{el.espec}</div>
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faMinus} className="mx-2" ></FontAwesomeIcon>
                                                        {0}
                                                        <FontAwesomeIcon icon={faPlus} className="ml-2" ></FontAwesomeIcon>
                                                    </div>
                                            </div>
                                        </DropdownItem>
                                    }
                                    {type !== 'CP' &&
                                        <DropdownItem>
                                            <div onClick={() => onChangeFun(el.type, el.id)}>{el.type}</div>
                                        </DropdownItem>
                                    }
                                </div>
                            )
                        })
                    }
                </DropdownMenu>
            </Dropdown>
            </>
        )
    }

    /*===================flightType=======================*/
    toggleFlightType = () => this.setState({ddOpenflightType: !this.state.ddOpenflightType})
    onChangeFlightType = (type, id) => this.setState({flightType: type, idflightType: id})

    /*===================CountPersons======================*/
    toggleCountPersons = () => this.setState({ddOpenCountPersons: !this.state.ddOpenCountPersons})    
    toggleCountPersons2 = () => this.setState({ddOpenCountPersons2: !this.state.ddOpenCountPersons2})
    onChangeCountPersons = (type, id) => this.setState({countPersons: type, idcountPersons: id})

    /*===================FlightClass======================*/
    toggleFlightClass = () => this.setState({ddOpenFlightClass: !this.state.ddOpenFlightClass})
    onChangeFlightClass = (type, id) => this.setState({flightClass: type, idflightClass: id})

    /*===================Places==========================*/
    renderSelectOrigin = () => {
        return (
            <div>
                <div className="p-2 bg-light d-flex align-items-center border" 
                    style={{ cursor: 'pointer' }}
                    onClick={this.handleOrigin}>
                    <FontAwesomeIcon icon={faPlaneDeparture} className="mr-1"></FontAwesomeIcon>
                    <div>{this.state.origin}</div>
                </div>
                { this.state.showOrigin 
                    && <SelectPlace type="o" choicePlace={ placeSel => this.placeSelected(placeSel,'o')}></SelectPlace> 
                }
            </div>
        )
    }
    
    renderSelectDestination = () => {
        return (
            <div>
                <div className="p-2 bg-light d-flex align-items-center border" 
                    style={{ cursor: 'pointer' }}
                    onClick={this.handleDestination}>
                    <FontAwesomeIcon icon={faPlaneArrival} className="mr-1"></FontAwesomeIcon>
                    <div>{this.state.destino}</div>
                </div>
                { this.state.showDestination 
                    && <SelectPlace type="d" choicePlace={ placeSel => this.placeSelected(placeSel,'d')}></SelectPlace> 
                }
            </div>
        )
    }

    handleExchangePlaces = () => {
        const tempOri = this.state.origin
        const tempDest = this.state.destino
        this.setState({origin: tempDest, destino: tempOri})
    }

    handleOrigin = () => this.showSelectOriginCmp()    

    handleDestination = () => this.showSelectDestinationCmp()
   
    placeSelected = (place, type) => {
        if (type === 'o'){
            this.setState({origin: place})
            this.hideSelectOriginCmp()
        }            
        else
        {
            this.setState({destino: place})
            this.hideSelectDestinationCmp()
        }
    }

    hideSelectOriginCmp = () => this.setState({showOrigin: false})

    showSelectOriginCmp = () => this.setState({showOrigin: true})

    hideSelectDestinationCmp = () => this.setState({showDestination: false})

    showSelectDestinationCmp = () => this.setState({showDestination: true})
    /*=================End of Places==========================*/

    /*=================Dates=================================*/
    days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    setDates = (range) => {
        const lstartDateString = this.customFormatDate(range.selection.startDate)
        const lendDateString = this.customFormatDate(range.selection.endDate)
        
        this.setState({
            startDate: range.selection.startDate, 
            endDate: range.selection.endDate,
            startDateString: lstartDateString,
            endDateString: lendDateString
        })
        this.hideSelectDateRangeCmp();
    }

    customFormatDate = (date) => this.days[date.getDay()] + " " + date.getDate() + "/" + (date.getMonth() + 1);

    renderDateRange = () => {
        return (
            <div>
            <div className="col bg-warning p-2 bg-light d-flex align-items-center border justify-content-between flex-fill"
                style={{cursor:'pointer'}}
                onClick={() => this.showSelectDateRangeCmp()}>
                <div className="d-flex align-items-center border-right flex-fill justify-content-between">
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" ></FontAwesomeIcon>
                        <div className="ml-1">{this.state.startDateString}</div>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faAngleLeft} className="ml-2" ></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faAngleRight} className="mx-2"></FontAwesomeIcon>
                    </div>
                </div>

                <div className="d-flex align-items-center flex-fill justify-content-between">
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mx-2"></FontAwesomeIcon>
                        <div className="ml-1">{this.state.endDateString}</div>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faAngleLeft} className="ml-2" ></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faAngleRight} className="ml-2"></FontAwesomeIcon>
                    </div>
                </div>                
            </div>
            {this.state.showDateRange && <CustomDateRangePicker onChange={range => this.setDates(range)}></CustomDateRangePicker>}
            </div>
        )
    }

    hideSelectDateRangeCmp = () => this.setState({showDateRange: false})

    showSelectDateRangeCmp = () => this.setState({showDateRange: true})
    /*=================End of Dates=================================*/

    findPlaceById = (id) => Places.filter(element => element.id === id)
    getIdPlaceByCity = (city) => Places.filter(element => element.city === city)[0].id

    canSearch = () => (this.state.origin !== '...' && this.state.destino !== '...' && this.state.startDate != null && this.state.endDate != null )

    doSearch = () => {        
        if (this.state.origin !== '' && this.state.destino !== '' && this.state.startDate != null && this.state.endDate != null )
        {
            this.setState({hasflights: true})    
            return true;
        }
        return false;
    }

    flightsFilter = () => {
        const res = Flights.filter(element => 
            element.origin.city === this.state.origin
            && element.destino.city === this.state.destino
            && (element.date >= this.state.startDate && element.date <= this.state.endDate)
        )
        return res;
    }

    /*=============================General render===========================*/

    renderRowFlight = () => {
        let oneWay = this.state.idflightType === 'ft02';        
        let classType = this.state.idflightClass;
        
        return (
            this.flightsFilter().map(el => {
                return (
                    <div key={el.id} className="row border border-primary rounded mt-2 p-2">
                        <div className="col-2 m-0 p-0 d-flex flex-column justify-content-center align-items-center">
                            <strong>{this.customFormatDate(el.date)}</strong>
                        </div>
                        <div className="col m-0 p-0 d-flex align-items-stretch">
                            <div className="d-flex flex-column flex-fill align-self-center w-100">
                                <div className="row d-flex flex-fill m-0 p-0">
                                    <div className="col p-0 pr-2 m-0 d-flex justify-content-between">
                                        <div>{el.origin.city}</div><div>{el.hrSalidaIda}</div>
                                    </div>
                                    <div className="col p-0 pl-2 m-0 d-flex justify-content-between">                                         
                                        <div>{el.hrLlegadaIda}</div><div>{el.destino.city}</div>
                                    </div>
                                </div>
                                { (!oneWay) && 
                                    <div className="row d-flex flex-fill m-0 p-0">
                                        <div className="col p-0 pr-2 m-0 d-flex justify-content-between">
                                            <div>{el.destino.city}</div><div>{el.hrSalidaRegreso}</div>
                                        </div>
                                        <div className="col p-0 pl-2 m-0 d-flex justify-content-between">                                         
                                            <div>{el.hrLlegadaRegreso}</div><div>{el.origin.city}</div>
                                        </div>
                                    </div>
                                }                                                                
                            </div>
                        </div>
                        <div className="col-3 bg-info rounded m-0 mx-2 p-0 d-flex flex-column justify-content-center align-items-center">
                            <strong>USD {this.extractPrice(el.prices, classType) * ((oneWay) ? 1 : 2)}</strong>{el.company}
                        </div>
                    </div>
                )
            })
        )        
    }

    extractPrice = (prices, classType) => {
        let value = 0;
        switch (classType) {
            case 'fc01':
                value = prices.economy;
                break;
            case 'fc02':
                    value = prices.premium_economy;
                    break;
            case 'fc03':
                    value = prices.business;
                    break;      
            case 'fc04':
                    value = prices.first;
                    break;  
            case 'fc05':
                    value = prices.multile;
                    break;           
            default:
                break;
        }
        return value;
    }

    handleRender = () => {
        return (
            <div>
                <div className="container border border-primary rounded mt-5 " >
                    <h4 className="row m-2">{this.props.title}</h4>
                    <div className="row ">
                        <div className="col col-md-2 p-0 bg-white order-1">{this.renderGenericCombo('FT', 1)}</div>
                        <div className="col col-md-2 p-0 bg-white order-3">{this.renderGenericCombo('CT', 1)}</div>
                        <div className="col col-md-2 p-0 d-none d-sm-block bg-white order-2">{this.renderGenericCombo('CP',1)}</div>
                    </div>
                    <div id="divX2" className="row d-sm-none">
                        <div className="col p-0 bg-white">{this.renderGenericCombo('CP',2)}</div>
                    </div>
                    <div id="extraSmallPlaces" className="row d-sm-none">                            
                        <div className="col-9 m-2">
                            <div className="row">
                                <div className="col mb-2 p-0">{this.renderSelectOrigin()}</div>                                                        
                            </div>
                            <div className="row">
                                <div className="col mt-2 p-0">{this.renderSelectDestination()}</div>
                            </div>
                        </div>                        
                        <div className="col m-2 p-2 bg-light border d-flex justify-content-center align-items-center">                            
                                <FontAwesomeIcon icon={faExchangeAlt} 
                                    onClick={() => this.handleExchangePlaces()} 
                                    style={{cursor:'pointer'}}>
                                </FontAwesomeIcon>                            
                        </div>                                              
                    </div>
                    <div id="smallPlaces" className="d-none d-sm-block d-lg-none">                            
                        <div className="row" >
                            <div className="col-5 col-lg m-2 p-0 ">{this.renderSelectOrigin()}</div>
                            <div className="col col-lg-1 m-2 p-2 border bg-light d-flex justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faExchangeAlt} 
                                    onClick={() => this.handleExchangePlaces()} 
                                    style={{cursor:'pointer'}}>
                                </FontAwesomeIcon>                                
                            </div>
                            <div className="col-5 col-lg m-2 p-0 ">{this.renderSelectDestination()}</div>
                        </div>
                    </div>
                    <div className="row d-lg-none">
                        <div className="col p-0 col-sm m-2 bg-warning">
                            {this.renderDateRange()}
                        </div>
                        <button type="button" className="col col-sm-2 d-none btn d-sm-block m-2 bg-danger d-sm-flex align-items-center justify-content-center border flex-fill" style={{ cursor: 'pointer' }}
                            disabled={!this.canSearch()}
                            onClick={e => this.doSearch()}>                        
                            <FontAwesomeIcon icon={faSearch} className="text-light" ></FontAwesomeIcon>                        
                        </button>
                    </div>
                    <div className="row d-sm-none">
                        <button type="button" className="col m-2 p-2 bg-danger btn d-flex align-items-center justify-content-center border flex-fill" style={{ cursor: 'pointer' }}
                            disabled={!this.canSearch()}
                            onClick={e => this.doSearch()}>
                            <FontAwesomeIcon icon={faSearch} className="text-light" ></FontAwesomeIcon>
                        </button>
                    </div>
                    {/*Second row all inline */}
                    <div id="fourFilters" className="d-none d-lg-block">
                        <div className="row">
                            <div className="col m-2">
                                <div className="row d-flex align-items-stretc" >
                                    <div className="col p-0">{this.renderSelectOrigin()}</div>
                                    <div className="col-1 p-2 mx-2 bg-light border d-flex justify-content-center align-items-center">
                                        <FontAwesomeIcon icon={faExchangeAlt} 
                                            onClick={() => this.handleExchangePlaces()}
                                            style={{cursor:'pointer'}}></FontAwesomeIcon> 
                                    </div>
                                    <div className="col p-0">{this.renderSelectDestination()}</div>
                                </div>
                            </div>
                            <div className="col m-2">
                                <div className="row" >
                                    <div className="col bg-warning p-0 bg-light">
                                        {this.renderDateRange()}                                        
                                    </div>
                                    <button type="button" className="col-2 ml-2 btn bg-danger d-flex align-items-center justify-content-center border flex-fill" style={{ cursor: 'pointer' }}
                                        disabled={!this.canSearch()}
                                        onClick={e => this.doSearch()}>
                                        <FontAwesomeIcon icon={faSearch} className="text-light" ></FontAwesomeIcon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container color-primary mt-5">
                    { this.state.hasflights && this.renderRowFlight()}
                </div>
            </div>
        )
    }

    render() {
        return this.handleRender()
    }

}