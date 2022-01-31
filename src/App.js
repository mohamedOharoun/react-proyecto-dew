import {NewTaskForm} from './Components/NewTaskForm';
import {TasksList} from './Components/TasksList';
import {REE_DATA} from './Components/REE_DATA';

function App() {
  const style = {height: '100%'};
  return (
    <div className="container" style={style}>
      <div className="row" style={style}>
        <NewTaskForm/>
        <TasksList/>
        <REE_DATA/>
      </div>
    </div>
  );
}

export default App;