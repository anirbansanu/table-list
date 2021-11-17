import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Like from './Like';
import Star from './Star';

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
                <table class="table text-center">
                    <thead className="bg-primary text-white ">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map((m,i) => (
                            <tr  key={i}>
                                <th scope="row">{i}</th>
                                <td>{m.title}</td>
                                <td>{m.genre.name}</td>
                                <td>{m.numberInStock}</td>
                                <td><Star rating={m.dailyRentalRate} /></td>
                                <td>
                                    <span style={{paddingLeft:'8px',paddingRight:'18px'}}>
                                        <Like/>
                                        
                                    </span>
                                    <button type="button" class="btn btn-danger" onClick=
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
                <div className="w-100 d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#p" aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="#1">1</a></li>
                            <li className="page-item"><a className="page-link" href="#2">2</a></li>
                            <li className="page-item"><a className="page-link" href="#3">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#n" aria-label="Next">
                                    <span aria-hidden="true">»</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                </div>
            </>
        )
    }
}
