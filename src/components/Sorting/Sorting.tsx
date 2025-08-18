import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sortGames } from "@redux/actions";
import styles from './Sorting.module.css';
import type { GameType } from "src/types";
import type { AppDispatch } from "@redux/store";

const Sorting = (props: { games: GameType[] }) => {

  const { games } = props
  const dispatch = useDispatch<AppDispatch>()

  const [ordenarPor, setOrdenarPor] = useState<string>('')
  const [tipoOrden, setTipoOrden] = useState<string>('ascending')
  const [disabled, setDisabled] = useState<boolean>(true)
  const [change, setChange] = useState<boolean>(false)

  const handleSelectOrden = (orden: React.ChangeEvent<HTMLSelectElement>) => {
    setOrdenarPor(orden.target.value)
    setChange(true)
  }

  const handleSelectTipo = (tipo: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoOrden(tipo.target.value)
  }

  useEffect(() => {
    if (change == true) {
      dispatch(sortGames(games, ordenarPor, tipoOrden))
    }

    if (ordenarPor === 'rating' || ordenarPor === 'name')
      setDisabled(false)
    else
      setDisabled(true)
  }, [ordenarPor, tipoOrden])

  return (
    <div className={styles.container}>
      <select id="sort" onChange={handleSelectOrden} className={styles.sortSelection}>
        <option disabled defaultValue='none'>Ordenar por</option>
        <option value='rating'>Rating</option>
        <option value='name'>Nombre</option>
        <option value='default'>Por defecto</option>
      </select>

      <select id='asc-desc' disabled={disabled} onChange={handleSelectTipo} className={styles.sortSelection}>
        <option value='ascending'>Ascendente</option>
        <option value='descending'>Descendente</option>
      </select>
    </div>
  )
}

export default Sorting;
