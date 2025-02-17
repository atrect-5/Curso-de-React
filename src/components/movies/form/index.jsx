
import React, { Component } from "react";

import { createMovieService } from "../../../services";

import { movieRating, movieTags } from "../../../consts";

import './index.scss'

export default class MovieForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            newMovie:{
                title: '',
                year: '',
                description: '',
                duration: '',
                contentRating: '',
                tags: [],
                tiketPrice: '',
                isOnCinemas: false,
                schedules: [{
                    time: ''
                }]
            },
            touched: {
                title: false,
                year: false
            },
            created: {

            }
        }
    }


    componentDidMount = () => {
        
    }

    // Función para convertir la fecha al formato requerido por el campo datetime-local
    formatDateTimeForInput = (datetime) => {
        const date = new Date(datetime);
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
        return adjustedDate.toISOString().slice(0, 16);
    }

    // Función para convertir la fecha al formato requerido por MongoDB
    formatDateTimeForDatabase = async () => {
        this.setState(prevState => ({
            newMovie: {
                ...prevState.newMovie,
                schedules: prevState.newMovie.schedules
                                                .filter(schedule => schedule.time )
            }
        }))
    }


    // Metodo que actualiza los datos del state cuando se hace algun cambio
    handleChange = e => {
        // Obtenemos el nombre del elemento que se cambio y el valor del mismo
        const { name, value, type, checked } = e.target
        // Guardamos en el state los datos de la pelicula que teniamos mas el valor del objeto cambiado
        this.setState(prevState => ({
            newMovie: {
                ...prevState.newMovie,
                [name]: type === 'checkbox' ? checked : (value || '')
            },
            touched: {
                ...prevState.touched,
                [name] : true
            }
        }))
    }

    // Metodo que agrega el tag a la lista del state cuando se selecciona un elemento
    handleCheckboxChange = e => {
        const { name, checked } = e.target
        this.setState(prevState => ({
            newMovie:{
                ...prevState.newMovie,
                tags : checked ?
                    [...prevState.newMovie.tags, name]
                    : prevState.newMovie.tags.filter(tag => tag !== name)
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
                schedules: [...prevState.newMovie.schedules, { time: '' }]
            }
        }))
    }

    // Metodo para quitar un horario
    removeSchedule = index => {

        this.setState((prevState) => ({
            newMovie: {
                ...prevState.newMovie,
                schedules : prevState.newMovie.schedules.filter((schedule, i) => i !== index)
            }
        }))
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

    handleSubmit = async () => {
        // Primero formatemos la fecha y esperamos a que termine la funcion, ya que se debe eliminar los horarios vacios
        await this.formatDateTimeForDatabase()

        const { newMovie } = this.state
        this.setState({
            touched:{
                title:true,
                year:true
            }
        })

        if (!newMovie.title || !newMovie.year || newMovie.year<0){
            return
        }

        try {
            const result = await createMovieService (newMovie)

            if (!result.hasError){
                console.log('Pelicula creada con exito')
                console.log(result)                
            }else{
                console.log('Hubo un error al crear pelicula')
                console.log(result.error)
            }

        }catch(error){
            console.log('Error del servidor')
            console.log(error)            
        }
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
                    <p className="page-title">{this.state.newMovie.title ? 'Editar pelicula' : 'Crear Pelicula' }</p>
                    <div className="input-data-container">

                        <input type="text" name="title" value={title} 
                            placeholder="Titulo" required onChange={this.handleChange} 
                        />
                        {
                            this.state.touched.title && !title && (
                                <p className="error-message">El título es necesario</p>
                            ) 
                        }
                        <textarea name="description" value={description} 
                            placeholder="Descripcion" onChange={this.handleChange}>
                        </textarea>
                        <input type="number" name="year" value={year} 
                            placeholder='Año' required onChange={this.handleChange}
                        />
                        {
                            this.state.touched.year && !year && (
                                <p className="error-message">El año es necesario</p>
                            )
                        }{
                            year<0 && (
                                <p className="error-message">El año no puede ser negativo</p>
                            )
                        }
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

                        <p>La pelicula esta en el cine? <input type="checkbox" name="isOnCinemas" 
                        checked={isOnCinemas} onChange={this.handleChange}/></p>

                        <p>Horarios:</p>
                        {schedules.map((schedule, index) => (
                            <div key={index} className="schedule-input">
                                <input type="datetime-local" value={schedule.time ? this.formatDateTimeForInput(schedule.time) : ''} onChange={(e) => this.handleScheduleChange(index, e)} />
                                <button type="button" onClick={() => this.removeSchedule(index)}>Eliminar</button>
                            </div>
                        ))}
                        <button type="button" onClick={this.addSchedule}>Agregar Horario</button>


                        <button className="save-info-button" onClick={() => this.handleSubmit()}>Guardar informacion</button>


                    </div>
                </div>
            </>
        )
    }
}