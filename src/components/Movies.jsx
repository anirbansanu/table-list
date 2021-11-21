import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Like from './Like';
import Pagination from './Pagination';
import Star from './Star';
import { paginate } from './../utils/paginate';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import jsPDF from "jspdf";
import "jspdf-autotable";

export default class Movies extends Component {
    constructor(props){
        super(props);
        this.state={
            movies: getMovies(),
            pageSize: 4,
            currentPage: 1,
            pageShown: []
        }
        this.handleDel = this.handleDel.bind(this);
        this.handlePaging = this.handlePaging.bind(this);
        this.pageShownOnChange = this.pageShownOnChange.bind(this);
        this.onIncreRating = this.onIncreRating.bind(this);
        this.onDecreRating = this.onDecreRating.bind(this);
    }
    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Movies List";
        const headers = [["_id", "title","genre","numberInStock",'dailyRentalRate']];
    
        const data = this.state.movies.map(elt=> [elt._id, elt.title,elt.genre, elt.numberInStock, elt.dailyRentalRate]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
      }
    
    handleDel(id){
        const mlist = this.state.movies;
        let movieInDb = mlist.find(m => m._id === id);
        console.log(mlist.splice(mlist.indexOf(movieInDb), 1));
        console.log(mlist); 
        this.pageShownOnChange(this.state.currentPage);
    }
    handlePaging(currentPage){
        console.log(currentPage);
        this.setState({currentPage: currentPage});
        this.pageShownOnChange(currentPage);
    }
    handleLikeBtn = (index) =>{
        const mlist = this.state.pageShown;
        mlist[index].like = !mlist[index].like;
        this.setState({pageShown : mlist});
        console.log(`mlist[index].like : ${mlist[index].like}`);
        console.log(`index ; ${index}`);
    }
    onIncreRating(incre,index){
        if(incre <= 5)
        {
            const mlist = this.state.pageShown;
            mlist[index].dailyRentalRate = incre;
            this.setState({pageShown : mlist});
        }
        // console.log(this.state.pageShown);
        // console.log(`incre : ${incre} , index : ${index}`);
        
    }
    onDecreRating(decre,index){
        if(decre >= 0)
        {
            const mlist = this.state.pageShown;
            mlist[index].dailyRentalRate = decre;
            this.setState({pageShown : mlist});
        }
    }
    pageShownOnChange(currentPage){
        const pageShown = paginate(this.state.movies, currentPage, this.state.pageSize);
        this.setState({pageShown: pageShown});
    }
    sortDataByKey = (key) => {
        const moviesList = this.state.movies;
        if(key==='_id'){
            moviesList.sort((a,b) => (parseInt(a[key], 10) > parseInt(b[key], 10)) ? 1 : ((parseInt(b[key], 10)> parseInt(a[key], 10)) ? -1 : 0));
        }
        else if(key==='genre')
        {
            moviesList.sort((a,b) => (a[key].name > b[key].name) ? 1 : ((b[key].name > a[key].name) ? -1 : 0));
        }
        else{
            moviesList.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
        }
        this.setState({currentPage: 1});
        const pageShown = paginate(moviesList, 1, this.state.pageSize);
        this.setState({pageShown: pageShown});
        console.log(moviesList);
    }
    componentDidMount(){
        this.pageShownOnChange(1);
    }
    render() {
        const moviesList = this.state.pageShown;
        
        return (
            <>
                <table class="table text-center" style={{minHeight: '302px'}}>
                    <thead className="bg-primary text-white ">
                        <tr>
                            <th scope="col" onClick={()=>this.sortDataByKey('_id')}>
                                # 
                                <span className="sort-icons-box">
                                    <ImportExportIcon/>
                                </span>
                            </th>
                            <th scope="col" onClick={()=>this.sortDataByKey('title')}>Name 
                                <span className="sort-icons-box">
                                    <ImportExportIcon className="md-9"/>
                                </span>
                            </th>
                            <th scope="col" onClick={()=>this.sortDataByKey('genre')}>
                                Genre
                                <span className="sort-icons-box">
                                    <ImportExportIcon className="md-9"/>
                                </span>
                            </th>
                            <th scope="col" onClick={()=>this.sortDataByKey('numberInStock')}>
                                Stock
                                <span className="sort-icons-box">
                                    <ImportExportIcon className="md-9"/>
                                </span>
                            </th>
                            <th scope="col" onClick={()=>this.sortDataByKey('dailyRentalRate')}>
                                Rate
                                <span className="sort-icons-box">
                                    <ImportExportIcon className="md-9"/>
                                </span>
                            </th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moviesList.map((m,i) => (
                            <tr  key={i}>
                                <th scope="row">{m._id}</th>
                                <td>{m.title}</td>
                                <td>{m.genre.name}</td>
                                <td>{m.numberInStock}</td>
                                <td><Star rating={m.dailyRentalRate} index={i} onIncreRating={this.onIncreRating} onDecreRating={this.onDecreRating}/></td>
                                <td>
                                    <span style={{paddingLeft:'8px',paddingRight:'18px'}}>
                                        <Like handleLikeBtn={this.handleLikeBtn} like={m.like} index={i}/>
                                        
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
                    <Pagination 
                        currentPage={this.state.currentPage} 
                        handlePages={this.handlePaging} 
                        pageSize={this.state.pageSize} 
                        itemsCount={this.state.movies.length}
                    />
                    
                </div>
                <div className="w-100 d-flex justify-content-center">
                    <button type="button" class="btn btn-danger export-btn" onClick={this.exportPDF}>
                            Export PDF
                    </button>
                </div>
            </>
        )
    }
}
