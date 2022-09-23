import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import MediaCard from '../Tools/MediaCard';
import { useNavigate } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';


export default function LarpPageSearch() {


    const [larpsSearch, setLarpsSearch] = useState([]);
    const apiUrl = 'http://proj9.ruppin-tech.co.il/api/getlarpinfoall';
    const navigate = useNavigate();
    const styles = {
        border: '1px solid black', margin: 100, padding: 30, backgroundColor: "white"
    }

    let searchInput = JSON.parse(localStorage.getItem('LarpSearchParameters'));
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

        console.log(searchInput)
        if (larpsSearch == null) {
            navigate('/');
            return;
        }
        let filteredLarps = larpsSearch
        if(searchInput.title!==null)
            filteredLarps = larpsSearch.filter((result) => result.Title.toLowerCase().includes(searchInput.title.toLowerCase()))


        if(searchInput.dateStart!==null && searchInput.dateEnd===null)
            filteredLarps = filteredLarps.filter((result) => isBeforeTheDate(searchInput.dateStart,result.LarpDate))
        else if(searchInput.dateStart===null && searchInput.dateEnd!==null)
            filteredLarps = filteredLarps.filter((result) => isBeforeTheDate(result.dateEnd,searchInput.LarpDateEnd))
        else if(searchInput.dateStart!==null && searchInput.dateEnd!==null)
            filteredLarps = filteredLarps.filter((result) => isBeforeTheDate(searchInput.dateStart,result.LarpDate) && isBeforeTheDate(result.dateEnd,searchInput.LarpDateEnd))

        if(searchInput.hasFood!== null && searchInput.hasFood!== "")
            filteredLarps = filteredLarps.filter((result) => result.HasFood_Description.toLowerCase() === searchInput.hasFood.toLowerCase())

        if(searchInput.hasSleep!== null && searchInput.hasSleep!== "")
            filteredLarps = filteredLarps.filter((result) => result.HasSleep_Description.toLowerCase() === searchInput.hasSleep.toLowerCase())


        if(searchInput.tags!== null && searchInput.tags!== "")
            filteredLarps = filteredLarps.filter((result) => result.Tag_Description.toLowerCase() === searchInput.tags.toLowerCase())

        if(searchInput.country!== null && searchInput.country!== "")
            filteredLarps = filteredLarps.filter((result) => result.Country.toLowerCase() === searchInput.country.toLowerCase())




        if(searchInput.paymentStartRng!==null && searchInput.paymentEndRng===null)
            filteredLarps = filteredLarps.filter((result) => result.Payment >= searchInput.paymentStartRng)
        else if(searchInput.paymentStartRng===null && searchInput.paymentEndRng!==null)
            filteredLarps = filteredLarps.filter((result) => result.Payment <= searchInput.paymentEndRng)
        else if(searchInput.paymentStartRng!==null && searchInput.paymentEndRng!==null)
            filteredLarps = filteredLarps.filter((result) => result.Payment >= searchInput.paymentStartRng && result.Payment <= searchInput.paymentEndRng)




        let temp = filteredLarps.map((result, index) => <MediaCard key={index} title={result.Title} short_desc={result.Short_Description} takenImage={result.Larp_Images} date={result.LarpDate.slice(0,10) } dateEnd={result.LarpDateEnd.slice(0,10)} hasSleep={result.HasSleep_Description} hasFood={result.HasFood_Description} price={result.Payment} tags={result.Tag_Description} country={result.Country} />)
        
        if(temp[0]===undefined)
        {
            return <h1>There were no larps with the given search parameters.</h1>
        }
        return temp


    }

    const isBeforeTheDate =(theEarlierDate, theLaterDate) => {
        var earlierDateTransformer = new Date(theEarlierDate)
        var laterDateTransformer = new Date(theLaterDate)
        if (laterDateTransformer.getFullYear() < earlierDateTransformer.getFullYear() || laterDateTransformer.getFullYear() == earlierDateTransformer.getFullYear() && laterDateTransformer.getMonth() < earlierDateTransformer.getMonth() || laterDateTransformer.getFullYear() == earlierDateTransformer.getFullYear() && laterDateTransformer.getMonth() == earlierDateTransformer.getMonth() && laterDateTransformer.getDate() < earlierDateTransformer.getDate()) 
        {
            return false;
        }

        return true;
    }


    return (
        <div style={{ backgroundColor: "peachpuff" }}>    <PrimarySearchAppBar></PrimarySearchAppBar>
            <div style={styles}>
                <div>{addLarps()}</div>
            </div>
        </div>
    )
}
