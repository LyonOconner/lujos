import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Avatar, Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { render } from 'react-dom';

class CrearPerfil extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        // Initial state is defined
        console.log('props', props.location.aboutProps);

        const dataProp = props.location.aboutProps ? props.location.aboutProps.data : null
        this.state = {
            cedula: '',
            nombre: '',
            edad: '',
            cargo: '',
            password: '',

            open: false,
            message: '',
            severity: '',

            props: dataProp
        };
        this._isMounted = false;

        this.createUsers = this.createUsers.bind(this)
        this.updateUser = this.updateUser.bind(this)

        this.handleCedula = this.handleCedula.bind(this)
        this.handleNombre = this.handleNombre.bind(this)
        this.handleEdad = this.handleEdad.bind(this)
        this.handleCargo = this.handleCargo.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
    }


    handleCedula = (e) => {
        this.setState({ cedula: e.target.value });
    }
    handleNombre = (e) => {
        this.setState({ nombre: e.target.value });
    }
    handleEdad = (e) => {
        this.setState({ edad: e.target.value });
    }
    handleCargo = (e) => {
        this.setState({ cargo: e.target.value });
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    }


    createUsers = () => {

        fetch('http://142.93.62.149:8080/api/call_kw/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "host": "127.0.0.1",
                    "port": 9000,
                    "database": "lujosec",
                    "username": "admin",
                    "password": "nVmka6y951KKiIcxT6Az",
                    "model": "res.users",
                    "method": "create",
                    "options":
                    {
                    //     "login": "usuario@lujos.com",
                    //     "name": this.state.nombre,
                    //    // "cargo": this.state.cargo,
                    //     "cargo": "vendedor",
                    //     "edad": this.state.edad,
                    //     "cedula": this.state.cedula,
                    //     "password": this.state.password
                    "login": "admin@gmail.com",
                    "name": "user react",
                    "cargo": "vendedor",
                    "edad": "28",
                    "cedula": "1000000",
                    "password" : "123"

                    }
                }
            ),
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
            });
    }


    updateUser = () => {

        fetch('http://142.93.62.149:8080/api/call_kw/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "host": "127.0.0.1",
                    "port": 9000,
                    "database": "lujosec",
                    "username": "admin",
                    "password": "nVmka6y951KKiIcxT6Az",
                    "model": "res.users",
                    "method": "write",
                    "options":
                    {
                        "fields":
                        {
                            "name": this.state.nombre,
                            "cargo": this.state.cargo,
                            "edad": this.state.edad,
                            "cedula": this.state.cedula,
                            "password": this.state.password
                        },
                        "ids": [2]
                    }
                }
            ),
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
            });
    }


    render() {

        const style = {
            width: '70px',
            height: '70px'
        };

        return (
            <div className="container-fluid mt-5">
                <br></br>


                {/* EDITAR PERFIL */}
                {this.state.props != null ?
                    <div className='row mt-5'>

                        <div className='col-* mx-auto'>
                            <Avatar src={`data:image/jpg;base64,${this.dataProp ? this.dataProp.image_small : ''}  `} style={style} />
                        </div>

                        <div className='col-12 d-flex mt-4'>
                            <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Cédula" onChange={this.handleCedula} variant="filled" />
                        </div>
                        <div className='col-12 d-flex'>
                            <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Nombre" onChange={this.handleNombre} value={this.state.props != null ? this.state.props.name : ''} variant="filled" />
                        </div>
                        <div className='col-12 d-flex'>
                            <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Edad" onChange={this.handleEdad} variant="filled" />
                        </div>


                        <div className='col-12 mt-2 '>
                            <InputLabel className='col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' onChange={this.handleCargo} id="demo-controlled-open-select-label">Cargo</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                className='col-12 col-sm-10 col-md-6 col-lg-6 mx-auto d-block'
                                value='1'
                            >
                                <MenuItem value="0">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value='1'>Administrador</MenuItem>
                                <MenuItem value='2'>Vendedor</MenuItem>
                            </Select>
                        </div>

                        <div className='col-12 d-flex'>
                            <TextField id="outlined-basic" type="password" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Contraseña" onChange={this.handlePassword} variant="filled" />
                        </div>


                    </div>
                    :
                    <div className='row mt-5'>

                        <div className='col-* mx-auto'>
                            <Avatar src={`data:image/jpg;base64,${this.dataProp ? this.dataProp.image_small : ''}  `} style={style} />
                        </div>

                        <div className='col-12 d-flex mt-4'>
                            <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Cédula" onChange={this.handleCedula} variant="filled" />
                        </div>
                        <div className='col-12 d-flex'>
                            <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Nombre" onChange={this.handleNombre} variant="filled" />
                        </div>
                        <div className='col-12 d-flex'>
                            <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Edad" onChange={this.handleEdad} variant="filled" />
                        </div>


                        <div className='col-12 mt-2 '>
                            <InputLabel className='col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' onChange={this.handleCargo} id="demo-controlled-open-select-label">Cargo</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                className='col-12 col-sm-10 col-md-6 col-lg-6 mx-auto d-block'
                                value='1'
                            >
                                <MenuItem value="0">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value='1'>Administrador</MenuItem>
                                <MenuItem value='2'>Vendedor</MenuItem>
                            </Select>
                        </div>

                        <div className='col-12 d-flex'>
                            <TextField id="outlined-basic" type="password" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Contraseña" onChange={this.handlePassword} variant="filled" />
                        </div>


                    </div>
                }



                <div className='row'>
                    <div className='col-* mx-auto'>

                        {this.state.props != null ?
                            <div>
                                <Button variant="contained" className='mt-2  mr-1' color="secondary" component={Link} to="/perfiles">
                                    volver
                                </Button>
                                <Button variant="contained" className='mt-2 ' onClick={this.updateUser}  color="secondary" component={Link} to="/perfiles">
                                    Actualizar
                                </Button>

                            </div>
                            :

                            <Button variant="contained" className='mt-2' onClick={this.createUsers} color="secondary" component={Link} to="/perfiles">
                                Crear
                            </Button>
                        }
                    </div>

                </div>

            </div >
        );
    }

}


export default CrearPerfil;