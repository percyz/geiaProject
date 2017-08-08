import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import Loading from 'react-loading';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import { Organisations } from  '../../../api/Leaderboard/organisations.js'
import { Regions } from '../../../api/Leaderboard/regions.js';
import { Industries } from  '../../../api/Leaderboard/industries.js'

var arrayAll = [];
var temporaryArrayAll = [];
var arrayLoc = [];
var arrayInd = [];
var arrayFin = [];
var parentRegion = 'Otago';
var buttonRadius = {"borderRadius": "0px"};

export default class SearchBox extends TrackerReact(React.Component) {

    /********************************************
     Load the organisations collection
     ********************************************/

    organisations(){
        return Organisations.find().fetch();
    }

    /********************************************
     Load city&region from leader collection
     ********************************************/

    regions(){
        return Regions.find().fetch();
    }

    /********************************************
     Load industry collection
     ********************************************/

    industries(){
        return Industries.find().fetch();
    }

    constructor(props,) {
        super(props);
        this.state = {value: 'coconut'};
        this.onChangeAll = this.onChangeAll.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.onChangeLoc = this.onChangeLoc.bind(this);
        this.onChangeInd = this.onChangeInd.bind(this);
        this.submitTest = this.submitTest.bind(this);
        this.submitButton = this.submitButton.bind(this);
        this.onChangeReg = this.onChangeReg.bind(this);
        this.onChangeCit = this.onChangeCit.bind(this);
        subscription:{
            publishIndustries: Meteor.subscribe("publishIndustries");
            publishRegions: Meteor.subscribe("publishRegions");
        };

        this.stateAll = {
            disabled: false,
            value: '',
        };

        this.stateLoc = {
            disabled: false,
            value: '',
        };

        this.stateInd = {
            disabled: false,
            value: '',
        };
    }

    sort(){
      return Organisations.find({},{ sort: {rank: 1,scores: 1}});
    }

   /********************************************
     Functions for submit
    ********************************************/

    submitTest(){

        for(var j = 0; j < this.organisations().length; j++){
            var curId = this.organisations()[j]._id;
            Meteor.call('checkfalse',curId);
        }

        /****** all=null, loc=null, ind=null dispaly OrganisationC ******/

        if ((arrayAll.length < 1)&&(arrayLoc.length < 1)&&(arrayInd.length < 1)){
            return null;
        }
        else if (arrayInd.length < 1){
            if (arrayLoc.length < 1){

                /****** all=something, loc=null, ind=null ******/
                arrayFin = arrayAll
            }
            else {

                /****** all=something, loc=something, ind=null ******/
                arrayFin = arrayLoc.filter(val => arrayAll.includes(val));
                if (arrayFin.length < 1){

                    /****** all&loc do not match ******/
                    arrayFin = arrayLoc;
                }
            }
        }
        else if (arrayLoc.length < 1){
            /****** all=something, loc=null, ind=something ******/
            arrayFin = arrayInd.filter(val => arrayAll.includes(val));
            if (arrayFin.length < 1){

                /****** all&ind do not match ******/
                arrayFin = arrayInd;
            }
        }
        else {

            /****** all=something, loc=something, ind=something ******/

            arrayIndTemporary = [];
            arrayIndTemporary = arrayInd.filter(val => arrayLoc.includes(val));
            arrayFin = arrayIndTemporary.filter(val => arrayAll.includes(val));
            if (arrayFin.length < 1){

                /****** all&ind do not match ******/
                arrayFin = arrayIndTemporary;
            }
        }

        for(var i = 0; i < arrayFin.length; i++){
            for(var j = 0; j < this.organisations().length; j++){
                if(arrayFin[i] == this.organisations()[j]._id){
                    var curId = this.organisations()[j]._id;
                     Meteor.call('checktrue',curId);
                }
            }
        }

        Session.set('searchResults', arrayFin);
        Session.set('searchIntial', true);
        arrayAll = [];
        arrayFin = [];
    }

    /********************************************
     Functions for select all
     ********************************************/

