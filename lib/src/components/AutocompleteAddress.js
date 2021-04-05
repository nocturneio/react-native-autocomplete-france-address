import React, {Component, Fragment} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import close_button from "../../assets/baseline_close_black_24dp.png";

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
        fetch('https://api-adresse.data.gouv.fr/search/?q=' + encodeURI(text) + "&limit=10", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({isLoading: false, search: responseJson.features});
            }).catch(e => {
            this.setState({isLoading: false});
            this.onSearchError(e);
        });
    }

    async onSearchError(err) {
        if (this.props.onSearchError) {
            await this.props.onSearchError(err);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isOpen === false && this.props.isOpen === true){
            this.searchInput.focus();
        }
    }

    render() {
        if (!this.props.isOpen) return (<Fragment/>)

        return (
            <SafeAreaView style={[styles.containerStyle, this.props.containerStyle]}>
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                        <Text style={styles.placeholderStyle}>{this.props.placeholder}</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.onCloseModal()}>
                            <Image source={close_button} style={{width: 28, height: 28}}/>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        ref={(input) => { this.searchInput = input; }}
                        style={[styles.inputStyle, this.props.inputStyle, {width: width - 40, marginTop: 10}]}
                        onChangeText={(t) => {
                            this.setState({query: t, isSearching: true, isLoading: true});

                            if (t.length === 0) {
                                this.setState({query: t, isSearching: false, isLoading: false});
                                return;
                            }

                            if(this.searchWaiting)
                                clearTimeout(this.searchWaiting);

                            this.searchWaiting = setTimeout(() => {
                                this.searchResults(t);
                            }, 1000);
                        }}
                        placeholder={this.props.placeholder}
                        onBlur={() => {
                            this.searchResults(this.state.query);
                        }}
                    />
                </View>

                {this.state.isSearching && (
                    <View style={[styles.searchBoxContainer, {width: width}]}>
                        {this.state.isLoading ? (
                            <View style={{marginLeft: 20}}>
                                <ActivityIndicator/>
                            </View>
                        ) : this.state.search.map((a, i) => (
                            <TouchableOpacity onPress={() => {
                                this.props.onFindAddress(a);
                                this.setState({isSearching: false});
                                this.props.onCloseModal();
                            }} activeOpacity={0.9} key={"search-autocomplete-" + i}
                                              style={[styles.rowStyle, {width: width}]}>
                                <Text style={[styles.addressStyle, this.props.addressStyle]}>{a.properties.name}</Text>
                                <Text
                                    style={[styles.cityStyle, this.props.cityStyle]}>{a.properties.city} ({a.properties.postcode})</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </SafeAreaView>
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
    onCloseModal: PropTypes.func,
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
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: width,
        height: height,
        padding: 20,
        zIndex: 1000,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
    },
    inputStyle: {
        height: 50,
        width: width,
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minHeight: 75,
        marginTop: 20,
        width: width
    },
    rowStyle: {
        flexDirection: 'row',
        width: width,
        alignItems: 'baseline',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderColor: '#e7e7e7'
    },
    addressStyle: {
        fontSize: 14,
        fontWeight: "800"
    },
    placeholderStyle: {
        fontSize: 14,
        fontWeight: "800",
        marginBottom: 10,
        color: "#000",
        marginTop: 10
    },
    cityStyle: {
        fontSize: 10,
        marginLeft: 5,
        color: '#6b6b6b'
    }
};
