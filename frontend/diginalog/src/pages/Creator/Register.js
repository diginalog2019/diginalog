/* Kwon Na Hyun : 2019.09.12 ~ 2019.09.15 -------------------------------------------*/
import React,{Component} from 'react';
import api from '../utils/api';
import './Creators.module.scss';
import axios from "axios";

export class Register extends Component {

    state = {
        nickname: '',
        productName: '',
        price: '',
        date:'',
        extension: '',
        size:'',
        //detailIMG:'',
        //titleIMG: '',
        file: ''

    }

    handleText = (e, key) => {
        this.setState({[key]: e.target.value});
    }

    handleUpload = (e) => {
        e.preventDefault();

        // 선택된 화일이 없으면 리턴
        console.log(e.target.files);
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("filename", e.target.files[0].name);
        axios.post('/api/creator/file', formData)
            .then(response => {
                console.log(response.data);
                this.setState({file: response.data.data});
            });
    }

    submit = (e) => {
        e.preventDefault();

        const sendForm = {...this.state};
        console.log(sendForm);

        api.post('/api/creator/register', sendForm)
            .then(response => {
                console.log(response.data);
                // form 초기화
                this.setState({
                    nickname: '',
                    productName: '',
                    price: '',
                    date:'',
                    extension: '',
                    size:'',
                    //detailIMG:'',
                    //titleIMG: '',
                    file: ''
                });
            });
    }

    render() {
        return (
            <>
                <br></br>
                <h3>Registration</h3>
                <br>
                </br>
                <form onSubmit={this.submit}>
                    <div className="form-group mt-1">
                        <label htmlFor="nickname">Nickname</label>
                        <input type="text" className="form-control" placeholder="Enter Nickname" id="nickname"
                               value={this.state.nickname} onChange={(e) => this.handleText(e, 'nickname')} required />
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="productName">Product Name</label>
                        <input type="productName" className="form-control" placeholder="Enter Product Name" id="productName"
                               value={this.state.productName} onChange={(e) => this.handleText(e, 'productName')} required />
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="price">Price</label>
                        <input type="price" className="form-control" placeholder="Enter Price (ex. 20000)" id="price"
                               value={this.state.price} onChange={(e) => this.handleText(e, 'price')} required />
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="date">Date</label>
                        <input type="date" className="form-control" placeholder="Enter Date (ex. 2020.01.01)" id="date"
                               value={this.state.date} onChange={(e) => this.handleText(e, 'date')} />
                    </div>


                    <div className="form-group mt-1">
                        <label htmlFor="extension">Extension</label>
                        <select className="form-control" id="extension" value={this.state.extension} onChange={(e)=>this.handleText(e, 'extension')} required>
                            <option value=""></option>
                            <option value="bmp">BMP(*.BMP, *.RLE, *.DIB)</option>
                            <option value="jpeg">JPEG(*.JPG)</option>
                            <option value="gif">GIF(*.GIF)</option>
                            <option value="png">PNG(*.PNG)</option>
                            <option value="tiff">TIFF(*.TIF, *.TIFF)</option>
                            <option value="raw">RAW(*.raw)</option>
                        </select>
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="size">Size</label>
                        <input type="size" className="form-control" placeholder="Enter Size (ex. 680 * 320)" id="size"
                               value={this.state.size} onChange={(e) => this.handleText(e, 'size')} />
                    </div>

                    <div className="d-flex flex-column mt-3 align-items-start">
                        <div>File</div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="file" accept="image/!*" multiple onChange={this.handleUpload} required />
                            <label className="custom-file-label" htmlFor="file">Choose File</label>
                        </div>
                        {
                            this.state.file ? <img src={this.state.file} alt={this.state.name} style={{width: '200px'}} /> : ''
                        }
                    </div>

{/*
                    <div className="d-flex flex-column mt-3 align-items-start">
                        <div>Detail IMG</div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="detailIMG" accept="image/!*" multiple onChange={this.handleUpload}  />
                            <label className="custom-file-label" htmlFor="detailIMG">Choose Detail IMG</label>
                        </div>
                        {
                            this.state.detailIMG ? <img src={this.state.detailIMG} alt={this.state.name} style={{width: '200px'}} /> : ''
                        }
                    </div>

                    <div className="d-flex flex-column mt-3 align-items-start">
                        <div>Title IMG</div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="titleIMG" accept="image/!*" multiple onChange={this.handleUpload}  />
                            <label className="custom-file-label" htmlFor="titleIMG">Choose Title IMG</label>
                        </div>
                        {
                            this.state.titleIMG ? <img src={this.state.titleIMG} alt={this.state.name} style={{width: '200px'}} /> : ''
                        }
                    </div>*/}

                    <div className="m-3 d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-primary">Register</button>
                    </div>

                </form>

                <p>
                    {JSON.stringify(this.state)}
                </p>
            </>
        )
    }
}

/* Kwon Na Hyun : 2019.09.01 fin-------------------------------------------*/
/* Kwon Na Hyun : 2019.09.15 Image Upload / https://medium.com/@imranhsayed/file-or-image-uploads-on-amazon-web-services-aws-using-react-node-and-express-js-aws-sdk-252742286162-------------------------------------------*/
