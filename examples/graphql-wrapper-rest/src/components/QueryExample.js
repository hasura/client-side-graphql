import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const queryText = gql`
  query ($cityName: String!){
    cityWeather (city_name: $cityName) {
      temp
      max_temp
      min_temp
    }
  }
`;

class QueryComponent extends React.Component {

 	 render() {
    if (!this.props.cityName) {
      return "Please type a city to get its temperature";
    }
 	 	return (
 	 		<Query
		    query={queryText}
        variables={{cityName: this.props.cityName}}
		  >
		    {({ data, loading, error }) => {
		    	if (loading) {
		    		return (<h2> Loading </h2>);
		    	}
		    	if (error) {
		    		return (<h2> {JSON.stringify(error)} </h2>);
		    	}
          if (!data.cityWeather) {
            return ("No info found for this city");
          }
          const { temp, max_temp, min_temp } = data.cityWeather;
		    	return (
		    		<div>
		    			<h3>Temp: {temp}</h3>
              <h3>Max temp: {max_temp}</h3>
              <h3>Min temp: {min_temp}</h3>
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
          <QueryComponent cityName={this.state.finalText}/>
        </div>
        <div>
          <input
            type="text"
            value={this.state.text}
            onChange={(e) => this.handleTextChange(e.target.value)}
            placeholder="Enter a city name"
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
