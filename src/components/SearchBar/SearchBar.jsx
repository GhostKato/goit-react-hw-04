import { Formik, Form, Field } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { CiSearch } from "react-icons/ci";
import s from './SearchBar.module.css';

function SearchBar({ setQuery }) {
  
  const initialValues = {
    query: '',
  };

  const handleSubmit = (values) => {
    const { query } = values;   

     if (!query.trim()) {
      toast.error('Search field is empty.');
      return;
    }    
    setQuery(query);
  };

  return (
    <header className={s.wraper}>
       <Toaster position='top-right' />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>        
        <Form className={s.form}>
          <Field
            className={s.input}
            placeholder='Search images and photos'
            name='query'
             type="text"           
            
            required
            autoFocus
          />        
          <button className={s.button} type='submit'>
            <CiSearch className={s.icon}/>
          </button>
        </Form>
      </Formik>
    </header>
  );
}

export default SearchBar;
