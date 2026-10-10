import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const links = [
  { label: 'Home', path: '/' },
  { label: 'Mission & Journey', path: '/mission' },
  { label: 'Meet The Team', path: '/team' },
  { label: 'Contact Us', path: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNav = (path) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <>
      <nav className="nav">
        <div
          className="nav-logo"
          onClick={() => handleNav('/')}
          style={{ cursor: 'pointer' }}
        >
          VITAKSH<span>.</span>
        </div>

        <button
          className={`menu-btn ${open ? 'active' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{ border: 'none', background: 'none', padding: 0 }}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`overlay ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <ul className="sidebar-menu">
          {links.map(({ label, path }) => (
            <li key={path}>
              <a
                href={path}
                className={location.pathname === path ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(path)
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="sidebar-tag">
          VIT Bhopal University<br />Engineering Innovation
        </div>
      </aside>
    </>
  )
}
