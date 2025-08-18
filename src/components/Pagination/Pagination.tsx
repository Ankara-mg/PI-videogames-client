import styles from './Pagination.module.css';

const Pagination = (props: { cambiarPage: (pageNum: number) => void, cardsPerPage: number, totalCards: number }) => {

  const { totalCards, cardsPerPage, cambiarPage } = props;
  const pageNumbers: number[] = []

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className={styles.container}>
      {pageNumbers?.map(num => (
        <li key={num}>
          <button className={styles.pageButtons} onClick={() => cambiarPage(num)}>{num}</button>
        </li>
      ))}
    </div>
  )
}

export default Pagination;