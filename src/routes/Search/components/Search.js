import React from 'react'
import CompanyCard from '../../../components/CompanyCard'
import Hero from '../../../components/Hero'
import Button from '../../../components/Button'
import CompareView from './CompareView'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { PopoverWrapper } from '@terebentina/react-popover'
import _ from 'underscore'
import s from './Search.scss'

const getNumSelected = (results) => {
  let numSelected = 0
  _.each(results, result => {
    if (result.selected) numSelected++
  })
  return numSelected
}

const getPlural = (numSelected) => {
  if (numSelected == 1) return 'App Selected'
  return 'Apps Selected'
}

const getActionBtnText = (numSelected) => {
  if (numSelected <= 1) {
    return `View Policy`
  } else {
    return `Compare Policies`
  }
}

export const Search = (props) => {
  return (
    <div>

      <Hero mainText="Lumi Search" subText="Find and Compare Privacy Notices Easily" />

      <div className={s.root}>

        <div className={s.left}>
          <div className={s.searchBoxContainer}>
            <input className={s.searchInput} type="text"
                   placeholder='Type here to filter Apps...'
                   onChange={props.applySearch.bind(this)}
            />
          </div>
          <div className={s.searchContainer}>
            {
              props.results.length > 0 ? props.results.map(result => (
                <CompanyCard selected={result.selected}
                             title={result.title}
                             text={result.text}
                             imageUrl={result.imageUrl}
                             onClick={props.toggleCompany.bind(this, result.title)}
                />
              )) :
              <div className={s.emptyResults}>
                <div className={s.text}>Did not find the app you use?</div>
                <Button primary large>Upload their privacy policy</Button>
              </div>
            }
          </div>
        </div>

        <div className={s.right}>
          <div className={s.actionPanel}>
            <div className={s.displayText}>{`${getNumSelected(props.results)} ${getPlural(getNumSelected(props.results))}`}</div>
            <div className={s.buttonContainer}>
              <Button primary large block onClick={props.toggleCompareView}>{getActionBtnText(getNumSelected(props.results))}</Button>
              <Button primary large block marginTop>Add to your Watchlist</Button>
            </div>
          </div>
        </div>
      </div>

      <PopoverWrapper>
      <ReactCSSTransitionGroup
        transitionName={{
          appear: s.appear,
          appearActive: s.appearActive,
          enter: s.enter,
          enterActive: s.enterActive,
          leave: s.leave,
          leaveActive: s.leaveActive,
        }}
        transitionAppear={true}
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {
          props.showCompareView ?
          <div className={s.fullscreen} key="fullscreenOverlay">
            <div className={s.closeButton} onClick={props.toggleCompareView}></div>
            <CompareView results={props.results} />
          </div> : null
        }

      </ReactCSSTransitionGroup>
      </PopoverWrapper>

    </div>
  )
}

export default Search
