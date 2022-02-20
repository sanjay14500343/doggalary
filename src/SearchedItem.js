import React, { useState, useEffect } from 'react';
import Modal from './component/Modal';

function SearchedItem(props){
    const [dogImage, setDogImage] = useState(false);
    const [modal, setModal] = useState(false);
    const dogName = props.dogName;
    console.log(props)

    const closeModal = () => {
        setModal(false)
    }
    
    const getDogImage = () => {
        fetch(`https://dog.ceo/api/breed/${dogName}/images/random`)
        .then((response) => response.json())
        .then((json) => {
            setDogImage(json.message)
        })
    }

    useEffect(() => {
        getDogImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {modal && <Modal dog={dogName} closeModal={closeModal}/>}
            <div className="item" onClick={() => setModal(!modal)}>
                <div className="dog-image">
                    <img src={dogImage} alt="Dog"/>
                </div>
                <p className="dog-name"> {dogName} </p>
            </div>
        </>
    );
}

export default SearchedItem;