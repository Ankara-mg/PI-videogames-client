import React from "react";

const Pagination = ( {cambiarPage, cardsPerPage, totalCards} ) => {

    const pageNumbers = []

    for(let i = 1 ; i <= Math.ceil(totalCards / cardsPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <div>
            {pageNumbers.map(num => (
                <li key={num}>
                    <button onClick={() => cambiarPage(num)}>{num}</button>
                </li>
            ))}
        </div>
    )
     

}

export default Pagination;