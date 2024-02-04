import style from './Loading.module.scss';
export default function Loading(dimension = 20) {
  return (
    <div className={style.Lds} style={{
      width: dimension,
    }}>
      <div></div>
      <div></div>
    </div>
  )
}
