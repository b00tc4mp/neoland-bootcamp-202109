import './Results.sass'

function Results({ vehicles, onVehicle, onFav, isFav }) {
    return <>
        <div className="results">
            {
                vehicles.map(vehicle =>
                    <div className="results__item" key={vehicle.id} onClick={() => onVehicle(vehicle.id)}>
                        <button className="btnFav--item results__button" onClick={event => {
                            event.stopPropagation()
                            onFav(vehicle.id)
                        }}>{isFav ? '✔' : '✖'}</button>
                        <img className="item__img" src={vehicle.thumbnail} alt="" />
                    </div>
                )
            }
        </div>
    </>
}

export default Results

    // < ul className = "vehicles" >
    // {
    //     vehicles.map(vehicle =>
    //         <li className="vehicles__item" key={vehicle.id} onClick={() => onVehicle(vehicle.id)}>
    //             <h1 className="vehicles__title"> {vehicle.name} </h1>
    //             <img className="vehicles__img" src={vehicle.thumbnail} alt="" />
    //             <p className="vehicles__price"> {vehicle.price} </p>
    //         </li>
    //     )
    // }
    //     </ul >