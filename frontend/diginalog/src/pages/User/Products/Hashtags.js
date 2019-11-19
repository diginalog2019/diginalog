import React, {Component} from 'react';
import api from '../../utils/api';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import './UserProducts.module.scss';
import {addToCheckedHashtags, deleteFromCheckedHashtags} from "../../../redux/actions";

class Hashtags extends Component {
    state = {
        hashtags: []
    }

    getHashtags = async () => {
        let response = await api.get('/api/user/hashtags');
         this.setState({
             hashtags : response.data.data
         });
        //this.props.getHashtags();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("componentWillReceiveProps");
        console.log("in Hashtags");
        console.log(nextProps.checkedHashtags);
    }

    componentDidMount() {
        this.getHashtags();
    }

    render () {
        return (
            <>
                <div className="container">
                    <div className="row">
                        Checked Hashtags<br />
                    </div>
                    {this.props.checkedHashtags.map(hashtag => (
                        <button onClick={ (e) => this.props.deleteFromCheckedHashtags(hashtag, this.props.checkedHashtags)} type="button" className="btn btn-outline-primary btn-sm">{hashtag.H_Name}({hashtag.total})</button>
                    ))}
                    <div className="row">
                    </div>
                </div>
                <div className="container">
                    Hashtags<br />
                    {this.state.hashtags.map(hashtag => (
                        <button onClick={(e) => this.props.addToCheckedHashtags(hashtag,this.props.checkedHashtags)} type="button" className="btn btn-outline-primary btn-sm">{hashtag.H_Name}({hashtag.total})</button>
                    ))}
                </div>
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    checkedHashtags: state.productsReducer.checkedHashtags
})

const mapActionToProps = (dispatch) => ({
    addToCheckedHashtags : (hashtag, checkedHashtags) => dispatch(addToCheckedHashtags(hashtag, checkedHashtags)),
    deleteFromCheckedHashtags: (hashtag, checkedHashtags) => dispatch(deleteFromCheckedHashtags(hashtag, checkedHashtags))
})

export default connect(mapStateToProps, mapActionToProps)(Hashtags);