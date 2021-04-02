
<a href="https://github.com/nocturneio"><img src="https://i.imgur.com/cVSsETP.png" align="left" height="174" width="174"/></a>

## react-native-autocomplete-france-address
**Module for React Native & Expo that helps you to create an address autocompletion based on Data.gouv**


<br>


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/clementdlc)

___

## Demo

<a href="https://github.com/nocturneio"><img src="https://i.imgur.com/nhxjnyb.gif" height="300" width="145"/></a>

## Installation
### NPM
```
npm install react-native-autocomplete-france-address --save
```
### Yarn
```
yard add react-native-autocomplete-france-address
```
### Expo
```
expo install react-native-autocomplete-france-address --save
```

## Usage
### Basic
```js
import AutocompleteAddress from 'react-native-autocomplete-france-address'

render() {
    return <AutocompleteAddress isOpen={this.state.modalAddress} 
                                onFindAddress={(address) => {
                                    console.log(address)
                                }} 
                                onCloseModal={() => this.setState({modalAddress: false})} 
                                placeholder={"Cherchez une adresse, un lieu..."}/>
}
```

## Properties
### Required
- **onFindAddress(address)**: `Function` that return address from API when user click on entry.
- **onCloseModal()**: `Function` called when the modal need to be closed.
- **isOpen**: `Boolean` that determinate if the modal for searching address is open or not.
- **placeholder**: `String`.
  
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