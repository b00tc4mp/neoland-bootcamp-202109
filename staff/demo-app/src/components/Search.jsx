import './Search.sass'

function Search({ onSubmitSearch }) {
    return <>
        <form className="search" onSubmit={event => {
            event.preventDefault()
            const query = event.target.query.value
            onSubmitSearch(query)
        }}>
            <input className="input search__input" type="text" name="query" id="query" placeholder="Criteria" />
            <button type="submit" className="btn search__btn">Search</button>
        </form>
    </>
}

export default Search