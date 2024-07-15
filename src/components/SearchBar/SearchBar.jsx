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
    <div className={s.wraper}>
      <form onSubmit={handleSubmit} className={s.form}>
        <label>
          <input
            className={s.input}
            placeholder="Search images and photos"
            name="search"
            value={query}
            onChange={handleChange}
            required
            autoFocus
          />
        </label>
        <button className={s.button} type="submit">
          <CiSearch className={s.icon}/>
        </button>
      </form>
    </div>
  )
}

export default SearchBar;