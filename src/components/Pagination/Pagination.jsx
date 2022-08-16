import React from "react";
import styles from './Pagination.module.css';

const Pagination = ( {cambiarPage, cardsPerPage, totalCards} ) => {

    const pageNumbers = []

    for(let i = 1 ; i <= Math.ceil(totalCards / cardsPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <div className={styles.container}>
            {pageNumbers.map(num => (
                <li key={num}>
                    <button className={styles.pageButtons} onClick={() => cambiarPage(num)}>{num}</button>
                </li>
            ))}
        </div>
    )
     

}

export default Pagination;