
import React, { Component } from "react";


// import { createMovieService } from "../../../services";

import { movieRating, movieTags } from "../../../consts";

import './index.scss'


// Función para convertir la fecha al formato requerido por el campo datetime-local
const formatDateTimeForInput = (datetime) => {
    return datetime.slice(0, 16);
};

// Función para convertir la fecha al formato requerido por MongoDB
/*const formatDateTimeForDatabase = (datetime) => {
    return new Date(datetime).toISOString();
};*/

export default class MovieForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            newMovie:{
                title: '',
                year: null,
                description: '',
                duration: null,
                contentRating: '',
                tags: [],
                tiketPrice: null,
                isOnCinemas: false,
                schedules: [{
                    time: null
                }]
            }
        }
    }


    // Metodo que actualiza los datos del state cuando se hace algun cambio
    handleChange = e => {
        // Obtenemos el nombre del elemento que se cambio y el valor del mismo
        const { name, value } = e.target
        // Guardamos en el state los datos de la pelicula que teniamos mas el valor del objeto cambiado
        this.setState(prevState => ({
            newMovie: {
                ...prevState.newMovie,
                [name]: value
            }
        }))
    }

    // Metodo que agrega el tag a la lista del state cuando se selecciona un elemento
    handleCheckboxChange = e => {
        const { name, checked } = e.target
        this.setState(prevState => {
            const tags = checked ?
                [...prevState.newMovie.tags, name]
                : prevState.newMovie.tags.filter(tag => tag !== name)
            return {
                newMovie:{
                    ...prevState.newMovie,
                    tags
                }
            }
        })
    }

    // Metodo cuando is onCinema cambia
    handleOnCinemaChange = e =>{
        // Guardamos el valor del checkbox isOnCinemas en el state (true or false)
        this.setState((prevState) => ({
            newMovie: {
                ...prevState.newMovie,
                isOnCinemas: e.target.checked
            }
        }))
    }

    /******* Schedules *******/
    // Metodo para agregar otro horario
    addSchedule = () => {
        // Se agrega un nuevo horario a la lista de schedules con valor nulo
        this.setState((prevState) => ({
            newMovie: {
                ...prevState.newMovie,
                schedules: [...prevState.newMovie.schedules, { time: null }]
            }
        }));
    }

    // Metodo para quitar un horario
    removeSchedule = index => {
        this.setState((prevState) => {
            // Se obtiene la lista de horarios que hay
            const schedules = [...prevState.newMovie.schedules]
            // Se elimina el horario en la posicion 'index' de la lista
            schedules.splice(index, 1)
            // Se guarda la nueva lista de los horarios en e state
            return {
                newMovie: {
                    ...prevState.newMovie,
                    schedules
                }
            };
        });
    }

    // Metodo que guarda los cambios de los horarios en el state
    handleScheduleChange = (index, e) => {
        // Se obtiene el valor (fecha) del 'target' 
        const { value } = e.target
        this.setState((prevState) => {
            // Se obtiene la lista de los horarios que existen en el state
            const schedules = [...prevState.newMovie.schedules]
            // Se cambia el valor de 'time' en la lista de horarios en la posicion 'index'
            schedules[index].time = value
            // Se guardan los datos en el state
            return {
                newMovie: {
                    ...prevState.newMovie,
                    schedules
                }
            }
        })
    }

    render () {
        const {
            title,
            year,
            description,
            duration,
            contentRating,
            tags,
            tiketPrice,
            isOnCinemas,
            schedules
        } = this.state.newMovie 

        return(
            <>
                <div className="form-movie-container">
                    <p className="page-title">Crear pelicula: </p>
                    <div className="input-data-container">

                        <input type="text" name="title" value={title} 
                            placeholder="Titulo" required onChange={this.handleChange} 
                        />
                        <textarea name="description" value={description} 
                            placeholder="Descripcion" onChange={this.handleChange}>
                        </textarea>
                        <input type="number" name="year" value={year} 
                            placeholder='Año' required onChange={this.handleChange}
                        />
                        <input type="number" name="duration" value={duration} 
                            placeholder="Duracion" onChange={this.handleChange} 
                        />
                        <select name="contentRating" value={contentRating} onChange={this.handleChange}>
                            <option value="" disabled hidden>Clasificación</option>
                            {
                                movieRating.map( (rating) => (
                                    <option value={rating} key={rating}>{rating}</option>
                                ))
                            }
                        </select>

                        <p>
                            Genero de la pelicula:
                        </p>
                        {
                            movieTags.map((tag) => (
                                <label key={tag}>
                                    {tag} <input type="checkbox" name={tag} 
                                    checked={tags.includes(tag)} onChange={this.handleCheckboxChange}/>
                                </label>
                            ))
                        }

                        <input type="number" name="tiketPrice" value={tiketPrice} 
                            placeholder="Precio del boleto" onChange={this.handleChange}
                        />

                        <p>La pelicula esta en el cine? <input type="checkbox" name="inOnCinemas" 
                        checked={isOnCinemas} onChange={this.handleOnCinemaChange}/></p>

                        <p>Horarios:</p>
                        {schedules.map((schedule, index) => (
                            <div key={index} className="schedule-input">
                                <input type="datetime-local" value={schedule.time ? formatDateTimeForInput(schedule.time) : ''} onChange={(e) => this.handleScheduleChange(index, e)} />
                                <button type="button" onClick={() => this.removeSchedule(index)}>Eliminar</button>
                            </div>
                        ))}
                        <button type="button" onClick={this.addSchedule}>Agregar Horario</button>


                        <input type="submit" value="Guardar informacion" />


                    </div>
                </div>
            </>
        )
    }
}