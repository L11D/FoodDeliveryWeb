import React from "react";


class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.buttonOnClick = this.buttonOnClick.bind(this);
        this.prevButtonOnClick = this.prevButtonOnClick.bind(this);
        this.nextButtonOnClick = this.nextButtonOnClick.bind(this);
        this.pageSizeChange = this.pageSizeChange.bind(this);

        this.coutnOfPagesInSelection = 5

        this.state = {
            pageSize: this.props.paginationParams.size,
            currentPage: this.props.paginationParams.page,
            pageCount: this.props.paginationParams.count,

            listPagesSize : this.coutnOfPagesInSelection,
            currentListPage: Math.floor((parseInt(this.props.paginationParams.page, 10)-1) / this.coutnOfPagesInSelection )
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.setState({
                pageSize: this.props.paginationParams.size,
                currentPage: this.props.paginationParams.page,
                pageCount: this.props.paginationParams.count,
                currentListPage: Math.floor((parseInt(this.props.paginationParams.page, 10)-1) / this.coutnOfPagesInSelection )
            }, () => {
                window.history.pushState({}, "", this.getNewLink());
            });
        }
    }

    getNewLink()
    {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', this.state.currentPage)
        queryParams.set('size', this.state.pageSize)
        return `?${queryParams.toString()}`;
    }

    buttonOnClick(e){
        this.setState({ currentPage: e.target.value }, () => {
            window.history.pushState({}, "", this.getNewLink());
            this.props.onSubmitParams({
                count: this.state.pageCount,
                size: this.state.pageSize,
                page : this.state.currentPage
            });
        });
    }
    pageSizeChange(e)
    {
        this.setState({ pageSize: e.target.value, currentPage: 1 }, () => {
            window.history.pushState({}, "", this.getNewLink());
            this.props.onSubmitParams({
                count: this.state.pageCount,
                size: this.state.pageSize,
                page : this.state.currentPage
            });
        });
    }

    prevButtonOnClick(){
        if (this.state.currentListPage > 0){
            this.setState({currentListPage: this.state.currentListPage - 1})
        }
    }
    nextButtonOnClick(){
        if ((this.state.currentListPage+1) * this.state.listPagesSize < this.state.pageCount){
            this.setState({currentListPage: this.state.currentListPage + 1})
        }
    }
    render() {
        const buttons = [];

        for (let i = 1 + this.state.listPagesSize * this.state.currentListPage; i <= this.state.listPagesSize + this.state.listPagesSize * this.state.currentListPage && i <= this.state.pageCount; i++) {
            if (i === this.state.currentPage)
            {
                buttons.push(
                    <button className='btn btn-primary' onClick={this.buttonOnClick} value={i} key={i}>
                        {i}
                    </button>
                );
            }
            else {
                buttons.push(
                    <button className='btn btn-light' onClick={this.buttonOnClick} value={i} key={i}>
                        {i}
                    </button>
                );
            }
        }

        return (
            <div className='container mb-3 '>
                <div className='row d-flex justify-content-between'>
                    <div className='col-sm-6 d-flex align-content-center flex-wrap'>
                        <button className='btn btn-light' onClick={this.prevButtonOnClick}>&laquo;</button>
                        {buttons}
                        <button className='btn btn-light' onClick={this.nextButtonOnClick}>&raquo;</button>
                    </div>
                    <div className='col-sm-5 col-lg-3'>
                        <label htmlFor="PageCountSelectControl" className="form-label">Число постов на странице</label>
                        <select className="form-select" id="PageCountSelectControl" onChange={this.pageSizeChange} value={this.state.pageSize}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pagination;