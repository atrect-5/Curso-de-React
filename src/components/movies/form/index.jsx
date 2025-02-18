
import React, { Component } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

import { TextField, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';

import { createMovieService, getMoviesService, updateMovieByIdService } from "../../../services";

import { movieRating, movieTags } from "../../../consts";

import './index.scss'

class MovieFormClass extends Component {
    constructor(props){
        super(props)
        this.state = this.getInitialState()
    }
    // Creamos un objeto en el que se guardara el estado inicial
    getInitialState = () => ({
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
        isCreate:false,
        isReady: false
    })

    // Debido a que se trata del mismo componente es necesario editar la informacion cuando se accede desde diferentes url
    componentDidMount = async () => {
        this.loadMovieData()
    }
    
    // Debido a que se trata del mismo componente es necesario editar la informacion cuando se accede desde diferentes url
    componentDidUpdate(prevProps) {
        if (this.props.params.movieId !== prevProps.params.movieId) {
            this.setState(this.getInitialState(), this.loadMovieData)
        }
    }
    
    loadMovieData = async () => {
        const { movieId } = this.props.params
        // Checamos si se esta actualizando una pelicula o creando una segun los parametros que recibimos
        if (movieId){
            // Update
            const movie = await getMoviesService(movieId)
            this.setState({
                newMovie: movie,
                isReady: true,
                isCreate:false
            })
        }else{
            // Create
            this.setState({
                newMovie: this.getInitialState().newMovie,
                isCreate:true
            })
        }
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
        const { name, value } = e.target
        // Guardamos en el state los datos de la pelicula que teniamos mas el valor del objeto cambiado
        this.setState(prevState => ({
            newMovie: {
                ...prevState.newMovie,
                [name]: value
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
            toast.error(`Faltan datos`)
            return
        }

        try {
            if (this.state.isCreate){
                const result = await createMovieService (newMovie)
    
                if (!result.hasError){
                    toast.success('Pelicula creada con exito')  
                    this.setState(this.getInitialState())      
                }else{
                    toast.error(`Hubo un error al crear pelicula -> ${result.error}`)
                }
            }else{
                const result = await updateMovieByIdService (newMovie._id, newMovie)
                if (!result.hasError){
                    toast.success('Pelicula actualizada con exito')  
                    this.props.navigate(`/movies/${newMovie._id}`)
                }else{
                    toast.error(`Hubo un error al actualizar pelicula -> ${result.error}`)
                }
            }
    
        }catch(error){
            toast.error(`Error del servidor`)
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

        const options = movieRating.map((rating) => ({
            label: rating,
            value: rating,
        }))

        const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

        return(
            <>
                <div className="form-movie-container">
                    <p className="page-title">{this.state.isCreate ? 'Crear Pelicula' : 'Editar pelicula' }</p>
                    <div className="input-data-container">
                        <div className="left-side-input-data">

                            <TextField className="input" type="text" name="title" value={title} variant="standard"
                                label="Titulo" required onChange={this.handleChange} 
                            />
                            {
                                this.state.touched.title && !title && (
                                    <p className="error-message">El título es necesario</p>
                                ) 
                            }
                            <TextField className="text-area" name="description" value={description} 
                                variant="outlined"
                                label="Descripcion" onChange={this.handleChange}
                                multiline
                                maxRows={4}/>
                                
                            <TextField className="input" type="number" name="year" value={year} variant="standard"
                                label='Año' required onChange={this.handleChange}
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
                            <TextField className="input" type="number" name="duration" value={duration} variant="standard"
                                label="Duracion" onChange={this.handleChange} 
                            />

                            <TextField className="input" type="number" name="tiketPrice" value={tiketPrice} variant="standard"
                                label="Precio del boleto" onChange={this.handleChange}
                            />

                            <Autocomplete
                                className="autocomplete"
                                name= 'contentRating'
                                options={options}
                                getOptionLabel={(option) => option.label}
                                value={options.find(option => option.value === contentRating) || null}
                                onChange={(event, newValue) => {
                                    this.handleChange({ target: { name: 'contentRating', value: newValue ? newValue.value : '' } })
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Clasificación" variant="standard" className="input"/>
                                )}
                            />

                            {/*
                            <select name="contentRating" value={contentRating} onChange={this.handleChange}>
                            <option value="" disabled hidden>Clasificación</option>
                            {
                                movieRating.map( (rating) => (
                                <option value={rating} key={rating}>{rating}</option>
                                ))
                            }
                            </select>
                            */}
                        </div>
                        <div className="rigth-side-input-data">
                            <p>
                                Genero de la pelicula:
                            </p>
                            <div className="checkbox-matrix">
                                {
                                movieTags.map((tag) => (
                                    <FormControlLabel
                                    key={tag}
                                    control={
                                        <Checkbox
                                        className="checkbox-custom"
                                        name={tag}
                                        checked={tags.includes(tag)}
                                        onChange={this.handleCheckboxChange}
                                        />
                                    }
                                    label={tag}
                                    />
                                ))
                                }
                                {/*
                                    movieTags.map((tag) => (
                                        <label key={tag}>
                                            {tag} <input type="checkbox" name={tag} 
                                            checked={tags.includes(tag)} onChange={this.handleCheckboxChange}/>
                                            </label>
                                    ))
                                */}
                            </div>
                            <br />
                            <hr />
                            <br />

                            <FormControlLabel
                            control={
                                <Checkbox {...label} checked={isOnCinemas} 
                                className="checkbox-custom"
                                onChange={() => {
                                    this.handleChange({ target: { name: 'isOnCinemas', value: isOnCinemas ? false : true } })
                                }} />
                            }
                            label="Está en cines"
                            />

                            <p>Horarios:</p>
                            {schedules.map((schedule, index) => (
                                <div key={index} className="schedule-input">
                                    <input type="datetime-local" value={schedule.time ? this.formatDateTimeForInput(schedule.time) : ''} onChange={(e) => this.handleScheduleChange(index, e)} />
                                    <button type="button" onClick={() => this.removeSchedule(index)} className="remove-schedule-button">—</button>
                                </div>
                            ))}
                            <button type="button" onClick={this.addSchedule} className="add-schedule-button">Agregar Horario</button>

                        </div>

                    </div>

                    <button className="save-info-button" onClick={() => this.handleSubmit()}>Guardar informacion</button>

                </div>
            </>
        )
    }
}

// Componente funcional para obtener los parámetros de la URL y pasarlos como props
const MovieForm = (props) => {
    const params = useParams()
    const navigate = useNavigate()
    return <MovieFormClass {...props} params={params} navigate={navigate} />
}

export default MovieForm;