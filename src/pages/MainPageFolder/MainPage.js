import React from 'react';
import Filters from './Filters';
import Posts from './Posts';
import Pagination from './Pagination';
import {getProfile, setProfile} from "../../Requests";

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.handelSearchParams = this.handelSearchParams.bind(this);
        this.handlePaginationParams = this.handlePaginationParams.bind(this);
        this.handlePaginationParamsFromAnswer = this.handlePaginationParamsFromAnswer.bind(this);
        this.createPost = this.createPost.bind(this);
        const urlParams = new URLSearchParams(window.location.search);

        let tagsFromUrl = urlParams.get('tags');
        if(tagsFromUrl != null && tagsFromUrl !== '')
            tagsFromUrl = tagsFromUrl.split(',');
        else
            tagsFromUrl = []

        this.state ={
            searchParams: {
                authorName : urlParams.get('author') == null ? '' : urlParams.get('author'),
                minReading : urlParams.get('min') == null ? '' : urlParams.get('min'),
                maxReading : urlParams.get('max') == null ? '' : urlParams.get('max'),
                tags: tagsFromUrl,
                sorting: urlParams.get('sorting') == null ? '' : urlParams.get('sorting'),
                onlyMyCommunities: urlParams.get('onlyMyCommunities') == null ? false : urlParams.get('onlyMyCommunities'),
            },
            paginationParams: {
                page: urlParams.get('page') == null ? 1 : urlParams.get('page'),
                size: urlParams.get('size') == null ? 5 : urlParams.get('size'),
                count : 1
            },
            userToken : localStorage.getItem('userToken') || '',
            communityId: this.props.communityId
        }
    }


    handelSearchParams(params){
        this.setState({
            searchParams: {
                ...params
            },
            paginationParams:{
                page: 1,
                size: this.state.paginationParams.size,
                count: this.state.paginationParams.count
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        const pagChanged = this.state.paginationParams.page !== nextState.paginationParams.page ||
            this.state.paginationParams.size !== nextState.paginationParams.size ||
            this.state.paginationParams.count !== nextState.paginationParams.count;

        const stateChanged = this.state.searchParams !== nextState.searchParams;
        if (stateChanged || pagChanged)
        {
            return true;
        }
        return false;
    }

    handlePaginationParamsFromAnswer(params){
        this.setState({
            paginationParams:  {
                count: params.count,
                size: params.size,
                page : params.current
            }
        })
    }

    handlePaginationParams(params){
        this.setState({
            paginationParams: {
                ...params
            }
        })
    }

    createPost()
    {
        getProfile(this.state.userToken)
            .then((result) => {
                window.location.href = '/post/create';
            })
            .catch((error) => {
                window.location.href = '/login';
            });
    }

    render() {
        return (
            <div>
                {this.state.communityId == null &&(
                    <div className='container d-flex justify-content-end mt-3'>
                        <button className='btn btn-primary' onClick={this.createPost}>Написать пост</button>
                    </div>
                )}
                {this.state.communityId != null ? (
                    <Filters searchParams={this.state.searchParams} onSubmitParams={this.handelSearchParams} community={true}/>
                ) : (
                    <Filters searchParams={this.state.searchParams} onSubmitParams={this.handelSearchParams} community={false}/>
                )}

                {/*<Filters searchParams={this.state.searchParams} onSubmitParams={this.handelSearchParams}/>*/}
                <Posts searchParams={this.state.searchParams} paginationParams={this.state.paginationParams} onSubmitParams={this.handlePaginationParamsFromAnswer} communityId={this.state.communityId}/>
                <Pagination paginationParams={this.state.paginationParams} onSubmitParams={this.handlePaginationParams}/>
            </div>
        )
    }
}

export default MainPage;