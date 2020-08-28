export const environment = {
  production: true,
  backends: {
    primary: {
      baseUrl: 'https://jsonplaceholder.typicode.com',
      api_key: '7866a297c8f21ea63eb2756959872310'
    },
    secondary: {
      baseUrl: '',
      api_key: ''
    },
    tertiary: {
      baseUrl: '',
      api_key: ''
    }
    // ...
  }
};
