/* Kwon Na Hyun : 2019.09.12 ~ 2019.09.15 -------------------------------------------*/
import React,{Component} from 'react';
import api from '../utils/api';
import './Creators.module.scss';
import axios from "axios";

export class Register extends Component {

    state = {
        cid:'',
        productName: '',
        price: '',
        //date:'',
        extension: '',
        size:'',
        detailIMG:'',
        titleIMG: '',
        file: '',
        cate_id:''

    }

    /*getExtensionOfFilename = (filename) => {

        const _fileLen = filename.length;
        const _lastDot = filename.lastIndexOf('.');
        const _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();
        console.log(_fileExt);
        this.setState(extension: _fileExt);
    }*/
    get_extension(filename) { // 오류 계속고쳤지만 남. 빡친다 안해 후우.. 그 다운받을때? 받아오면 안됨? 굳이 디비에 저장해야하냐....ㅠㅜㅠ
        return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
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
        this.setState({extension: this.get_extension(e)})
    }

    handleUploadDetailIMG = (e) => {
        e.preventDefault();

        // 선택된 화일이 없으면 리턴
        console.log(e.target.files);
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("filename", e.target.files[0].name);
        api.post('/api/creator/detailIMG', formData)
            .then(response => {
                console.log(response.data);
                this.setState({file: response.data.data});
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
        formData.append("file", e.target.files[0]);
        formData.append("filename", e.target.files[0].name);
        api.post('/api/creator/titleIMG', formData)
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
                    cid:'',
                    productName: '',
                    price: '',
                    //date:'',
                    extension:'',
                    detailIMG:'',
                    titleIMG: '',
                    size:'',
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
                        <label htmlFor="cid">ID-login // 기능구현 이후 생각해볼것</label>
                        <input type="text" className="form-control" placeholder="Enter ID" id="cid"
                               value={this.state.cid} onChange={(e) => this.handleText(e, 'cid')} required />
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="cate_id">Category_ID</label>
                        <select className="form-control" id="cate_id" value={this.state.cate_id} onChange={(e)=>this.handleText(e, 'cate_id')} required>
                            <option value="100"></option>
                            <option value="1">다이어리 속지</option>
                            <option value="2">떡메모지</option>
                            <option value="3">스티커</option>
                            <option value="4">마스킹테이프</option>
                        </select>
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="size">Size (카테고리가 다이어리 속지인 경우만!!)</label>
                        <select className="form-control" id="size" value={this.state.size} onChange={(e)=>this.handleText(e, 'size')} >
                            <option value="NO">카테고리가 다이어리 속지가 아닌 경우</option>
                            <option value="B5">B5</option>
                            <option value="B4">B4</option>
                            <option value="B3">B3</option>
                            <option value="A5">A5</option>
                            <option value="A4">A4</option>
                            <option value="A3">A3</option>
                        </select>
                    </div>

                   {/* <div className="form-group mt-1">
                        <label htmlFor="nickname">Nickname</label>
                        <input type="text" className="form-control" placeholder="Enter Nickname" id="nickname"
                               value={this.state.nickname} onChange={(e) => this.handleText(e, 'nickname')} />
                    </div>
*/}
                    <div className="form-group mt-1">
                        <label htmlFor="productName">Product Name</label>
                        <input type="productName" className="form-control" placeholder="Enter Product Name" id="productName"
                               value={this.state.productName} onChange={(e) => this.handleText(e, 'productName')} required />
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="price">Price (원)</label>
                        <input type="price" className="form-control" placeholder="Enter Price (ex. 20000)" id="price"
                               value={this.state.price} onChange={(e) => this.handleText(e, 'price')} required />
                    </div>

                    {/*<div className="form-group mt-1">
                        <label htmlFor="date">Date</label>
                        <input type="date" className="form-control" placeholder="Enter Date (ex. 2020.01.01)" id="date"
                               value={this.state.date} onChange={(e) => this.handleText(e, 'date')} />
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="extension">Extension (only PDF or PNG)</label>
                        <select className="form-control" id="extension" value={this.state.extension} onChange={(e)=>this.handleText(e, 'extension')} required>
                            <option value=""></option>
                            <option value="png">PNG(*.PNG)</option>
                            <option value="pdf">PDF(*.PDF)</option>
                        </select>
                    </div>
*/}
                    (아래 모든 항목에서 여러장 업로드시 zip 파일로 업로드 / pdf, png 파일만 업로드 가능)
                    <div className="d-flex flex-column mt-3 align-items-start">
                        <div>File</div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="file"  onChange={this.handleUploadFile}/>
                            <label className="custom-file-label" htmlFor="file">Choose File</label>
                        </div>
                        {
                            this.state.file ? <img src={this.state.file} alt={this.state.name} style={{width: '200px'}} /> : ''
                        }
                    </div>

                    <div className="d-flex flex-column mt-3 align-items-start">
                        <div>Detail IMG</div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="detailIMG" onChange={this.handleUploadDetailIMG} />
                            <label className="custom-file-label" htmlFor="detailIMG">Choose Detail IMG</label>
                        </div>
                        {
                            this.state.detailIMG ? <img src={this.state.detailIMG} alt={this.state.name} style={{width: '200px'}} /> : ''
                        }
                    </div>

                    <div className="d-flex flex-column mt-3 align-items-start">
                        <div>Title IMG</div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="titleIMG" onChange={this.handleUploadTitleIMG}  />
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