    onKeyDownAll(e) {
        if (e.keyCode === 13) {
            this.jump(this.state.value);
        }
    }

    onChangeAll(newValue) {
        
        /***if user did not search name***/

        if(newValue == null){
            arrayAll = temporaryArrayAll;

            /*** give arrayAll every name then triger the search function ***/
            this.submitTest();
        }
    }

    onSelectAll(value) {
        if(value != ""){
            for(i = 0; i < this.organisations().length; i++){
                if(this.organisations()[i].name.toLowerCase() == value){
                    arrayAll.push(this.organisations()[i]._id);
                }
            }
        this.submitTest();
        }
    }

    /********************************************
     Functions for select location
     ********************************************/

    onChangeLoc(e) {

        var value = e
        if (typeof(e) == "object"){
            value = e.value;
        }

        if(e.value != ""){
            for(i = 0; i < this.organisations().length; i++){
                if(this.organisations()[i].address.city == value){
                    arrayLoc.push(this.organisations()[i]._id);
                }
                else if(this.organisations()[i].address.region == value){
                    arrayLoc.push(this.organisations()[i]._id);
                }
            }

            var arrayTemporary = [];
            for(i = arrayLoc.length-1; i >= 0; i--){
                var valueTemporary = arrayLoc[i];
                for(j = 0; j < i; j++){
                    if(valueTemporary == arrayLoc[j]){
                        arrayTemporary.push(valueTemporary);
                    }
                }
            }

            if(arrayTemporary.length < 1){
                arrayTemporary = arrayLoc;
            }

            arrayLoc = arrayTemporary;
            if(arrayLoc.length < 1){
                arrayLoc.push("NullLocation");
            }
            this.submitTest();
        }
    }

    /********************************************
     Regions changed
     ********************************************/

    onChangeReg(e){
        arrayLoc = [];
        parentRegion = e;
        if(e == "All Regions"){
            for(i = 0; i < this.organisations().length; i++){
                arrayLoc.push(this.organisations()[i]._id);
            }
            this.submitTest();
        }
        else{
            this.onChangeLoc(e);
        }
    }

    /********************************************
     District changed
     ********************************************/

    onChangeCit(e){
        arrayLoc = [];
        if(e == "All Districts"){
            for(i = 0; i < this.organisations().length; i++){
                if(this.organisations()[i].address.region == $("#currentLoc").text()){
                    arrayLoc.push(this.organisations()[i]._id);
                }
            }
            this.submitTest();
        }
        else{
            this.onChangeLoc(e);
        }
    }

    /********************************************
     Functions for select industry
     ********************************************/

    onChangeInd(e) {

        arrayInd = [];
        var value = e
        if (typeof(e) == "object"){
            value = e.value;
        }

        if(e.value != ""){
            if(value == "All Industries"){
                for(i = 0; i < this.organisations().length; i++){
                    arrayInd.push(this.organisations()[i]._id);
                }
            }
            else{
                for(i = 0; i < this.organisations().length; i++){
                  if(this.organisations()[i].industry == value){
                    arrayInd.push(this.organisations()[i]._id);
                  }
                }
                if(arrayInd.length < 1){
                    arrayInd.push("NullIndustry");
                }
            }
            this.submitTest();
        }
    }

    /********************************************
     Functions for Button
     ********************************************/

    submitButton(){

        for(var j = 0; j < this.organisations().length; j++){
                var curId = this.organisations()[j]._id;
                Meteor.call('checktrue',curId);
        }

        arrayAll = [];
        arrayLoc = [];
        arrayInd = [];

    }

    /********************************************
     Functions for render
     ********************************************/

