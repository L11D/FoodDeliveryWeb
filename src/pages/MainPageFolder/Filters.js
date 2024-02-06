import React from "react";
import {Form} from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';
import {getTags} from "../../Requests";

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.handleFiltersChange = this.handleFiltersChange.bind(this);
        this.handelClickAssignButton = this.handelClickAssignButton.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.state = {
            tags: [],
            tagsIsLoaded: false,
            community: this.props.community
        }
        this.params = {
            authorName : "",
            minReading : null,
            maxReading : null,
            tags: [],
            sorting: "",
            onlyMyCommunities: false,
        }
        this.params = this.props.searchParams;
    }

    componentDidMount() {
        this.fetchTags();
    }

    fetchTags()
    {
        getTags()
            .then((result) => {
                this.setState({ tags: result });
            })
            .catch((error) => {
                console.log('Error:', error.message);
            });
    }

    handleFiltersChange(e){
        if (e.target.id === "AuthorNameSearchControl"){
            this.params.authorName = e.target.value;
        }
        if (e.target.id === "ReadTimeUpControl"){
            if ((e.target.value >= 0) || e.target.value === '')
                this.params.minReading = e.target.value;
        }
        if (e.target.id === "ReadTimeToControl"){
            if ((e.target.value >= 0) || e.target.value === '')
                this.params.maxReading = e.target.value;
        }
        if (e.target.id === "OnlyMyGroupsToControl"){
            this.params.onlyMyCommunities = e.target.checked.toString();
        }
        if (e.target.id === "SortSelectControl"){
            this.params.sorting = e.target.value;
        }
        this.forceUpdate();
    }
    handleTagChange(e) {
        if (e.target.checked)
        {
            this.params.tags.push(e.target.id);
        }
        else
        {
            const index = this.params.tags.indexOf(e.target.id);
            if (index !== -1) {
                this.params.tags.splice(index, 1);
            }
        }
        this.forceUpdate();
    }

    getNewLink(){
        const queryParams = new URLSearchParams(window.location.search);
        if (this.params.authorName != null)
            queryParams.set('author', this.params.authorName)

        if (this.params.tags != null)
            queryParams.set('tags', this.params.tags)

        if (this.params.onlyMyCommunities != null)
            queryParams.set('onlyMyCommunities', this.params.onlyMyCommunities)

        if (this.params.sorting != null)
            queryParams.set('sorting', this.params.sorting)

        if (this.params.minReading != null)
            queryParams.set('min', this.params.minReading)

        if (this.params.maxReading != null)
            queryParams.set('max', this.params.maxReading)

        return `?${queryParams.toString()}`;
    }

    handelClickAssignButton(e){
        if (this.params.maxReading < this.params.minReading && (this.params.maxReading !== '' && this.params.minReading !== ''))
        {
            alert('"Время чтения до" должно быть не меньше "Время чтения от"')
        }
        else
        {
            window.history.pushState({}, "", this.getNewLink());
            this.props.onSubmitParams(this.params);
        }
    }

    render() {
        if (!this.state.community)
        {
            return (
                <div className="container my-3">
                    <div className="card">
                        <div className="card-header">
                            Фильтры
                        </div>
                        <div className="container my-3">
                            <div className="row mb-2">
                                <div className="col-lg">
                                    <label htmlFor="AuthorNameSearchControl" className="form-label">Поиск по имени
                                        автора</label>
                                    <input type="text" className="form-control" id="AuthorNameSearchControl" onChange={this.handleFiltersChange}
                                           placeholder="Слон блогер" value={this.params.authorName}/>
                                </div>
                                <div className="col-lg">
                                    <label htmlFor="TagSearchControl" className="form-label">Поиск по тэгам</label>
                                    <div className="list-group" style={{ maxHeight: '100px', overflowY: 'auto', border: '1px solid #dee2e6', borderRadius: '0.5rem' }}>
                                        {this.state.tags.map((tag, index) => (
                                            <Form.Check
                                                className="m-1"
                                                key={index}
                                                type="checkbox"
                                                id={tag.id}
                                                checked={this.params.tags.includes(tag.id)}
                                                label={tag.name}
                                                onChange={this.handleTagChange}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-lg-4">
                                    <label htmlFor="SortSelectControl" className="form-label">Сортировать</label>
                                    <select className="form-select" id="SortSelectControl" onChange={this.handleFiltersChange} value={this.params.sorting}>
                                        <option value=""></option>
                                        <option value="CreateDesc">По дате создания (сначало новые)</option>
                                        <option value="CreateAsc">По дате создания (сначало старые)</option>
                                        <option value="LikeAsc">По количеству лайков (сначало меньше)</option>
                                        <option value="LikeDesc">По количеству лайков (сначало больше)</option>
                                    </select>
                                </div>

                                <div className="col-lg">
                                    <label htmlFor="ReadTimeUpControl" className="form-label">Время чтения от</label>
                                    <input type="number" className="form-control" id="ReadTimeUpControl" min={0} value={this.params.minReading} onChange={this.handleFiltersChange}/>
                                </div>
                                <div className="col-lg">
                                    <label htmlFor="ReadTimeToControl" className="form-label">Время чтения до</label>
                                    <input type="number" className="form-control" id="ReadTimeToControl" min={0} value={this.params.maxReading} onChange={this.handleFiltersChange}/>
                                </div>

                                <div className="col-lg-2 my-3 my-lg-0 d-flex align-content-end flex-wrap">
                                    <input type="checkbox" className="form-check-input mx-1" id="OnlyMyGroupsToControl" checked={this.params.onlyMyCommunities === 'true'} onChange={this.handleFiltersChange}/>
                                    <label htmlFor="OnlyMyGroupsToControl" className="form-check-label">Только мои
                                        группы</label>
                                </div>
                                <div className="col-lg d-flex align-content-end flex-wrap justify-content-end">

                                    <button type="submit" className="btn btn-primary" onClick={this.handelClickAssignButton}>Применить</button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div className="container my-3">
                    <div className="card">
                        <div className="card-header">
                            Фильтры
                        </div>
                        <div className="container my-3">
                            <div className="row mb-2">
                                <div className="col-lg">
                                    <div className="col-lg">
                                        <label htmlFor="SortSelectControl" className="form-label">Сортировать</label>
                                        <select className="form-select" id="SortSelectControl" onChange={this.handleFiltersChange} value={this.params.sorting}>
                                            <option value=""></option>
                                            <option value="CreateDesc">По дате создания (сначало новые)</option>
                                            <option value="CreateAsc">По дате создания (сначало старые)</option>
                                            <option value="LikeAsc">По количеству лайков (сначало меньше)</option>
                                            <option value="LikeDesc">По количеству лайков (сначало больше)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg">
                                    <label htmlFor="TagSearchControl" className="form-label">Поиск по тэгам</label>
                                    <div className="list-group" style={{ maxHeight: '100px', overflowY: 'auto', border: '1px solid #dee2e6', borderRadius: '0.5rem' }}>
                                        {this.state.tags.map((tag, index) => (
                                            <Form.Check
                                                className="m-1"
                                                key={index}
                                                type="checkbox"
                                                id={tag.id}
                                                checked={this.params.tags.includes(tag.id)}
                                                label={tag.name}
                                                onChange={this.handleTagChange}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg d-flex align-content-end flex-wrap justify-content-end">
                                    <button type="submit" className="btn btn-primary" onClick={this.handelClickAssignButton}>Применить</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Filters;
