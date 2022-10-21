import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import LarpAdminManagementContent from './LarpAdminManagementContent';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { PieChart , pieChartDefaultProps} from 'react-minimal-pie-chart';
import Histogram from 'react-chart-histogram';

import '../Styles/global.css';


export default function LarpAdminManagement() {
const navigate = useNavigate();
const apiUrl = 'http://proj9.ruppin-tech.co.il/api/getlarpinfoall';
const [chartFiller, setChartFiller] = useState(null);
const [larpsSearch, setLarpsSearch] = useState([]);

        
        const btnShowLodgingPieChart = () => { //function to create the lodging chart - going over all the larps, and counting the length of every array that contains each of the options (using filter)
            if(larpsSearch === null)
            {
                return <div>There are no Larps in the DB!</div>
            }


            let noLodgeFromLarp = larpsSearch.filter(item => item.HasSleep_Description === 'No Lodging');
            let noLodgingCount = noLodgeFromLarp.length
            let freeLodgeFromLarp = larpsSearch.filter(item => item.HasSleep_Description === 'Free Lodging');
            let freeLodgingCount = freeLodgeFromLarp.length
            let paidLodgeFromLarp = larpsSearch.filter(item => item.HasSleep_Description === 'Paid Lodging');
            let paidLodgingCount = paidLodgeFromLarp.length
            let filler = <div><PieChart     
            label={(props) => { return props.dataEntry.title +"\n"+ props.dataEntry.percentage + "%";}}
            labelStyle={{
                fontSize: '1.5px',
                fontFamily: 'sans-serif',
              }}
            radius={20}
            animate={true}
            data={[
              { title: 'No Lodging', value: noLodgingCount, color: '#E38627' },
              { title: 'Free Lodging', value: freeLodgingCount, color: '#C13C37' },
              { title: 'Paid Lodging', value: paidLodgingCount, color: '#6A2135' },
            ]}
          /></div>;

            setChartFiller(filler)

        }


        const btnShowLarpThemePieChart = () => {
            if(larpsSearch === null)
            {
                return <div>There are no Larps in the DB!</div>
            }
                //very similar to the lodging function

            let tagSciFiFromLarp = larpsSearch.filter(item => item.Tag_Description === 'Sci-Fi');
            let tagSciFiCount = tagSciFiFromLarp.length
            let tagPostApocalypticFromLarp = larpsSearch.filter(item => item.Tag_Description === 'Post-Apocalyptic');
            let tagPostApocalypticCount = tagPostApocalypticFromLarp.length
            let tagFantasyFromLarp = larpsSearch.filter(item => item.Tag_Description === 'Fantasy');
            let tagFantasyCount = tagFantasyFromLarp.length
            let tagPoliticalFromLarp = larpsSearch.filter(item => item.Tag_Description === 'Political');
            let tagPoliticalCount = tagPoliticalFromLarp.length
            let tagMilitantFromLarp = larpsSearch.filter(item => item.Tag_Description === 'Militant');
            let tagMilitantCount = tagMilitantFromLarp.length

            let filler = <div><PieChart     
            label={(props) => { return props.dataEntry.title +"\n"+ props.dataEntry.percentage + "%";}}
            labelStyle={{
                fontSize: '1.5px',
                fontFamily: 'sans-serif',
              }}
            radius={20}
            animate={true}
            data={[
              { title: 'Sci-Fi', value: tagSciFiCount, color: '#E38627' },
              { title: 'Post-Apocalyptic', value: tagPostApocalypticCount, color: '#C13C37' },
              { title: 'Fantasy', value: tagFantasyCount, color: '#6565bf' },
              { title: 'Political', value: tagPoliticalCount, color: '#6efdfd' },
              { title: 'Militant', value: tagMilitantCount, color: '#6A2135' },
            ]}
          /></div>;

            setChartFiller(filler)

        }


        const btnShowFoodPieChart = () => {
            if(larpsSearch === null)
            {
                return <div>There are no Larps in the DB!</div>
            }
              //very similar to the lodging function

            let noFoodFromLarp = larpsSearch.filter(item => item.HasFood_Description === 'No Food');
            let noFoodCount = noFoodFromLarp.length
            let freeFoodFromLarp = larpsSearch.filter(item => item.HasFood_Description === 'Free Food');
            let freeFoodCount = freeFoodFromLarp.length
            let paidFoodFromLarp = larpsSearch.filter(item => item.HasFood_Description === 'Paid Food');
            let paidFoodCount = paidFoodFromLarp.length
            let filler = <div><PieChart     
            label={(props) => { return props.dataEntry.title +"\n"+ props.dataEntry.percentage + "%";}}
            labelStyle={{
                fontSize: '1.5px',
                fontFamily: 'sans-serif',
              }}
            radius={20}
            animate={true}
            data={[
              { title: 'No Food', value: noFoodCount, color: '#E38627' },
              { title: 'Free Food', value: freeFoodCount, color: '#C13C37' },
              { title: 'Paid Food', value: paidFoodCount, color: '#6A2135' },
            ]}
          /></div>;

            setChartFiller(filler)

        }

        const btnShowLarpCommonPriceHistogram = () => {
            //somewhat similar to the rest - we do the different price ranges we are interested in (given the normal larp prices from external knowledge). Than we count each of them - and using the inbuilt props, it organizes the length of every array.
          let underTen = larpsSearch.filter(item => item.Payment <10);
          let underFifteen = larpsSearch.filter(item => item.Payment >= 10 && item.Payment < 15);
          let underTwenty = larpsSearch.filter(item => item.Payment >= 15 && item.Payment < 20);
          let underTwentyFive = larpsSearch.filter(item => item.Payment >= 20 && item.Payment < 25);
          let underThirty = larpsSearch.filter(item => item.Payment >= 25 && item.Payment < 30);
          let underThiryFive = larpsSearch.filter(item => item.Payment >= 30 && item.Payment < 35);
          let underForty = larpsSearch.filter(item => item.Payment >= 35 && item.Payment < 40);
          let aboveForty = larpsSearch.filter(item => item.Payment >= 40);
          const data = [underTen.length,underFifteen.length,underTwenty.length,underTwentyFive.length,underThirty.length,underThiryFive.length,underForty.length,aboveForty.length];//counting array
          const price_range=["10-","10-14","15-19","20-24","25-29","30-34","35-39","40+"] 
          const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };
            
            setChartFiller(    <div>
              <Histogram
                  xLabels={price_range}
                  yValues={data}
                  width='500'
                  height='500'
                  options={options}
              />
            </div>)
        }

    useEffect(() => {


      fetch(apiUrl, { //getting the larps
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

      if (larpsSearch == null) { //creating the larp list
          navigate('/');
          return;
      }


          let temp = larpsSearch.map((larps,index)=> {return<LarpAdminManagementContent key={index} larpSingle={larps}/> })
          return temp




  }


  return (
      
    <div className="background-color-for-all footer-color"><PrimarySearchAppBar></PrimarySearchAppBar>
    <div className="general-container">
        <h1 className='upcoming-larps-title'>LARP Management</h1>
        <h2 className='upcoming-larps-title'>LARPs Graph</h2>    
    <Button style={{margin:30}} variant="contained" onClick={btnShowLodgingPieChart} >Most Common Lodging Option</Button>
    <Button style={{margin:30}} variant="contained" onClick={btnShowFoodPieChart}>Most Common Food Option</Button>
    <Button style={{margin:30}} variant="contained" onClick={btnShowLarpThemePieChart}>Most Common Larp Theme</Button>
    <Button style={{margin:30}} variant="contained" onClick={btnShowLarpCommonPriceHistogram} >how most common price ranges Histogram</Button>
    {chartFiller === null? "" : chartFiller}
    <h2 className='upcoming-larps-title'>LARPs Table</h2>   
        {addLarps()}
        </div>
    </div>
  )
}
