import React, { Component } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default class Like extends Component {
    constructor(props){
        super(props);
        this.state={
            like: false
        }
        this.onLiked = this.onLiked.bind(this);
    }
    onLiked(){
        this.setState({like : !this.state.like})
    }
    render() {
        return (
            !this.props.like?
            <span className="icons" onClick={()=>this.props.handleLikeBtn(this.props.index)}>
                <FavoriteBorderIcon className="text-danger"/>
            </span>:
            <span className="icons" onClick={()=>this.props.handleLikeBtn(this.props.index)}>
                <FavoriteIcon className="text-danger"/>
            </span>
        )
    }
}
