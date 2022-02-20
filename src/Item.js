import React, { useState, useEffect } from 'react';
import Modal from './component/Modal';

function Item(props){
    const [dogImage, setDogImage] = useState(false);
    const [modal, setModal] = useState(false);
    const dogName = props.dogs;

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

export default Item;