import React, {Component, Fragment} from 'react';
import { ActivityIndicator, Dimensions, View, Text, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import axios from "axios";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class AutocompleteAddress extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isSearching: false,
            query: "",
            search: []
        }

        this.searchResults = this.searchResults.bind(this);
    }

    searchResults(text) {
        axios.get("https://api-adresse.data.gouv.fr/search/?q=" + encodeURI(text) + "&limit=5").then(r => {
            this.setState({isLoading: false, search: r.data.features});
        }).catch(e => {
            this.setState({isLoading: false});
            this.onSearchError(e);
        })
    }

    async onSearchError (err) {
        if (this.props.onSearchError) {
            await this.props.onSearchError(err);
        }
    }

    render() {
        if(!this.props.isOpen) return (<Fragment/>)

        return(
            <View style={[styles.containerStyle, this.props.containerStyle]}>
                <TextInput
                    style={[styles.inputStyle, this.props.inputStyle, {width: this.props.inputWidth}]}
                    onChangeText={(t) => {
                        this.setState({query: t, isSearching: true, isLoading: true});
                        this.searchResults(t);
                    }}
                    placeholder={this.props.placeholder}
                    onBlur={() => {
                        this.searchResults(this.state.query);
                    }}
                />

                {this.state.isSearching && (
                    <View style={[styles.searchBoxContainer, {width: this.props.inputWidth}]}>
                        {this.state.isLoading ? (
                            <View style={{marginLeft: 20}}>
                                <ActivityIndicator/>
                            </View>
                        ) : this.state.search.map((a, i) => (
                            <TouchableOpacity onPress={() => {
                                this.props.onFindAddress(a);
                                this.setState({isSearching: false});
                            }} activeOpacity={0.9} key={"search-autocomplete-" + i} style={[styles.rowStyle, {width: this.props.inputWidth}]}>
                                <Text style={[styles.addressStyle, this.props.addressStyle]}>{a.properties.name}</Text>
                                <Text style={[styles.cityStyle, this.props.cityStyle]}>{a.properties.city} ({a.properties.postcode})</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        );
    }
}

AutocompleteAddress.defaultProps = {
    containerStyle: {},
    inputStyle: {},
    placeholder: "Cherchez une adresse, un lieu...",
    addressStyle: {},
    cityStyle: {},
    inputWidth: 300,
    isOpen: false
}

AutocompleteAddress.propTypes = {
    onSearchError: PropTypes.func,
    onFindAddress: PropTypes.func,
    containerStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    placeholder: PropTypes.string,
    addressStyle: PropTypes.object,
    cityStyle: PropTypes.object,
    inputWidth: PropTypes.number,
    isOpen: PropTypes.bool
}

const styles = {
    containerStyle: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
    },
    inputStyle: {
        height: 50,
        width: 300,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 5,
        elevation: 3,
    },
    searchBoxContainer: {
        zIndex: 1000,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: 75,
        width: 300
    },
    rowStyle: {
        flexDirection: 'row',
        width: 300,
        alignItems: 'baseline',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: '#e7e7e7'
    },
    addressStyle: {
        fontSize: 12,
        fontWeight: "800"
    },
    cityStyle: {
        fontSize: 8,
        marginLeft: 5,
        color: '#6b6b6b'
    }
};