import { useState } from 'react';
import {NewTaskForm} from './NewTaskForm';
import {TasksList} from './TasksList';
import {REE_DATA} from './REE_DATA';

function MainPage() {
  const style = {height: '100%'};
  const [item, setItem] = useState(false);

  const addItem = () => {
    setItem(!item);
  };

  return (
    <div className="container" style={{style}}>
      <div className="row" style={style}>
        <NewTaskForm item={item} addItem={addItem}/>
        <TasksList item={item}/>
        <REE_DATA/>
      </div>
    </div>
  );
}

export default MainPage;