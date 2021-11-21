import React, { Component } from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default class Star extends Component {
    render() {
        return (
            <span>
                {[...Array(5)].map((item, index) => {
                    const givenRating = index + 1;
                    return (
                        this.props.rating>=givenRating?
                        <StarIcon className={`text-primary ${givenRating}`} onClick={()=>this.props.onDecreRating(givenRating,this.props.index)}/>:
                        <StarBorderIcon className={`text-primary ${givenRating}`} onClick={()=>this.props.onIncreRating(givenRating,this.props.index)}/>
                    );
                })}
                <span className="badge bg-light">{this.props.rating}</span>
            </span>
        )
    }
}
