import logo from './logo.svg';
import 'h8k-components';
import KanbanBoard from './components/kanban-board/index.js';
const title = "Kanban Board";
function App() {
  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
        <KanbanBoard/>
    </div>
  );
}

export default App;
