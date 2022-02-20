import React, { useState, useEffect } from 'react';

function Modal(props){
    const [dog, setDog] = useState('');
    const [dogImages, setDogImages] = useState('');
    const dogName = props.dog;

    const getSubBreed = () => {
        fetch(`https://dog.ceo/api/breed/${dogName}/list`)
        .then((res) => res.json())
        .then((json) => {
            if(json.message.length === 0){
                setDog('')
            } else {
                finalInfo(json.message)
            }
        })
    }
    
    const finalInfo = (subBreed) => {
        var newList = [];
        for(let i=0;i<subBreed.length;i++){
            fetch(`https://dog.ceo/api/breed/${dogName}/${subBreed[i]}/images/random/1`)
            .then((response) => response.json())
            .then((json) => {
                newList.push(json.message[0])
                if(newList.length === subBreed.length){
                    setDog(newList)
                } else {
                    // do nothing
                }
            })
        }
    }
    
    const getMoreImages = () => {
        fetch(`https://dog.ceo/api/breed/${dogName}/images/random/5`)
        .then((response) => response.json())
        .then((json) => {
            setDogImages(json.message)
        })
    }
    
    useEffect(() => {
        getSubBreed();
        getMoreImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="close-modal" onClick={() => props.closeModal()}>X</div>
                <div className="modal-dog-name">{dogName}</div>
                <div className="modal-content">
                    {dog && <h5 className="modal-heading">Sub Breeds</h5>}
                    <div className="more-images">
                        {dog && dog.map((dog, i) => (
                            <div className="more-images-box" key={i}>
                                <img src={dog} alt="Dog"/>
                                <span>{dog.split('/')[4].split('-')[1]}</span>
                            </div>
                        ))}
                    </div>
                    {dogImages && <h5 className="modal-heading">More Images</h5>}
                    <div className="more-images">
                        {dogImages && dogImages.map((dogImages, i) => (
                            <div className="more-images-box" key={i}>
                                <img src={dogImages} alt="Dog"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;