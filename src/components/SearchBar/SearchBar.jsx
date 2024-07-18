import s from './SearchBar.module.css'
import { CiSearch } from "react-icons/ci";

function SearchBar({ submit, input, query }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    submit(query);
  };

  const handleChange = (e) => {
    input(e.target.value);
  }

  return (
    <header className={s.wraper}>
      <form onSubmit={handleSubmit} className={s.form}>        
          <input
            className={s.input}
            placeholder="Search images and photos"
            name="search"
            value={query}
            onChange={handleChange}
            required
            autoFocus
          />        
        <button className={s.button} type="submit">
          <CiSearch className={s.icon}/>
        </button>
      </form>
    </header>
  )
}

export default SearchBar;