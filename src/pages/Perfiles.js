import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router";
import axios from 'axios';
import { JSONRPCClient } from "json-rpc-2.0";


class Perfiles extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,

    };
    constructor(props) {
        super(props);
        // Initial state is defined
        this.state = {
            isLoaded: false,
            usuarios: [],
            error: false
        };

    }

    getUsers() {

        fetch('http://142.93.62.149:8080/api/call_kw/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                host: '127.0.0.1',
                port: 9000,
                database: 'lujosec',
                username: 'admin',
                password: 'nVmka6y951KKiIcxT6Az',
                model: 'res.users',
                method: 'search_read',
                options: {
                    "fields": ["id", "login", "name"],
                    "domain": []
                },
            }),
        })
            .then(response => response.json())
            .then(responseJson => {


                this.setState({
                    isLoaded: true,
                    usuarios: responseJson.response
                });



            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: true,
                    isLoaded: true,

                });
            });


    }


    componentDidMount() {
        localStorage.title = 'Perfiles'

        setTimeout(() => {
            this.getUsers()
        }, 500);
    }


    render() {
        const { usuarios } = this.state;
        console.log(usuarios);
        if (!this.state.isLoaded) {
            return (<div className="container-fluid mt-5">
                <br></br>
                <br></br>
                <br></br>
                <div className='text-center' >Loading ... </div>
            </div>

            )

        } else {
            if (this.state.error) {
                return (<div className="container-fluid mt-5">
                    <br></br>
                    <br></br>
                    <div className='text-center' >Error de conexion ... </div>
                </div>
                )
            }

            return (
                <div className="container-fluid mt-5">
                    <br></br>
                    <div>
                        {usuarios.map(item =>

                            <List >
                                <ListItem button component={Link} to={{
                                    pathname: '/crearPerfil',
                                    aboutProps: {
                                        data: item
                                    }
                                }}>
                                    <ListItemAvatar>
                                        <Avatar alt="Pepito Perez" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} secondary="Vendedor" />
                                </ListItem>
                            </List>

                        )}
                    </div>

                    {/*BOTON DE AGREGAR   */}
                    <div className='col-12 d-flex fixed-b'>
                        <Fab color="primary" aria-label="add" className=" mx-auto" component={Link} to={{
                                    pathname: '/crearPerfil',
                                    aboutProps: {
                                        data: null
                                    }
                                }}>
                            <AddIcon />
                        </Fab>
                    </div>
                </div>

            );

        }


    }
}

export default Perfiles;



