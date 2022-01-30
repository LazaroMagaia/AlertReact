import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
function Home()
{
    const [server,SetServer]= useState("");
    const [status,SetStatus] = useState(null);
    const Websearch = yup.object({
        search: yup.string().required("o campo deve ser preenchido"),
      }).required();
    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver: yupResolver(Websearch)
    });

    const onSubmit = data =>{
        console.log(data);
        axios.post("http://127.0.0.1:8000/api/search",data)
        .then((response)=>{
            SetServer(response.data.message);
            SetStatus(true);
        })
        .catch((error)=>{
            SetServer(<div>
                <p>Algo deu errado</p>
                <span>Nao conseguimos acessar o site</span>
            </div>);
            SetStatus(false);
        });
    }
    return(
        <div className='home'>
            <div className='container'>
                <div className='banner-principal'>
                    <div className='desc'>
                        <h3>O meu site esta offline ?</h3>
                        <p>Caiu para todos ou so para mim</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" placeholder='exemplo.com' name="search" 
                            {...register("search")}/>
                            <p className='error-message'>{errors.search?.message}</p>
                            <button type='submit'>Descobrir</button>
                        </form>
                    </div>
                    <div className='server-response'>
                        { status ?(
                            <div>
                                <p>Esta tudo certo</p>
                                <span>Esta tudo normal por aqui</span>
                            </div>
                        ):
                        (
                            <div>
                                {server}
                            </div>
                        )
                        }

                    </div>{/**server-response */}
                </div>{/* banner-principal*/} 
                <div className='mais-vistos'>
                    <h3>Ultimas consultas realizadas</h3>
                    <table className='table-home'>
                        <thead>
                            <tr>
                                <th>Dominiu(url)</th>
                                <th>Ultima verificacao</th>
                                <th>Status do site</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>llmagaia.com</td>
                                <td>1 hora atras</td>
                                <td>Functionando normalmente</td>
                            </tr>
                            <tr>
                                <td>llmagaia.com</td>
                                <td>1 hora atras</td>
                                <td>Functionando normalmente</td>
                            </tr>
                            <tr>
                                <td>llmagaia.com</td>
                                <td>1 hora atras</td>
                                <td>Fora do ar</td>
                            </tr>
                            <tr>
                                <td>llmagaia.com</td>
                                <td>1 hora atras</td>
                                <td> Icone Functionando normalmente</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>{/*container*/} 
        </div>
    )
}

export default Home;