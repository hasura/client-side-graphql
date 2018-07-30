const typeDefs = `
  type CityWeather {
    temp: String
    min_temp: String
    max_temp: String
    city_name: String!
    applicable_date: String!
  }

  type Query {
    cityWeather(city_name: String! applicable_date: String): CityWeather
  }
`;

export default typeDefs;
