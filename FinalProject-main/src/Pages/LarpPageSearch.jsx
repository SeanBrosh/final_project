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

    let searchInput = JSON.parse(localStorage.getItem('LarpSearchParameters'));//pulling the 'LarpSearchParameters' - which is in fact the parameters that were written in a different page. 
                                                                            //Using localStorage to keep them in pull-able distance.
    useEffect(() => { //the pulling of the larps from the DB - using Get method - and putting it in set via useState.
        


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
        //This is pretty much the core function that builds the larps. We pulled the larps from the DB earlier - and placed -all- of them in LarpSearch.
        
        if (larpsSearch == null) {//Failsafe - in case for whatever reason we could not have reached the database.
            navigate('/');
            return;
        }
        let filteredLarps = larpsSearch //putting it on a new parameter - which we'll do all the changes to  - and 'write over' should we use any of the Ifs.
        if(searchInput.title!==null)//this one checks the title - using tolowercase function as big or small letters have no weight in the title search.
            filteredLarps = larpsSearch.filter((result) => result.Title.toLowerCase().includes(searchInput.title.toLowerCase()))


        if(searchInput.dateStart!==null && searchInput.dateEnd===null)//using a function we built - we test 3 different stages, depending on the parameters, if each larp's date is 'before' or 'after'.
            filteredLarps = filteredLarps.filter((result) => isBeforeTheDate(searchInput.dateStart,result.LarpDate))
        else if(searchInput.dateStart===null && searchInput.dateEnd!==null)
            filteredLarps = filteredLarps.filter((result) => isBeforeTheDate(result.LarpDateEnd,searchInput.dateEnd))
        else if(searchInput.dateStart!==null && searchInput.dateEnd!==null)
        {
            filteredLarps = filteredLarps.filter((result) => isBeforeTheDate(searchInput.dateStart,result.LarpDate) &&
             isBeforeTheDate(result.LarpDateEnd,searchInput.dateEnd))
        }
        if(searchInput.hasFood!== null && searchInput.hasFood!== "")
            filteredLarps = filteredLarps.filter((result) => result.HasFood_Description.toLowerCase() === searchInput.hasFood.toLowerCase())


            //Those ifs are more normal - simply checking out if the recieved parameter is the same as the the one in the larp, if it's food, tags, and so on.
        if(searchInput.hasSleep!== null && searchInput.hasSleep!== "")
            filteredLarps = filteredLarps.filter((result) => result.HasSleep_Description.toLowerCase() === searchInput.hasSleep.toLowerCase())

        if(searchInput.tags!== null && searchInput.tags!== "")
            filteredLarps = filteredLarps.filter((result) => result.Tag_Description.toLowerCase() === searchInput.tags.toLowerCase())

        if(searchInput.country!== null && searchInput.country!== "")
            filteredLarps = filteredLarps.filter((result) => result.Country.toLowerCase() === searchInput.country.toLowerCase())



        //given the price has a potential to be inbetween 2 different numbers - or max or min, needed to do a 3-stage if here for every situation.
        if(searchInput.paymentStartRng!==null && searchInput.paymentEndRng===null)
            filteredLarps = filteredLarps.filter((result) => result.Payment >= searchInput.paymentStartRng)
        else if(searchInput.paymentStartRng===null && searchInput.paymentEndRng!==null)
            filteredLarps = filteredLarps.filter((result) => result.Payment <= searchInput.paymentEndRng)
        else if(searchInput.paymentStartRng!==null && searchInput.paymentEndRng!==null)
            filteredLarps = filteredLarps.filter((result) => result.Payment >= searchInput.paymentStartRng && result.Payment <= searchInput.paymentEndRng)


        //in this part we prepare the card itself - using MediaCard, and map - that way it'll be ready to show.

        let temp = filteredLarps.map((result, index) => <MediaCard key={index} title={result.Title} short_desc={result.Short_Description} takenImage={result.Larp_Images}
         date={result.LarpDate.slice(0,10) } dateEnd={result.LarpDateEnd.slice(0,10)} hasSleep={result.HasSleep_Description} hasFood={result.HasFood_Description} price={result.Payment}
          tags={result.Tag_Description} country={result.Country} />)
        
        if(temp[0]===undefined)//if this if is true - it means that after all the filters, there were no more larps found - which in turn mean that we should show that message instead.
        {
            return <h1>There were no larps with the given search parameters.</h1>
        }
        return temp //returning all the larps.


    }

    const isBeforeTheDate =(theEarlierDate, theLaterDate) => { //a function to test out if the first date is before the second date
        var earlierDateTransformer = new Date(theEarlierDate)//given some dates are formatted - we revert both to raw Date form.
        var laterDateTransformer = new Date(theLaterDate)
        if (laterDateTransformer.getFullYear() < earlierDateTransformer.getFullYear() || laterDateTransformer.getFullYear() == earlierDateTransformer.getFullYear() &&
         laterDateTransformer.getMonth() < earlierDateTransformer.getMonth() || laterDateTransformer.getFullYear() == earlierDateTransformer.getFullYear() 
         && laterDateTransformer.getMonth() == earlierDateTransformer.getMonth() && laterDateTransformer.getDate() < earlierDateTransformer.getDate()) 
        {//We pretty much go with one by one - first check if the year is bigger, than month - than day. If one of those fail -
            // it matters that the latter date is bigger.
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
