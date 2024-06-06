import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css"

export default function Header() {
  const [searchInput, setSearchInput] = useState("")
  const navigate = useNavigate()

  const currentSearchParams = new URLSearchParams(window.location.search)
  const searchQuery = currentSearchParams.get('searchVideo') || ''
  
  useEffect(()=> {
    setSearchInput(searchQuery)
  },[])

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    
    const currentSearchParams = new URLSearchParams(window.location.search)
    const searchQuery = currentSearchParams.set('searchVideo', searchInput) || ""

    navigate({
      search: currentSearchParams.toString(),
    })
  }

  return (
    <div className="Header sticky-top">
      <nav className="navbar navbar-expand-lg bg-light shadow-lg">
        <div className="container-fluid">
          <Link to="/" className="d-flex gap-2 align-items-center">
            <div className="logo">
              <img src="/logo.png" width={30} alt="" />
            </div>
            <span className="navbar-brand">Ouitube</span>
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/account" className="nav-link active">
                  Account
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                defaultValue={searchInput}
                onChange={(e)=> setSearchInput(e.target.value)}
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-danger" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
