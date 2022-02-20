import React, { useState, useEffect } from 'react';

function SearchModal(props){
    const [dogs, setDogs] = useState('')
    const [breedName, setBreedName] = useState('')
    const [imageCount, setImageCount] = useState('')
    const [dogImages, setDogImages] = useState('')
    const [breedNameShow, setBreedNameShow] = useState('')
    const [imageCountShow, setImageCountShow] = useState('')
    
    const getDogs = () => {
        fetch('https://dog.ceo/api/breeds/list/all')
        .then((response) => response.json())
        .then((json) => {
            setDogs(json.message)
        })
    }
    
    const getImages = () => {
        breedName &&
        fetch(`https://dog.ceo/api/breed/${breedName}/images/random/${imageCount}`)
        .then((response) => response.json())
        .then((json) => {
            setDogImages(json.message)
        })
        setBreedNameShow(breedName)
        setImageCountShow(imageCount)
        
    }

    useEffect(() => {
        getDogs();
    }, [])

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="close-modal" onClick={() => props.closeModal()}>X</div>
                <div className="modal-dog-name">Custom Search</div>
                <div className="modal-content">
                    <div className="modal-search">
                        <div className="modal-search-box">
                            <select value={breedName} onChange={(e) => setBreedName(e.target.value)}>
                                <option>Select a Breed</option>
                                {Object.keys(dogs).map((dogs, i) => (
                                    <option key={i} value={dogs}>{dogs}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-search-box">
                            <input type="number" placeholder="Number of Images" value={imageCount} onChange={(e) => setImageCount(e.target.value)}/>
                        </div>
                    </div>
                    <div className="text-center">
                        <button onClick={() => getImages()}>Get Images</button>
                    </div>
                    {dogImages && <h5 className="search-modal-heading">Showing "{imageCountShow}" Images "{breedNameShow}"</h5>}
                    {dogImages && 
                        <div className="search-result">
                            {dogImages && dogImages.map((dogImages, i) => (
                                <div key={i} className="search-result-box">
                                    <img src={dogImages} alt="searched-dog"/>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchModal;