import React, {useEffect, useState} from "react";
import {getAuthors} from "../Requests";
import maleImg from "../media/male.png";
import femaleImg from "../media/female.png";
import {ReactComponent as Crown} from "../media/crown-svgrepo-com.svg";
import '../App.css';

export default function AuthorsPage() {

    const [authors, setAuthors] = useState([])

    useEffect(() => {

        getAuthors()
            .then((result) => {
                solveAuthors(result)
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    function solveAuthors(result) {
        let authorsWithId = result.map((item, index) => (
            {
                ...item,
                id: index
            }
        ));

        let top = [...authorsWithId];

        for (let i = 0; i < top.length; i++) {
            for (let j = i + 1; j < top.length; j++) {
                if (top[i].posts < top[j].posts)
                {
                    [top[i], top[j]] = [top[j], top[i]];
                }
                else if(top[i].posts === top[j].posts && top[i].likes < top[j].likes)
                {
                    [top[i], top[j]] = [top[j], top[i]];
                }
            }
        }

        for (let i = 0; i < top.length; i++) {
            if (authorsWithId[i].id === top[0].id)
            {
                authorsWithId[i] = {place: 1, ...authorsWithId[i]}
            }
            else if (authorsWithId[i].id === top[1].id)
            {
                authorsWithId[i] = {place: 2, ...authorsWithId[i]}
            }
            else if (authorsWithId[i].id === top[2].id)
            {
                authorsWithId[i] = {place: 3, ...authorsWithId[i]}
            }
            else
            {
                authorsWithId[i] = {place: null, ...authorsWithId[i]}
            }
        }
        setAuthors(authorsWithId);
    }

    function formatCreateTime(dateTimeString) {
        const options = {day: 'numeric', month: 'numeric', year: 'numeric'};
        return  new Date(dateTimeString).toLocaleString(undefined, options);
    }

    return (
        <div className='container my-3'>
            <div className='list-group'>
                {authors != null && authors.map((item,index)=>(
                    <div className='list-group-item'
                         style={{  cursor: 'pointer' }}
                         onClick={()=>{window.location.href = `/?author=${item.fullName}`;}}
                         key={index}>
                        <div className='my-2'>
                            <div className='row'>
                                <div className='col-auto position-relative'>
                                    <img src={item.gender === 'Male' ? maleImg : femaleImg} style={{ width: "80px", height: "80px" }} />
                                    {item.place != null && (
                                        <Crown
                                            fill={item.place === 1 ? '#ffd700' : item.place === 2 ? '#c0c0c0' : '#cd7f32'}
                                            stroke='black'
                                            style={{ width: "60px",
                                                height: "60px" ,
                                                rotate: '30deg',
                                                position: 'absolute',
                                                top: -20, left: 40 }}
                                        />
                                    )}
                                </div>
                                <div className='col-lg ms-1 pt-1' >
                                    <span style={{  fontSize: '18px' }}>{item.fullName}</span>
                                    <span style={{  color: 'grey'}}> Создан: {formatCreateTime(item.created)}</span>
                                    <p style={{ fontWeight:'bold', color: 'grey'}}>Дата рождения: {formatCreateTime(item.birthDate)}</p>
                                </div>
                                <div className='col-lg ms-3 me-2'>
                                    <div className='row d-flex justify-content-lg-end'>
                                        <div className="badge bg-primary text-wrap col-auto me-2" >
                                            Постов: {item.posts}
                                        </div>
                                        <div className="badge bg-primary text-wrap col-auto" >
                                            Лайков: {item.likes}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

