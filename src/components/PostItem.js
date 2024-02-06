import React from "react";
import {Image} from "react-bootstrap";
import '../App.css';
import LikeButton from "./LikeButton";
import LocationComponent from "./LocationComponent";


class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            author: this.props.author,
            createTime: this.props.createTime,
            communityName: this.props.communityName,
            readingTime: this.props.readingTime,
            image: this.props.image,
            likes: this.props.likes,
            commentsCount: this.props.commentsCount,
            tags: this.props.tags,
            id: this.props.id,
            guid: this.props.guid,
            isActive: this.props.isActive,
            showFullText: false,
        }
        this.descriptionMaxLen = 200;
    }

    formatCreateTime = (dateTimeString) => {
        const options = {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'};
        const formattedDate = new Date(dateTimeString).toLocaleString(undefined, options);
        return formattedDate.replace(',', '');
    };

    toggleShowFullText = () => {
        this.setState((prevState) => ({
            showFullText: !prevState.showFullText,
        }));
    };

    render() {
        return (
            <div className="container mb-3">
                <div className="card">
                    <div className="mx-3 mt-3">

                        {this.state.isActive ? (
                            <div style={{cursor: 'pointer'}}
                                 onClick={() => window.location.href = `/post/${this.state.id}`}>
                                <p>{this.state.author} - {this.formatCreateTime(this.state.createTime)}
                                    {this.state.communityName ? ` в сообществе "${this.state.communityName}"` : ''}</p>
                                <h4>{this.state.title}</h4>
                            </div>
                        ) : (
                            <div>
                                <p>{this.state.author} - {this.formatCreateTime(this.state.createTime)}
                                    {this.state.communityName ? ` в сообществе "${this.state.communityName}"` : ''}</p>
                                <h4>{this.state.title}</h4>
                            </div>
                        )}

                        <hr></hr>
                        <div className="d-flex justify-content-center">
                            <Image className="img" src={this.state.image}/>
                        </div>

                        <div>
                            {this.state.description.length > this.descriptionMaxLen ? (
                                this.state.showFullText ? (
                                    <div>
                                        {this.state.description}{' '}
                                        <p><span
                                            onClick={this.toggleShowFullText}
                                            style={{color: 'blue', cursor: 'pointer'}}
                                        >
                                            Скрыть
                                        </span></p>
                                    </div>
                                ) : (
                                    <div>
                                        {this.state.description.slice(0, this.descriptionMaxLen)}...{' '}
                                        <p><span
                                            onClick={this.toggleShowFullText}
                                            style={{color: 'blue', cursor: 'pointer'}}
                                        >
                                            Читать полностью
                                        </span></p>
                                    </div>
                                )
                            ) : (
                                <div>{this.state.description}</div>
                            )}
                        </div>

                        <p>
                            {this.state.tags.map((value, index) =>
                                <span key={index} style={{color: 'grey'}}>#{value.name} </span>
                            )}
                        </p>

                        <p>Время чтения: {this.props.readingTime} мин.</p>

                        {this.state.isActive === false && (
                            <LocationComponent guid={this.state.guid}/>
                        )}

                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        {this.state.isActive ? (
                            <div style={{cursor: 'pointer'}}
                                 onClick={() => window.location.href = `/post/${this.state.id}?scrollToComments=true`}>
                                <span>{this.state.commentsCount}</span>
                                <i className="bi-chat-left-text mx-1"></i>
                            </div>
                        ) : (
                            <div>
                                <span>{this.state.commentsCount}</span>
                                <i className="bi-chat-left-text mx-1"></i>
                            </div>
                        )}
                        <LikeButton postId={this.state.id}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostItem;
