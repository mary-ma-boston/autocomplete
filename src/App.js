import React, {useState} from 'react';
import './App.css';


function App() {
  const users = [
    {
      id: 1,
      name: 'Mary'
    },
    {
      id: 2,
      name: 'Malia'
    },
    {
      id: 3,
      name: 'Kai'
    },
    {
      id: 4,
      name: 'Allen'
      
    },
    {
      id: 5,
      name: 'Alex'
    },
    {
      id: 6,
      name: 'Yoyo'
    }];
    
  const [inputName, setInputName] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [showOption, setShowOption] = useState(true);
  

  const inputNameHandler = (e) => {
    setInputName(e.target.value);
    let filtered = e.target.value;
    if(filtered === '') {
      setFilterList([]);
    } else {
      let newFilteredList = users.filter(item => item.name.toLowerCase().substring(0,filtered.length) === filtered.toLowerCase());
      if(newFilteredList.length > 0) {
        setShowOption(true);
      } else {
        setShowOption(false);
      }
      setFilterList(newFilteredList);
    } 
  };

  const autoCompleteHandler = (item) => {
    setInputName(item.name);

    setFilterList([]);
  };

  const handleKeyDown = (e) => {
      if(filterList.length > 0){
        if(e.keyCode === 38 && cursor > 0) {
          setCursor((prevState) => prevState -1);
          
        } else if(e.keyCode === 40 && cursor < filterList.length-1) {
          setCursor((prevState)=>prevState + 1);
          
        } else if(e.keyCode === 13) {
          setInputName(filterList[cursor].name);
          setFilterList([]);
        }
      } else {
        setShowOption(true);
      }   
  };



  return (
    <div className='container'>
     <input type='text' id='name' value={inputName} onChange={inputNameHandler} onKeyDown={handleKeyDown}  autoComplete="off" />
     { showOption  && (
        <ul className='listStyle'>
          { filterList.map(
            (item,index) => { 
                              return (<li 
                                        className={`${index === cursor? 'listActive':''} listitem`} 
                                        key={item.id} 
                                        onClick={()=>autoCompleteHandler(item)}
                                      >
                                        {item.name}
                                      </li>)
                            }
          )}
        </ul>
     )}
     { !showOption && <div className='optionInfo'>No Options!</div> }
    </div>
  );
}

export default App;