    render() {

      /** Handle**/

      const handle = Meteor.subscribe('publishOrg-SearchBoox');
      Tracker.autorun(() => {
        const isReady = handle.ready();
        if(isReady){
            return Organisations.find({},{ sort: {rank: 1,scores: 1}});
        }
      });

      /** end of handle **/

        let resO = this.organisations();
        let resI = this.industries();
        let resR = this.regions()[0];

        if(!resO){
            return (
                <div style={{width:'100px', margin:'auto'}}><Loading type='bubbles' color='#8AC440' margin='0 auto' /></div>
            ); 
        }else{
            for(i = 0; i < this.organisations().length; i++){
                temporaryArrayAll.push(this.organisations()[i]._id);
            }
        }

        if(!resR){
            return (
                <div style={{width:'100px', margin:'auto'}}><Loading type='bubbles' color='#8AC440' margin='0 auto' /></div>
            );
        }

        if(!resI){
            return (
                <div style={{width:'100px', margin:'auto'}}><Loading type='bubbles' color='#8AC440' margin='0 auto' /></div>
            );
        }

        this.sort();

        /****** display the options of All******/

        const optionsAll = this.organisations().map((leader)=>{
             return (
             <Option key={leader.name.toLowerCase()} >{leader.name}</Option>
             )
        });

       /****** display the industry ******/

        const industP = this.industries()[0].industry.map((parent)=>{
            return <li value={parent} key={parent}><a onClick={()=>this.onChangeInd(parent)}>{parent}</a></li>
        });

        const locationR = this.regions()[0].region.map((parent)=>{
            return (
                <li>
                    <a onClick={()=>this.onChangeReg(parent)}>{parent}</a>
                </li>
            )
        });

        const locationC = this.regions()[0].cities[parentRegion].map((child)=>{
            return (
                <li value={child} key={child}><a onClick={()=>this.onChangeCit(child)}>{child}</a></li>
                )
        });

        return (
            <div className="well">
                <div className="row">
                    <div className="col-md-1"></div>

                    {/****** Select box for select all ******/}

                    <div className="col-md-3" onKeyDown={this.onKeyDownAll}>
                        <Select
                            className="testAll selectpicker"
                            id="selectAll"
                            style={{ width: "250px"}}
                            onChange={this.onChangeAll}
                            onSelect={this.onSelectAll}
                            defaultActiveFirstOption={false}
                            //showArrow={false}
                            notFoundContent=""
                            allowClear
                            //filterOption={false}
                            placeholder="Enter organisation's name"
                            valueAll={this.stateAll.value}
                            combobox
                            style={buttonRadius}
                        >
                            {optionsAll}
                        </Select>
                    </div>

                    {/****** Select box for select region ******/}

                    <div className="col-md-2 btn-group">

                        <form className="bs-example bs-example-form" role="form">
                            <div className="input-group-btn">
                                <button id="currentLoc" type="button" className="btn btn-default" tabIndex="-1">Regions</button>
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" tabIndex="-1">
                                    <span className="caret"></span>
                                    <span className="sr-only">change</span>
                                </button>

                                <ul className="dropdown-menu multi-level" id="dropdown-scrollbar1" role="menu" aria-labelledby="dropdownMenu">
                                    {locationR}
                                </ul>
                            </div>
                        </form>

                    </div>

                    {/****** Select box for select city ******/}
                    <div className="col-md-2 btn-group">

                        <form className="bs-example bs-example-form" role="form">
                            <div className="input-group-btn">
                                <button id="currentCity" type="button" className="btn btn-default" tabIndex="-1">Districts</button>
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" tabIndex="-1">
                                    <span className="caret"></span>
                                    <span className="sr-only">change</span>
                                </button>

                                <ul className="dropdown-menu multi-level" id="dropdown-scrollbar1" role="menu" aria-labelledby="dropdownMenu">
                                    {locationC}
                                </ul>
                            </div>
                        </form>

                    </div>

                    {/****** Select box for select Industry ******/}

                    <div className="col-md-3 btn-group">
                        <form className="bs-example bs-example-form" role="form">
                            <div className="input-group-btn">
                                <button id="currentInd" type="button" className="btn btn-default" tabIndex="-1">Industry</button>
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" tabIndex="-1">
                                    <span className="caret"></span>
                                    <span className="sr-only">change</span>
                                </button>

                                <ul className="dropdown-menu multi-level" id="dropdown-scrollbar2" role="menu" aria-labelledby="dropdownMenu">
                                    {industP}
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
