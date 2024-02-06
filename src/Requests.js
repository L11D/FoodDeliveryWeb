const baseUrl = 'https://blog.kreosoft.space/api';

export const getPosts = (userToken, searchParams, paginationParams) => {
    let url = `${baseUrl}/post?`
    if (searchParams.authorName != null && searchParams.authorName !== '')
        url += `author=${searchParams.authorName}`;

    searchParams.tags.map((tag) => (
        url += `&tags=${tag}`
    ))

    if (searchParams.minReading != null && searchParams.minReading !== '')
        url += `&min=${searchParams.minReading}`;
    if (searchParams.maxReading != null && searchParams.maxReading !== '')
        url += `&max=${searchParams.maxReading}`;
    if (searchParams.sorting !== null && searchParams.sorting !== '')
        url += `&sorting=${searchParams.sorting}`
    if (searchParams.onlyMyCommunities !== null && searchParams.onlyMyCommunities !== '')
        url += `&onlyMyCommunities=${searchParams.onlyMyCommunities}`;
    url += `&page=${paginationParams.page}`;
    url += `&size=${paginationParams.size}`;

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);

    let options = {
        method: 'GET',
        headers: headers,
    }

    return fetch(url, options)
        .then((res) => {

            if (!res.ok) {
                throw new Error(`${res.status}`);
            }

            return res.json();
        });
};

export const getTags = () => {
    let url = `${baseUrl}/tag`

    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
};

export const login = (loginCredentials) => {
    let url = `${baseUrl}/account/login`

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify(loginCredentials);

    let options = {
        method: 'POST',
        headers: headers,
        body: body
    };

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
};

export const register = (registrationCredentials) => {
    let url = `${baseUrl}/account/register`

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify(registrationCredentials);

    let options = {
        method: 'POST',
        headers: headers,
        body: body
    };

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
};

export const getProfile = (userToken) => {
    let url = `${baseUrl}/account/profile`

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);

    let options = {
        method: 'GET',
        headers: headers,
    };

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
};

export const userLogout = (userToken) => {
    let url = `${baseUrl}/account/logout`

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);

    let options = {
        method: 'POST',
        headers: headers,
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
};


export const setProfile = (userToken, profileCredentials) => {
    let url = `${baseUrl}/account/profile`
    let body = JSON.stringify(profileCredentials);

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);
    headers.append('Content-Type', 'application/json');

    let options = {
        method: 'PUT',
        headers: headers,
        body: body
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                console.log(res.json());
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
}

export const getPost = (postId, userToken) => {
    let url = `${baseUrl}/post/`
    url += postId;

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);

    let options = {
        method: 'GET',
        headers: headers,
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
};

export const getCommentTree = (commentId) => {
    let url = `${baseUrl}/comment`
    url+= `/${commentId}/tree`
    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
};

export const createComment = (userToken, postId, commentData) => {
    let url = `${baseUrl}/post/${postId}/comment`
    let body = JSON.stringify(commentData);

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);
    headers.append('Content-Type', 'application/json');

    let options = {
        method: 'POST',
        headers: headers,
        body: body
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
        });
}

export const editComment = (userToken, commentId, commentData) => {
    let url = `${baseUrl}/comment/${commentId}`
    let body = JSON.stringify(commentData);

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);
    headers.append('Content-Type', 'application/json');

    let options = {
        method: 'PUT',
        headers: headers,
        body: body
    }

    return fetch(url, options)
        .then((res) => {

            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
        });
}

export const deleteComment = (userToken, commentId) => {
    let url = `${baseUrl}/comment/${commentId}`

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);

    let options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
        });
}

export const setLikeToPost = (postId, userToken) => {
    let url = `${baseUrl}/post/`
    url += postId;
    url+= '/like'

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);

    let options = {
        method: 'POST',
        headers: headers,
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
        });
};

export const deleteLikeFromPost = (postId, userToken) => {
    let url = `${baseUrl}/post/`
    url += postId;
    url+= '/like'

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);

    let options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
        });
};

export const getCommunities = () => {
    let url = `${baseUrl}/community`
    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
};

export const getAddressChain = (guid) => {
    let url = `${baseUrl}/address/chain?objectGuid=${guid}`

    let options = {
        method: 'GET',
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
};

export const getMyCommunities = (userToken) => {
    let url = `${baseUrl}/community/my`

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);

    let options = {
        method: 'GET',
        headers: headers,
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
}

export const getCommunityById = (communityId) => {
    let url = `${baseUrl}/community/${communityId}`

    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
}

export const createPersonalPost = (userToken, postData) => {
    let url = `${baseUrl}/post/`
    let body = JSON.stringify(postData);

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);
    headers.append('Content-Type', 'application/json');

    let options = {
        method: 'POST',
        headers: headers,
        body: body
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
}

export const createPostInCommunity = (userToken, communityId, postData) => {
    let url = `${baseUrl}/community/${communityId}/post`
    let body = JSON.stringify(postData);

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);
    headers.append('Content-Type', 'application/json');

    let options = {
        method: 'POST',
        headers: headers,
        body: body
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
}

export const addressSearch = (parentObjectId, query) => {
    let url = `${baseUrl}/address/search?parentObjectId=${parentObjectId}&query=${query}`

    let options = {
        method: 'GET',
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
}

export const getRoleInCommunity = (userToken, communityId) => {
    let url = `${baseUrl}/community/${communityId}/role`

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);

    let options = {
        method: 'GET',
        headers: headers,
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
};

export const subscribeToCommunity = (userToken, communityId) => {
    let url = `${baseUrl}/community/${communityId}/subscribe`

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);

    let options = {
        method: 'POST',
        headers: headers,
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
        });
};

export const unsubscribeToCommunity = (userToken, communityId) => {
    let url = `${baseUrl}/community/${communityId}/unsubscribe`

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);

    let options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetch(url, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
        });
};

export const getPostsInCommunity = (userToken, searchParams, paginationParams, communityId) => {
    let url = `${baseUrl}/community/${communityId}/post?`
    if (searchParams.authorName != null && searchParams.authorName !== '')
        url += `author=${searchParams.authorName}`;

    searchParams.tags.map((tag) => (
        url += `&tags=${tag}`
    ))

    if (searchParams.minReading != null && searchParams.minReading !== '')
        url += `&min=${searchParams.minReading}`;
    if (searchParams.maxReading != null && searchParams.maxReading !== '')
        url += `&max=${searchParams.maxReading}`;
    if (searchParams.sorting !== null && searchParams.sorting !== '')
        url += `&sorting=${searchParams.sorting}`
    if (searchParams.onlyMyCommunities !== null && searchParams.onlyMyCommunities !== '')
        url += `&onlyMyCommunities=${searchParams.onlyMyCommunities}`;
    url += `&page=${paginationParams.page}`;
    url += `&size=${paginationParams.size}`;

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userToken}`);

    let options = {
        method: 'GET',
        headers: headers,
    }

    return fetch(url, options)
        .then((res) => {

            if (!res.ok) {
                throw new Error(`${res.status}`);
            }

            return res.json();
        });
};

export const getCommunity = (communityId) => {
    let url = `${baseUrl}/community/${communityId}`
    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
};

export const getAuthors = () => {
    let url = `${baseUrl}/author/list`

    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
};
