import React, { useState, useEffect } from "react";
import Item from "./Item";
import SearchedItem from "./SearchedItem";
import SearchModal from "./component/SearchModal";

function App(){
    const [dogs, setDogs] = useState('');
    const [searchedDogs, setSearchedDogs] = useState('');
    const [search, setSearch] = useState('');
    const [searchModal, setSearchModal] = useState('');
    
    const getDogs = () => {
        fetch('https://dog.ceo/api/breeds/list/all')
        .then((response) => response.json())
        .then((json) => {
            setDogs(json.message)
        })
    }

    const searchDog = (text) => {
        if(text.length === 0){
            setSearchedDogs('')
            getDogs();
        } else {
            fetch(`https://dog.ceo/api/breed/${text}/images/random/1`)
            .then((response) => response.json())
            .then((json) => {
                if(json.status === 'success'){
                    setSearchedDogs(json.message)
                    setDogs('')
                }else{
                    // Do nothing
                }
            })
        }
        setSearch(text)
    }

    useEffect(() => {
        getDogs();
    }, [])

    const closeModal = () => {
        setSearchModal(false)
    }
    
    return (
        <div className="App">
            <div className="top-box">
                <div></div>
                <div><h1>Dog Gallery</h1></div>
                <div><div className="custom-search" onClick={() => setSearchModal(true)}>Custom Search</div></div>
            </div>
            {searchModal && <SearchModal closeModal={closeModal}/>}
            <div className="search-box">
                <input type="text" value={search} onChange={(e) => searchDog(e.target.value)} placeholder="Type here to filter by breed"/>
            </div>
            <div className="item-box">
                {Object.keys(dogs).map((dogs, i) => (
                    <Item dogs={dogs} key={i}/>
                ))}
                {searchedDogs && searchedDogs.map((searchedDogs, i) => (
                    <SearchedItem dogs={searchedDogs} dogName={search} key={i}/>
                ))}
            </div>
        </div>
    );
}

export default App;
