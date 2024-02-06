import './App.css';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import MainPage from "./pages/MainPageFolder/MainPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import React from "react";
import Footer from "./components/Footer";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import CommunityPage from "./pages/CommunityPage";
import PostCreationPage from "./pages/PostCreationPage";
import AuthorsPage from "./pages/AuthorsPage";
import NotFoundPage from "./pages/NotFoundPage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.setToken = this.setToken.bind(this);
        this.state ={
           userToken: ''
        }
    }

    setToken(token)
    {
        this.setState({userToken: token});
    }

    render()
    {
        return (
            <div className ='app-container d-flex flex-column min-vh-100'>
                <Header/>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainPage/>} />
                        <Route path="/login" element={<LoginPage handleToken={this.setToken}/>} />
                        <Route path="/registration" element={<RegistrationPage handleToken={this.setToken}/>} />
                        <Route path="/profile" element={<ProfilePage/>} />
                        <Route path="/communities" element={<CommunitiesPage/>} />
                        <Route path="/communities/:id" element={<CommunityPage/>} />
                        <Route path="/post/:id" element={<PostPage/>} />
                        <Route path="/post/create" element={<PostCreationPage/>} />
                        <Route path="/authors" element={<AuthorsPage/>} />
                        <Route path="*" element={<NotFoundPage/>} />
                    </Routes>
                </Router>
                <Footer/>
            </div>
        );
    }
}

export default App;
