import React from "react";
import PostItem from '../../components/PostItem';
import {getPosts, getPostsInCommunity} from '../../Requests';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoaded: false,
            error: false,
            searchParams : this.props.searchParams,
            paginationParams : this.props.paginationParams,
            communityId: this.props.communityId,
            userToken: localStorage.getItem('userToken') || ''
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.searchParams !== prevProps.searchParams) {
            this.setState({ searchParams: this.props.searchParams, isLoaded: false }, () => {
                this.fetchData();
            });
        }
        if (this.props.paginationParams !== prevProps.paginationParams) {
            this.setState({ paginationParams: this.props.paginationParams, isLoaded: false }, () => {
                this.fetchData();
            });
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        if(this.state.communityId != null)
        {
            getPostsInCommunity(this.state.userToken, this.state.searchParams, this.state.paginationParams, this.state.communityId)
                .then((result) => {
                    this.setState({ posts: result.posts, isLoaded: true, error:false });
                    this.props.onSubmitParams(result.pagination)
                })
                .catch((error) => {
                    console.log('Error:', error.message);
                    this.setState({
                        isLoaded: false,
                        error:true
                    });
                });
        }
        else
        {
            getPosts(this.state.userToken, this.state.searchParams, this.state.paginationParams)
                .then((result) => {
                    this.setState({ posts: result.posts, isLoaded: true, error:false });
                    this.props.onSubmitParams(result.pagination)
                })
                .catch((error) => {
                    console.log('Error:', error.message);
                    this.setState({
                        isLoaded: false,
                        error:true
                    });
                });
        }
    }

    render() {

        if(this.state.error)
        {
            return <div className='container'><h3>Error</h3></div>
        }
        else if (!this.state.isLoaded)
        {
            return <div className='container'><h3>Loading ...</h3></div>
        }
        else if(this.state.posts.length === 0)
        {
            return <div className='container'><h3>Ничего не найдено</h3></div>
        }
        else
        {
            return (

                <div>
                    {this.state.posts.map((value, index) =>
                        <PostItem
                            title = {value.title}
                            description = {value.description}
                            author = {value.author}
                            createTime = {value.createTime}
                            communityName = {value.communityName}
                            readingTime = {value.readingTime}
                            image = {value.image}
                            likes = {value.likes}
                            commentsCount = {value.commentsCount}
                            tags = {value.tags}
                            id = {value.id}
                            isActive = {true}
                            key = {index}
                        />
                    )}
                </div>
            )
        }
    }
}

export default Posts;