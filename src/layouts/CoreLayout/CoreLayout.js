import React from 'react'
import Header from '../../components/Header'
import FakeChrome from '../../components/FakeChrome'
import s from './CoreLayout.scss'
import '../../styles/core.scss'

const CoreLayout = (props) => {
  return (
    <div className={s.wrapper}>
      <FakeChrome url={props.coreData.fakeUrl} title={props.coreData.fakeTitle} clickLumiHandler={props.startLumi}/>
      <Header country={props.coreData.country} />
      <div className={s.mainContainer}>
        {props.children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
