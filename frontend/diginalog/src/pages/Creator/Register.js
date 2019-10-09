/* Kwon Na Hyun : 2019.09.12 ~ 2019.09.15 -------------------------------------------*/
import React,{Component} from 'react';
import api from '../utils/api';
import './Creators.module.scss';
import axios from "axios";

var now = new Date();

export class Register extends Component {

    state = {
        cid:'',
        productName: '',
        price: '',
        date: now.toLocaleString(),
        extension: '',
        size:'',
        detailIMG:'',
        titleIMG: '',
        file: '',
        cate_id:''


    }

    handleText = (e, key) => {
        this.setState({[key]: e.target.value});
    }

    handleUploadFile = (e) => {
        e.preventDefault();

        // 선택된 화일이 없으면 리턴
        console.log(e.target.files);
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("filename", e.target.files[0].name);
        api.post('/api/creator/file', formData)
            .then(response => {
                console.log(response.data);
                this.setState({file: response.data.data});
            });
    }
    handleUploadDetailIMG = (e) => {
        e.preventDefault();

        // 선택된 화일이 없으면 리턴
        console.log(e.target.files);
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const formData = new FormData();
        formData.append("detailIMG", e.target.files[0]);
        formData.append("filename", e.target.files[0].name);
        api.post('/api/creator/detailIMG', formData)
            .then(response => {
                console.log(response.data);
                this.setState({detailIMG: response.data.data});
            });
    }
    handleUploadTitleIMG = (e) => {
        e.preventDefault();

        // 선택된 화일이 없으면 리턴
        console.log(e.target.files);
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const formData = new FormData();
        formData.append("titleIMG", e.target.files[0]);
        formData.append("filename", e.target.files[0].name);
        api.post('/api/creator/titleIMG', formData)
            .then(response => {
                console.log(response.data);
                this.setState({titleIMG: response.data.data});
            });
    }

    optionSize(value){
        if(value=="1"){
            document.getElementById("option").style.display = "block";
        }
        else{
            document.getElementById("option").style.display = "none";
        }
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
                    cid:'',
                    productName: '',
                    price: '',
                    date : now.toLocaleString(),
                    extension: '',
                    size:'',
                    detailIMG:'',
                    titleIMG: '',
                    file: '',
                    cate_id:''
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
                        <label htmlFor="cid">ID</label>
                        <input type="text" className="form-control" placeholder="Enter ID" id="cid"
                               value={this.state.cid} onChange={(e) => this.handleText(e, 'cid')} required />
                    </div>

                  {/* <div className="form-group mt-1">
                        <label htmlFor="nickname">Nickname</label>
                        <input type="text" className="form-control" placeholder="Enter Nickname" id="nickname"
                               value={this.state.nickname} onChange={(e) => this.handleText(e, 'nickname')} />
                    </div>*/}

                    <div className="form-group mt-1">
                        <label htmlFor="productName">Product Name</label>
                        <input type="productName" className="form-control" placeholder="Enter Product Name" id="productName"
                               value={this.state.productName} onChange={(e) => this.handleText(e, 'productName')} required />
                    </div>
                {/*knh --- onChange함수에 함수 두개 쓸때 아래 방법 맞는지 확인해야함 */}

                    <div className="form-group mt-1">
                        <label htmlFor="cate_id">Category</label>
                        <select className="form-control" id="cate_id" value={this.state.cate_id} onChange= optionSize(this.value); {(e)=>this.handleText(e, 'cate_id')}; required>
                        <option value="0"></option>
                        <option value="1">속지</option>
                        <option value="2">마스킹테이프</option>
                        <option value="3">스티커</option>
                        <option value="4">기타</option>
                        </select>
                    </div>

                    <div className="form-group mt-1" name="option" id="option" style = "style:none">
                        <label htmlFor="size">Size</label>
                        <select className="form-control" id="size" value={this.state.size} onChange={(e)=>this.handleText(e, 'size')} >
                        <option value="0"></option>
                        <option value="A6">A6</option>
                        <option value="A5">A5</option>
                        <option value="A4">A4</option>
                        <option value="B6">B6</option>
                        <option value="B5">B5</option>
                        <option value="B3">B3</option>
                        </select>
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="price">Price</label>
                        <input type="price" className="form-control" placeholder="Enter Price (ex. 20000)" id="price"
                               value={this.state.price} onChange={(e) => this.handleText(e, 'price')} required />
                    </div>

        {/*<div className="form-group mt-1">
                        <label htmlFor="date">Date</label>
                        <input type="date" className="form-control" placeholder="Enter Date (ex. 2020.01.01)" id="date"
                               value={this.state.date} onChange={(e) => this.handleText(e, 'date')} />
                    </div>*/}


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

                    <div className="d-flex flex-column mt-3 align-items-start">
                        <div>File</div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="file" accept="image/!*" multiple onChange={this.handleUploadFile} required />
                            <label className="custom-file-label" htmlFor="file">Choose File</label>
                        </div>
                        {
                            this.state.file ? <img src={this.state.file} alt={this.state.name} style={{width: '200px'}} /> : ''
                        }
                    </div>

                    <div className="d-flex flex-column mt-3 align-items-start">
                        <div>Detail IMG</div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="detailIMG" accept="image/!*" multiple onChange={this.handleUploadDetailIMG} />
                            <label className="custom-file-label" htmlFor="detailIMG">Choose Detail IMG</label>
                        </div>
                        {
                            this.state.detailIMG ? <img src={this.state.detailIMG} alt={this.state.name} style={{width: '200px'}} /> : ''
                        }
                    </div>

                    <div className="d-flex flex-column mt-3 align-items-start">
                        <div>Title IMG</div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="titleIMG" accept="image/!*" multiple onChange={this.handleUploadTitleIMG}  />
                            <label className="custom-file-label" htmlFor="titleIMG">Choose Title IMG</label>
                        </div>
                        {
                            this.state.titleIMG ? <img src={this.state.titleIMG} alt={this.state.name} style={{width: '200px'}} /> : ''
                        }
                    </div>

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
