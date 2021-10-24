import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Link } from "react-router-dom";

class Inventario extends React.Component {



    constructor(props) {
        super(props);
        // Initial state is defined
        this.state = {
            isLoaded: false,
            error: false,
            productos: []
        };

    }


    getInventario() {

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
                "model": "product.product",
                "method": "search_read",
                "options": {
                    "fields": ["id", "default_code", "name", "standard_price", "qty_available", "image_small", "write_date"],
                    "domain": []
                }
            }),
        })
            .then(response => response.json())
            .then(responseJson => {


                this.setState({
                    isLoaded: true,
                    productos: responseJson.response
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
        localStorage.title = 'Inventario'

        setTimeout(() => {
            this.getInventario()
        }, 500);
    }

    render() {

        const { productos } = this.state;

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
                        {productos.map(item =>

                            <List >
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar alt={item.name} src={`data:image/jpg;base64,${item.image_small}`} />
                                    </ListItemAvatar>
                                    {/*  <ListItemText primary={item.default_code} secondary={item.name} /> */}
                                    <ul>
                                        <li> <h5> Codigo: {item.default_code}</h5>  </li>
                                        <li> <strong>Nombre:</strong> {item.name} </li>
                                        <li> <strong> Stock:</strong> $ {item.qty_available} </li>
                                        <li> <strong>Fecha Compra: </strong>{item.write_date} </li>
                                        <li> <strong> Precio: </strong>$ {item.standard_price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} </li>
                                    </ul>
                                </ListItem>
                            </List>

                        )}
                    </div>

                </div>

            )
        }

    }
}

export default Inventario