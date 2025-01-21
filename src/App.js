import './App.css';
import Navbar from './components/Navbar/Navbar';
import SearchBar from './components/SearchBar/SearchBar';
import UsersTable from './components/UsersTable/UsersTable';


function App() {
  return (
    <>
    <Navbar/>
    {/* <SearchBar/> */}
    <UsersTable/>
    </>
  );
}

export default App;
