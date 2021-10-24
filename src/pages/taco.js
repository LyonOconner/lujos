import React, { useRef, useEffect } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import axios from 'axios';


class Taco extends React.Component {


    constructor(props) {
        super(props);
        // Initial state is defined
        this.state = {
            img: null,

        };

        this.canvas1Ref = React.createRef();
        this.ctx1 = null;

        this.canvas2Ref = React.createRef();
        this.ctx2 = null;
        this.N_PART = 3;

        // E R A S M O C R U Z
        // 1 2 3 4 5 6 7 8 9 0
    }

    componentDidMount() {


        /*         const canvas2Ele = this.canvas2Ref.current;
                this.ctx2 = canvas2Ele.getContext("2d");
        
                const r1Info = { x: 20, y: 30, w: 100, h: 50 };
                const r1Style = { borderColor: '#000', borderWidth: 2 }; */
        //  this.drawRect(r1Info, r1Style);

    }


    drawRect(info, style = {}) {
        const { x, y, w, h } = info;
        const { borderColor = 'black', borderWidth = 1 } = style;

        this.ctx2.beginPath();
        this.ctx2.strokeStyle = borderColor;
        this.ctx2.lineWidth = borderWidth;
        this.ctx2.rect(x, y, w, h);
        this.ctx2.stroke();
    }



    onTakePhoto = async (dataUri) => {
        //console.log(dataUri);
        this.setState((previousState) => {
            return {
                img: dataUri
            };
        });
        this.updateCanvas(dataUri);
        // const config = {
        //     sizeFactor: 1,
        //     imgCompression: .5
        // };
        //this.doSendGoogleApi(dataUri)
    }

    //end of take photo

    onCameraError(error) {
        console.error('onCameraError', error);
    }

    onCameraStart(stream) {
        console.log('onCameraStart');
    }

    onCameraStop() {
        console.log('onCameraStop');
    }

    updateCanvas(dataUri) {

        const canvas1Ele = this.canvas1Ref.current;
        this.ctx1 = canvas1Ele.getContext("2d");
        this.ctx1.beginPath();

        const image = new Image();
        //parte 1
        let hy1 = canvas1Ele.height - canvas1Ele.height * 30 / 100
        let wx1 = canvas1Ele.width - canvas1Ele.width * 25 / 100
        let offsetX1 = 0
        let offsetY1 = 0
        //parte2
        let hy2 = canvas1Ele.height - canvas1Ele.height * 30 / 100
        let wx2 = canvas1Ele.width - canvas1Ele.width * 25 / 100
        let offsetX2 = 0
        let offsetY2 = canvas1Ele.height - canvas1Ele.height * 30 / 100

        //parte3
        let hy3 = canvas1Ele.height - canvas1Ele.height * 30 / 100
        let wx3 = canvas1Ele.width - canvas1Ele.width * 25 / 100
        let offsetX3 = canvas1Ele.width - canvas1Ele.width * 25 / 100
        let offsetY3 = canvas1Ele.height - canvas1Ele.height * 30 / 100

        image.onload = () => {
            this.ctx1.drawImage(image, 0, 0, canvas1Ele.width, canvas1Ele.height)
            this.ctx1.beginPath();

            //LINEA HORIZONTAL
            //                x , y
            this.ctx1.moveTo(0, hy1)
            this.ctx1.lineTo(canvas1Ele.width, hy1);

            // LINEA VERTICAL 
            this.ctx1.moveTo(wx1, 0)
            this.ctx1.lineTo(wx1, canvas1Ele.height);


            this.ctx1.strokeStyle = 'red'
            this.ctx1.stroke();
        }
        image.src = dataUri;
        // this.getArea(canvas1Ele, offsetX1, offsetY1, wx1, hy1)
        // this.getArea(canvas1Ele, offsetX2, offsetY2, wx2, hy2)

        let part1 = new Promise((resolve, reject) => {

            this.getArea(canvas1Ele, offsetX1, offsetY1, wx1, hy1).then((res) => {
                //console.log(res.fullTextAnnotation.text);
                if (res.fullTextAnnotation) {
                    resolve(res.fullTextAnnotation)
                } else {
                    resolve("texto no encontrado")
                }
            })

        });

        part1.then((res1 => {
            let part2 = new Promise((resolve, reject) => {
                this.getArea(canvas1Ele, offsetX2, offsetY2, wx2, hy2).then((res) => {
                    //console.log(res.fullTextAnnotation.text);
                    if (res.fullTextAnnotation) {
                        resolve(res.fullTextAnnotation.text)
                    } else {
                        resolve("texto no encontrado")
                    }
                })

            });

            part2.then(res2 => {
                let part3 = new Promise((resolve, reject) => {
                    this.getArea(canvas1Ele, offsetX3, offsetY3, wx3, hy3).then((res) => {
                        // console.log(res.fullTextAnnotation.text);

                        if (res.fullTextAnnotation) {
                            resolve(res.fullTextAnnotation.text)
                        } else {
                            resolve("texto no encontrado")
                        }
                    })

                });

                part3.then(res3 => {
                    console.log(res1.text);
                    let cod = res1.length ? this.splitLines(res1.text)[0] : ''
                    let x = res1.length ? this.splitLines(res1.text)[2] : ''

                    let prov = x.length ? this.splitSpaces(x)[0] : ''
                    let fechaAdquisicion = x.length ? this.splitSpaces(x)[1] : ''
                    let precioVenta = x.length ? this.splitSpaces(x)[2] : ''
                    console.log(x.length ? this.splitSpaces(x) : '');
                    let codigoRojo = res3.length ? this.splitLines(res3)[0] : ''
                    let precio = res2.length ? this.splitLines(res2)[0] : ''
                    precio = precio.replace('-', '.')
                    console.log(codigoRojo);
                    console.log(precio);
                    console.log(prov);
                    console.log(cod);
                    console.log(fechaAdquisicion);
                    console.log(this.decrypPrecio(precioVenta));


                    //enviar datos

                    //codigoProducto , proveedor , fecha de adquisicion del producto, precio venta, precio Compra



                    /*                     let precio = this.this.splitLines(res2)[0]
                                        let codigoRojo = this.splitLines(res3)[0]
                                        console.log(precio);
                                        console.log(codigoRojo); */
                })

            })

        }))


    }

