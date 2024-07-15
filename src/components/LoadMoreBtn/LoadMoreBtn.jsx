import s from './LoadMoreBtn.module.css'

function LoadMoreBtn({text, onClick}) {
  return (
    <button onClick={onClick} className={s.button}>{ text }</button>
  )
}

export default LoadMoreBtn