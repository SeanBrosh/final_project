import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import MediaCard from '../Tools/MediaCard';
import { useNavigate } from 'react-router-dom';


export default function LarpPageSearch() {


    const [larpsSearch, setLarpsSearch] = useState([]);
    const apiUrl = 'http://proj9.ruppin-tech.co.il/api/getlarpinfoall';
    const navigate = useNavigate();
    const styles = {
        border: '1px solid black', margin: 100, padding: 30, backgroundColor: "white"
    }

    let searchInput = JSON.parse(localStorage.getItem('searchInput'));
    useEffect(() => {
        


        fetch(apiUrl, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',
            })
        }).then(res => {
            if (res.ok) {
                let temp = res.json()

                return temp
            }
            else {
                return null;
            }
        }).then((result) => {
            setLarpsSearch(result)
        }
        )
    }, [])


    const addLarps =() => {

        if (larpsSearch == null) {
            navigate('/');
            return;
        }

        if (searchInput === null) {

            let temp = larpsSearch.map((result, index) => <MediaCard key={index} title={result.Title} short_desc={result.Short_Description} takenImage={result.Larp_Images} date={result.LarpDate.slice(0,10) } />)
            return temp

        }
        else {
            let temp = larpsSearch.map((result, index) => { if (result.Title.toLowerCase().includes(searchInput.toLowerCase())) return <MediaCard key={index} title={result.Title} short_desc={result.Short_Description} takenImage={result.Larp_Images} date={result.LarpDate.slice(0,10) } /> })
            return temp
        }


    }


    return (
        <div style={{ backgroundColor: "peachpuff" }}>    <PrimarySearchAppBar></PrimarySearchAppBar>
            <div style={styles}>
                <div>{addLarps()}</div>
            </div>
        </div>
    )
}
