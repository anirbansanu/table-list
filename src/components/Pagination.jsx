import React, { Component } from 'react'
import _ from 'lodash'

export default class Pagination extends Component {
    
    render() {
        const {pageSize, itemsCount, currentPage} = this.props;
        const pagesCount = Math.ceil(itemsCount / pageSize);
        const pages = _.range(1, pagesCount+1);
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#pre" aria-label="Previous" onClick={()=>this.props.handlePages(currentPage>1?currentPage-1:currentPage)}>
                            <span aria-hidden="true">«</span>
                        </a>
                    </li>
                    {pages.map(
                        page=>(
                            <li key={page} className={`page-item ${currentPage===page?'active':''}`}>
                                <a className="page-link" onClick={()=>this.props.handlePages(page)} href="#1">{page}</a>
                            </li>
                        )
                    )}
                    
                    <li className="page-item">
                        <a className="page-link" href="#nxt" aria-label="Next" onClick={()=>this.props.handlePages(currentPage<pages.length?currentPage+1:currentPage)}>
                            <span aria-hidden="true">»</span>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}
