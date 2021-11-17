import React, { Component } from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default class Star extends Component {
    constructor(props){
        super(props);
        this.state={
            stars: this.props.rating?this.props.rating:0
        }
        this.onIncreRating = this.onIncreRating.bind(this);
        this.onDecreRating = this.onDecreRating.bind(this);
    }
    onIncreRating(incre){
        if(incre <= 5)
        {
            this.setState({
                stars: incre
            });
        }
        
    }
    onDecreRating(decre){
        if(decre >= 0)
        {
            this.setState({
                stars: decre
            });
        }
    }
    
    render() {
        return (
            <span>
                {[...Array(5)].map((item, index) => {
                    const givenRating = index + 1;
                    return (
                        this.state.stars>=givenRating?
                        <StarIcon className="text-primary" onClick={()=>this.onDecreRating(givenRating)}/>:
                        <StarBorderIcon onClick={()=>this.onIncreRating(givenRating)}/>
                    );
                })}
                <span className="badge bg-light">{this.state.stars}</span>
            </span>
        )
    }
}
