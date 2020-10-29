import React, {useState,useEffect, FormEvent,ChangeEvent} from "react";
import {Map, Marker,TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet'
import {useHistory} from 'react-router-dom'
//import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../components/Sidebar";


import '../styles/pages/create-orphanage.css';

import { FiPlus } from "react-icons/fi";
//import Map from "../../components/Map";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";


interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekend: string;
  images:Array<{
    url: string,
    id: number,
  }>
}

export default function OrphanagesMap() {
  const [position,setPosition] = useState({latitude: 0,longitude:0})
  const [name,setName] = useState('');
  const [about,setAbout] = useState('');
  const [instructions,setInstructions] = useState('');
  const [opening_hours,setOpeningHours] = useState('');
  const [open_on_weekends,setOpenOnWeekends] = useState(true);
  const [images,setImages] = useState<File[]>([]);
  const [previewImages,setPreviewImages] = useState<string[]>([]);
  const history = useHistory();

  function handleSelectImages(event:ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }
    
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image=>{
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
    
  }

  function handleMapClick(event: LeafletMouseEvent){
    const {lat,lng} = event.latlng
    setPosition({
      latitude: lat,
      longitude:lng
    });
  }
  
  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    const {latitude,longitude} = position;
    
    const data = new FormData();

    data.append('name',name);
    data.append('about',about);
    data.append('instructions',instructions);
    data.append('latitude',String(latitude));
    data.append('longitude',String(longitude));
    data.append('opening_hours',opening_hours);
    data.append('open_on_weekends',String(open_on_weekends));
    images.forEach(image => {
      data.append('images',image)
    });

    await api.post('orphanages',data);
    
    console.log(
      {
      "mensage":"cadastro realizado com sucesso",
      latitude,
      longitude,
      name,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    });

    history.push('/app');
  }
  
  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>
            
            <Map 
              style={{ width: '100%', height: 280 }} 
              center={[-30.0603358,-51.2193373]} 
              zoom={15} 
              onClick={handleMapClick}>
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}>
                </TileLayer>
                {position.latitude !== 0 &&
                (
                  <Marker 
                    interactive={false} 
                    icon={mapIcon} 
                    position={[position.latitude,position.longitude]} />
                ) 
              }
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name}/>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                    type="button" 
                    className={open_on_weekends? "active":""}
                    onClick={()=>setOpenOnWeekends(true)}>
                    Sim
                  </button>
                <button type="button"
                  className={!open_on_weekends? "active" :""}
                  onClick={()=>setOpenOnWeekends(false)}>
                  Não</button>
              </div>
            </div>
          </fieldset>
          <button type="submit">Confirmar</button>
          {/* <PrimaryButton type="submit">Confirmar</PrimaryButton> */}
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;