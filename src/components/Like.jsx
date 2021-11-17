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
            !this.state.like?
            <span className="icons" onClick={this.onLiked}>
                <FavoriteBorderIcon className="text-danger"/>
            </span>:
            <span className="icons" onClick={this.onLiked}>
                <FavoriteIcon className="text-danger"/>
            </span>
        )
    }
}
