# ReactNativeAlgoliaPlaces
Module for React Native & Expo that helps you to create an address autocompletion based on Data.gouv

## Installation
```
npm i react-native-autocomplete-france-address --save
```

## Usage
### Basic
```js
import AutocompleteAddress from 'react-native-autocomplete-france-address'

render() {
    return <AutocompleteAddress isOpen={true} 
                                onFindAddress={(address) => {
                                    console.log(address)
                                }} onSearchError={(e) => {
                                    console.log(e)
                                }} placeholder={"Cherchez une adresse, un lieu..."}/>
}
```

## Properties
### Required
- **onFindAddress(address)**: `Function` that return address from API when user click on entry,
- **isOpen**: `Boolean` that determinate if the modal for searching address is open or not.
- **placeholder**: `String`,
  
### Optional
- **onSearchError(error)**: `Function` that return an error if there is an error during the search.
- **containerStyle**: `Object` for the container style.
- **inputStyle**: `Object` for the input style.
- **addressStyle**: `Object` for the suggested rows address text.
- **cityStyle**: `Object` for the suggested rows cities text.
- **inputWidth**: `Number` width of the input.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)