    getArea(canvas, offsetX, offsetY, width, height) {


        const canvas2Ele = this.canvas2Ref.current;
        this.ctx2 = canvas2Ele.getContext("2d");
        this.ctx2.beginPath();

        const image = new Image();

        image.onload = () => {
            //this.ctx2.drawImage(image, 10, 10, width, height)
            var imgData = this.ctx1.getImageData(offsetX, offsetY, width, height);
            this.ctx2.putImageData(imgData, 0, 0);
        }


        let read = new Promise((resolve, reject) => {

            setTimeout(() => {
                //console.log(canvas.toDataURL());
                image.src = canvas.toDataURL()
                setTimeout(() => {
                    //console.log(canvas2Ele.toDataURL());
                    (async () => {
                        let res = await this.doSendGoogleApi(canvas2Ele.toDataURL())
                        console.log(res)
                        if (res.data.responses[0]) {
                            resolve(res.data.responses[0])
                        }
                    })()

                }, 500);

            }, 500);

        })

        return read
        /* read.then((e) => {
            console.log(e);
        })
 */

    };

    async doSendGoogleApi(dataUri) {
        //console.log(dataUri);
        var data = {
            requests: [
                {
                    image: {
                        content: dataUri.includes('png') ? dataUri.slice(22) : dataUri.slice(23),
                    },
                    features: [{
                        type: "TEXT_DETECTION",
                        maxResults: 5
                    }]
                }
            ]
        }
        return await axios({
            method: 'post',
            url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAqc1gUL7iNXSwdBWGPJNZ-MomSfJ9iFHM',
            data,
            config: { headers: { 'Content-Type': 'application/json' } }
        })
        /*             .then((r) => {
                        console.log(r);
        
                        let array = r.data.responses[0]
                        for (let x = 1; x < array.length; x++) {
                            if (array[x].description.includes('-')) {
                                console.log('if..');
                                return this.props.cameraOffAndSetInput(array[x].description)
                            }
                        }
                        return array
                    }) */

        /*         .catch((error) => {
                    console.log(error);
                }) */

    }

    splitLines(t) { return t.split(/\r\n|\r|\n/); }
    splitSpaces(t) { return t.split(' '); }
    decrypPrecio(v) {
        console.log(v);

        v.replace('0', 'O')
        v.replace('00', 'OO')
        // E R A S M O C R U Z
        // 1 2 3 4 5 6 7 8 9 0
        let r = v.replace(/S/g, '$').replace(/E/g, '1').replace(/R/g, '2').replace(/A/g, '3').replace(/S/g, '4').replace(/M/g, '5').replace(/O/g, '6').replace(/C/g, '7').replace(/R/g, '8').replace(/U/g, '9').replace(/Z/g, '10')

        return r;
    }

    render() {

        return (

            <div className="start-job-container p-1 mt-5">
                <Camera
                    onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
                    onCameraError={(error) => { this.onCameraError(error); }}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                    idealResolution={{ width: 640, height: 480 }}
                    imageType={IMAGE_TYPES.JPG}
                    imageCompression={0.97}
                    isMaxResolution={false}
                    isImageMirror={false}
                    isSilentMode={true}
                    isDisplayStartCameraError={true}
                    isFullscreen={false}
                    sizeFactor={1}
                    onCameraStart={(stream) => { this.onCameraStart(stream); }}
                    onCameraStop={() => { this.onCameraStop(); }}
                    className="mt-5"
                />
                <p></p>

                <canvas id='canvas1' ref={this.canvas1Ref} className='col-12 col-sm-12 col-md-6 mx-auto d-flex   p-1' height="280" > </canvas>

                <canvas id="canvas2" ref={this.canvas2Ref} width="300" height="300" > </canvas>

            </div>

        );
    }
}

export default Taco;