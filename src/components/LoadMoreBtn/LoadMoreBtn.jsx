import s from './LoadMoreBtn.module.css'

function LoadMoreBtn({onClick}) {
  return (
    <button onClick={onClick} className={s.button}>Load more</button>
  )
}

export default LoadMoreBtn