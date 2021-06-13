import axios from 'axios'
import React from 'react'
import imgbbUploader from 'imgbb-uploader'
import './style.css'
import {useState} from 'react'
import { useSelector } from 'react-redux'
import actions from '../../store/actions'

const AdminScreen = () => {

    const userInfo = useSelector(()=>actions.get('userInfo'))
    const { token } = userInfo || {}
    const [file64encoded, setFile64encoded] = useState()
    const [preview, setPreview] = useState()
    const [prodName, setProdName] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState('')
    const [inStock, setInStock] = useState('')
    const [description, setDescription] = useState('')
    
    

    const selectImage = (e) => {
        const _file = e.target.files[0]
        if(_file) setPreview(URL.createObjectURL(_file))
        convertTo64encoded(_file)
    }

    const onDrop = (e) => {
        e.preventDefault()
        const _file = e.dataTransfer.files[0]
        if(_file) setPreview(URL.createObjectURL(_file))
        convertTo64encoded(_file)
    }

    const convertTo64encoded = (file) =>{
        if(file) {
            const reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const _file64encoded = reader.result
                setFile64encoded(_file64encoded.split(',')[1])
            }
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const imgbbOptions = {
            apiKey: '8579a1c9f92d69ae98691c4b9de5ad90',
            base64string: file64encoded
        }

        imgbbUploader(imgbbOptions)
         .then(async(response) => {
             console.log(response)
             const { url } = response
             const product = {
                 name: prodName,
                 image: url,
                 category,
                 price,
                 brand,
                 rating,
                 description,
                 inStock
             }
             console.log(response)
             const { data } = await axios.post('https://glacial-ravine-24086.herokuapp.com/api/products/seed', product,
             { 
                headers: { Authorization: `Bearer ${token}` }
              })
        })
         .catch((error) => console.log(error))
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }

    return (
        <div className='admin'>
            <div className='upload-box'>
                <img 
                    src={preview || '/images/uploadsnip.png'} 
                    alt=""
                    onDrop={onDrop} 
                    onDragOver={onDragOver}
                />
                <div className='input-label'>
                <label htmlFor="imageUpload" > Choose a file </label>
                </div>
                <input 
                    id='imageUpload'
                    className='hide'
                    type="file" 
                    accept='image/*' 
                    onChange={selectImage}
                />
            </div>
            <form type='submit' className='form'>
                <div>
                 <label htmlFor="prdName">Product name:</label>  
                 <input 
                    type="text"
                    id='prodName'
                    value={prodName}
                    onChange={e => setProdName(e.target.value)}
                    placeholder='Product name'
                    required
                 />
                </div>
                <div>
                 <label htmlFor="Category">Category:</label>  
                 <input 
                    type="text"
                    id='Category'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    placeholder='Category'
                    required
                 />
                </div>
                <div>
                 <label htmlFor="Brand">Brand:</label>  
                 <input 
                    type="text"
                    id='Brand'
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    placeholder='Brand'
                    required
                 />
                </div> 
                <div>
                 <label htmlFor="Price">Price:</label>  
                 <input 
                    type="number"
                    id='Price'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder='Price'
                    required
                 />
                 </div>
                <div>
                 <label htmlFor="Rating">Rating:</label>  
                 <input 
                    type="number"
                    id='Rating'
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                    placeholder='Rating'
                    required
                 />
                </div>
                <div>
                 <label htmlFor="inStock">Quantity in stock:</label>   
                 <input 
                    type="number"
                    id='inStock'
                    value={inStock}
                    onChange={e => setInStock(e.target.value)}
                    placeholder='Quantity in stock'
                    required
                 />
                </div>
                <div>
                 <label htmlFor="Description">Product description:</label>  
                 <textarea 
                    id="Description"  
                    cols="37" 
                    rows="5" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder='Description'
                    required
                 />
                </div> 
                 <button className='btn primary block' onClick={handleSubmit}>Post</button>
            </form>
        </div>
    )
}

export default AdminScreen
