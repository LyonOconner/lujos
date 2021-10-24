import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Avatar, Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';

CrearPerfil.propTypes = {


};

const style = {
    width: '70px',
    height: '70px'
};




const handleCedula = (e) => {
    console.log(e);
    this.setState({ cedula: e.target.value });
}
const handleNombre = (e) => {
    this.setState({ nombre: e.target.value });
}
const handleEdad = (e) => {
    this.setState({ edad: e.target.value });
}
const handleCargo = (e) => {
    this.setState({ cargo: e.target.value });
}
const handlePassword = (e) => {
    this.setState({ password: e.target.value });
}




const createUsers = () => {

    fetch('http://142.93.62.149:8080/api/call_kw/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "host": "127.0.0.1",
            "port": 9000,
            "database": "lujosec",
            "username": "admin",
            "password": "nVmka6y951KKiIcxT6Az",
            "model": "res.users",
            "method": "create",
            "options":
            {
                "login": "juan@gmail.com",
                "name": "Juan Perez"

            }
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
        });
}


function CrearPerfil(props) {
    console.log('props', props.location.aboutProps);
    const dataProp = props.location.aboutProps.data

    return (
        <div className="container-fluid mt-5">
            <br></br>

            <div className='row mt-5'>

                <div className='col-* mx-auto'>

                    <Avatar src="/static/images/avatar/3.jpg" style={style} />

                </div>

                <div className='col-12 d-flex mt-4'>
                    <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Cédula"   onChange={handleCedula} variant="filled" />
                </div>
                <div className='col-12 d-flex'>
                    <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Nombre" value={dataProp != null ? dataProp.name : ''} variant="filled" />
                </div>
                <div className='col-12 d-flex'>
                    <TextField id="outlined-basic" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Edad" variant="filled" />
                </div>


                <div className='col-12 mt-2 '>
                    <InputLabel className='col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' id="demo-controlled-open-select-label">Cargo</InputLabel>
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
                    <TextField id="outlined-basic" type="password" className='m-1 col-12 col-sm-10 col-md-6 col-lg-6 mx-auto' label="Contraseña" variant="filled" />
                </div>


            </div>

            <div className='row'>
                <div className='col-* mx-auto'>
                    <Button variant="contained" className='mt-2 ' color="secondary" component={Link} to="/perfiles">
                        Confirmar
                    </Button>
                </div>

            </div>

        </div>
    );
}

export default CrearPerfil;