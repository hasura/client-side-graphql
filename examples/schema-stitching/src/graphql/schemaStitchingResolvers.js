const schemaStitchingResolvers = (executableSchemas) => ({
  person: {
    city_weather : {
      resolve(parent, args, context, info) {
        return info.mergeInfo.delegateToSchema({
          schema: executableSchemas.weather,
          operation: 'query',
          fieldName: 'cityWeather',
          args: {
            city_name: parent.city,
          },
          context,
          info,
        });
      },
    },
  },
});

export default schemaStitchingResolvers;