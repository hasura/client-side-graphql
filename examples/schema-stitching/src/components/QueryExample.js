import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const queryText = gql`
  query ($personName: String!){
    person (where: { name: { _eq: $personName }}) {
     	name
     	age
     	city
     	city_weather {
     		temp
     		max_temp
     		min_temp
     	}
    }
  }
`;

class QueryComponent extends React.Component {

 	 render() {
    if (!this.props.personName) {
      return "Type an person's name";
    }
 	 	return (
 	 		<Query
		    query={queryText}
        variables={{personName: this.props.personName}}
		  >
		    {({ data, loading, error }) => {
		    	if (loading) {
		    		return (<h2> Loading </h2>);
		    	}
		    	if (error) {
		    		return (<h2> {JSON.stringify(error)} </h2>);
		    	}
		    	if (data.person.length === 0) {
		    		return "Name not found in the database. Try something else"; 
		    	}
          const { name, city, age, city_weather } = data.person[0] ;
          const renderWeather = () => {
            if (city_weather) {
              return (
                <div>
                  <h3>City Temp: {city_weather.temp}</h3>
                  <h3>City Max temp: {city_weather.max_temp}</h3>
                  <h3>City Min temp: {city_weather.min_temp}</h3>
                </div>
              );
            }
            return <h3>City Weather: No information available</h3>
          }
		    	return (
		    		<div>
		    			<h3>Name: {name} </h3>
		    			<h3>Age: {age} </h3>
		    			<h3>City: {city} </h3>
              {renderWeather()} 
		    		</div>
		    	);
		    }}
		  </Query>
 	 	)
 	 }
}

class CityTemp extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
  		text: ''
  	}
  }

	handleTextChange = (text) => {
		this.setState({ ...this.state, text })
	}

  setFinalValue = () => {
    this.setState({ finalText: this.state.text});
  }

	render() {
		return (
      <div>
        <div>
          <QueryComponent personName={this.state.finalText}/>
        </div>
        <div>
          <input
            type="text"
            value={this.state.text}
            onChange={(e) => this.handleTextChange(e.target.value)}
            placeholder="Name"
          />
          <button
            type="button"
            onClick={() => this.setFinalValue()}
          >
            Temperature
          </button>
        </div>
      </div>
		)
	}
}

export default CityTemp;
