import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';

export default class Movies extends Component {
    constructor(props){
        super(props);
        this.state={
            movies: getMovies()
        }
        this.handleDel = this.handleDel.bind(this);
    }
    handleDel(id){
        const mlist = this.state.movies;
        let movieInDb = mlist.find(m => m._id === id);
        console.log(mlist.splice(mlist.indexOf(movieInDb), 1));
        console.log(mlist); 
        this.setState({ movies: mlist});
    }
    render() {
        return (
            <>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map((m,i) => (
                            <tr  key={i}>
                                <th scope="row">{i}</th>
                                <td>{m.title}</td>
                                <td>{m.genre.name}</td>
                                <td>{m.numberInStock}</td>
                                <td>{m.dailyRentalRate}</td>
                                <td><button type="button" class="btn btn-danger" onClick=
                                {
                                    ()=>{
                                        this.handleDel(m._id)
                                    }
                                }>
                                    Delete</button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </>
        )
    }
}
