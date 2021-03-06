import React from 'react'
import { IndexLink, Link } from 'react-router'
import s from './Header.scss'

export const Header = (props) => (
  <div className={s.navbarContainer}>

    <div className={s.leftContainer}>
      <Link to="/"
        className={[s.logo]}>
        Lumi
      </Link>
    </div>

    <div className={s.centerContainer}>
      <IndexLink to='/'
        className={s.link}
        activeClassName={s.activeRoute}>
        My Dashboard
      </IndexLink>
      <Link to='/search'
        className={s.link}
        activeClassName={s.activeRoute}>
        Search Apps
      </Link>
    </div>

    <div className={s.rightContainer}>
      <Link to='/account'
        className={s.link}
        activeClassName={s.activeRoute}>
        {props.country}
      </Link>
      <Link to='/logout'
        className={s.link}
        activeClassName={s.activeRoute}>
        Contribute
      </Link>
    </div>
  </div>
)

export default Header
