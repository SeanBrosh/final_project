import React, {useState} from 'react';
import LarpPageClass from '../Classes/LarpPageClass';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MultilineTextFields from '../Tools/MultilineTextFields';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LarpBuilderPage() {
const [title, setTitle] = useState(null);
const [short_desc, setShortDesc] = useState(null);
const [long_desc, setLongDesc] = useState(null);
const [link, setLink] = useState(null);
const [payment, setPayment] = useState(null);
const [date, setDate] = useState(null);
const [tags, setTags] = useState("");
const [hasFood, setHasFood] = useState("");
const [hasSleep, setHasSleep] = useState("");
const [larpImage, setLarpImage] = useState("");
const [creator_name, setCreatorName] = useState( JSON.parse(sessionStorage.getItem('login')).user_id);
const apiUrl = 'http://proj9.ruppin-tech.co.il/api/addlarp';
const validTitle = new RegExp('^[a-zA-Z0-9._ :$!%-]{2,41}$');
const validShortDesc = new RegExp('^[a-zA-Z0-9._ :$!%-]{14,300}$');
const validLongDesc = new RegExp('^[a-zA-Z0-9._ :$!%-]{39,3000}$');

const navigate = useNavigate();
const styles = {
    border: '1px solid black', margin:100 , padding:30,backgroundColor:"white"}

const inputTakerShortDesc=(input)=>{

    setShortDesc(input)

};

const inputTakerLongDesc=(input)=>{

    setLongDesc(input)

};

const intputTakerTags = (event) => {
  setTags(event.target.value);
}

const intputTakerHasFood = (event) => {
  setHasFood(event.target.value);
}

const intputTakerHasSleep = (event) => {
  setHasSleep(event.target.value);
}

const btnLarpCreator = () => {
    if (title===null || short_desc===null || long_desc===null || link === null || date===null || payment===null || tags===""|| hasFood===""|| hasSleep==="")
    {
        alert("Please fill all the fields. Take note that the Larp Image field is optional.")
        return;
    }
    if (!validTitle.test(title))
    {
      alert("Please write the title in the length between 3 to 40 characters.")
      return
    }
    if (!validShortDesc.test(short_desc))
    {
      alert("Please write the short description in the length between 15 to 300 characters.")
      return
    }
    if (!validLongDesc.test(long_desc))
    {
      alert("Please write the long description in the length between 40 to 3000 characters.")
      return
    }
    if (payment < 0)
    {
      alert("Please use only positive numbers in the payment!")
      return
    }
    let currentdate = new Date();
    if (date.getFullYear() < currentdate.getFullYear() || date.getFullYear() == currentdate.getFullYear() && date.getMonth() < currentdate.getMonth() || date.getFullYear() == currentdate.getFullYear() && date.getMonth() == currentdate.getMonth() && date.getDate() <= currentdate.getDate()) 
        {
            alert("Bad date! You can only advert dates that are starting from tomorrow onwards.")
            return;
        }

    let formatedDate =(date.getMonth()+1).toString()+ "/" + date.getDate().toString() +"/"+ date.getFullYear().toString()
    
    localStorage.setItem('larpChoice', JSON.stringify(title));

   

  const larpCreationDetails = {
    Title : title,
    Short_Description: short_desc,
    Long_Description: long_desc,
    Payment: payment,
    Link : link,
    Larp_Images : larpImage,
    Creator_Name_ID : creator_name,
    Tag_Description : tags,
    HasSleep_Description:hasSleep,
    HasFood_Description: hasFood,
    LarpDate:formatedDate
  };
  console.log(formatedDate)
  fetch(apiUrl, {
    method: 'PUT',
    body: JSON.stringify(larpCreationDetails),
    headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8',
      'Accept': 'application/json; charset=UTF-8'
    })
  }).then(res => {
    if (res.ok) {
      return res.json()
    }
    else {
      return null;
    }
  }).then((result) => {
    if (result == null) {
      alert("The larp's title is already taken - please use a different title!")
      return;

    }
    alert("Larp Created")
    navigate('/larppage')
    console.log("fetch POST= ", result);
  },
    (error) => {
      console.log("err post=", error)
    });

  }

  return (
    <div style={{backgroundColor:"peachpuff"}}>
        <PrimarySearchAppBar></PrimarySearchAppBar>
        <div style={styles}>
        <h1>Create Your Larp!</h1>
        <TextField id="title-input" style={{margin:30}} onChange={(e)=> setTitle(e.target.value)} helperText="Please enter your Larp's Title"  label="Title"/><br></br>

        <MultilineTextFields labelFill="Write down short description!" inputTaker={inputTakerShortDesc} ></MultilineTextFields><br></br>

        <MultilineTextFields labelFill="Write down a longer description for the page itself!" inputTaker={inputTakerLongDesc} ></MultilineTextFields><br></br>

        <TextField id="link-input" style={{margin:30}} onChange={(e)=> setLink(e.target.value)} helperText="Please enter a link to your larp's facebook / website!" label="Link"/><br></br>
        <TextField id="payment-input" style={{margin:30}} type="number" onChange={(e)=> setPayment(e.target.value)} helperText="Please enter the payment that is required to join the LARP." label="Payment"/><br></br>
        
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker style={{margin:30}}
    label="Date"
    value={date}
    onChange={(e) => {
      setDate(e);
    }}
    renderInput={(params) => <TextField {...params} />}
  /><br></br>
</LocalizationProvider>

      <FormControl style={{margin:30}}
      display="flex"
  justifyContent="center"
  alignItems="center"  sx={{ minWidth: 500 }}>
        <InputLabel id="demo-simple-select-label">Choose the LARP's Theme!</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tags}
          label="Choose the LARP's Theme!"
          onChange={intputTakerTags}
          
        >
          <MenuItem value={"Sci-Fi"}>Sci-Fi</MenuItem>
          <MenuItem value={"Post-Apocalyptic"}>Post-Apocalyptic</MenuItem>
          <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
          <MenuItem value={"Political"}>Political</MenuItem>
          <MenuItem value={"Militant"}>Militant</MenuItem>
        </Select>
      </FormControl> <br></br>



    <FormControl style={{margin:30}}
    display="flex"
  justifyContent="center"
  alignItems="center"  sx={{ minWidth: 500 }}>
        <InputLabel id="demo-simple-select-label">Choose how you handle food in your LARP!</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={hasFood}
          label="Choose how you handle food in your LARP!"
          onChange={intputTakerHasFood}
          
        >
          <MenuItem value={"Free Food"}>Free Food</MenuItem>
          <MenuItem value={"Paid Food"}>Paid Food</MenuItem>
          <MenuItem value={"No Food"}>No Food</MenuItem>
        </Select>
      </FormControl> <br></br>

      <FormControl style={{margin:30}}
      display="flex"
  justifyContent="center"
  alignItems="center"  sx={{ minWidth: 500 }}>
        <InputLabel id="demo-simple-select-label">Choose how you handle lodging in your LARP!</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={hasSleep}
          label="Choose how you handle lodging in your LARP!"
          onChange={intputTakerHasSleep}
          
        >
          <MenuItem value={"Free Lodging"}>Free Lodging</MenuItem>
          <MenuItem value={"Paid Lodging"}>Paid Lodging</MenuItem>
          <MenuItem value={"No Lodging"}>No Lodging</MenuItem>
        </Select>
      </FormControl> <br></br>

    <TextField id="image-input" style={{margin:30}} onChange={(e)=> setLarpImage(e.target.value)} helperText="Please enter the SRC of the larp image you wish to add!" label="Larp Image"/><br></br>
<br></br>

<Button onClick={btnLarpCreator} style={{margin:30}} variant="contained">
    Create the Larp
</Button>
</div>
    </div>
  )
}
