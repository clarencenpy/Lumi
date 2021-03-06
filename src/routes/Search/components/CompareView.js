import React from 'react'
import s from './CompareView.scss'
import FontAwesome from 'react-fontawesome'
import Popover from '@terebentina/react-popover'
import classnames from 'classnames'
import _ from 'underscore'
import '@terebentina/react-popover/lib/styles.css'

const cx = classnames.bind(s)

const getNumCols = (results) => {
  let numSelected = 0
  _.each(results, result => {
    if (result.selected) numSelected++
  })
  return numSelected
}

const RowItem = (props) => {
  if (!props.summary || !props.summary[props.metric]) return (<td></td>)
  const fieldData = props.summary[props.metric]
  let contents
  switch (fieldData.type) {
    case 'YES':
      contents = (<FontAwesome name="check" size="2x" className={s.black} />)
      break
    case 'NO':
      contents = <span>-</span>;
      break
    case 'OPT-IN':
      contents = (<span className={s.opt}>Opt-In</span>)
      break
    case 'OPT-OUT':
      contents = (<span className={s.opt}>Opt-Out</span>)
      break
  }

  return (
    <td className={s.rowItem}>
      {
        fieldData.htmlContent ? <Popover
          position="top"
          trigger={contents}
        >
          <div className={s.popoverContent}>
            <div dangerouslySetInnerHTML={{__html: fieldData.htmlContent}}></div>
          </div>
        </Popover> :
        contents
      }


    </td>
  )
}

export const CompareView = (props) => {

  const selectedCompanies = props.results.filter(result => {
    return result.selected
  })

  return (
    <div className={s.root}>
      <table className={s.table}>
        {/*Header*/}
        <thead>
        <tr>
          <th>How your Personal Information is used</th>
          {
            selectedCompanies.map(c => (
              <th>
                <img src={c.imageUrl} width="50" height="50" />
                <div>{c.title}</div>
              </th>
            ))
          }
        </tr>
        </thead>

        {/*Rows*/}
        <tbody>
        <tr>
          <td>
            <div><strong>Everyday Business Purpose</strong></div>
            <div>Such as processing your transactions, sending you email notifications, delivery etc.</div>
          </td>
          {
            selectedCompanies.map(c => (
              <RowItem summary={c.summary} metric={'ebp'} />
            ))
          }
        </tr>

        <tr>
          <td>
            <div><strong>Marketing Purpose</strong></div>
            <div>To market their products and services to you</div>
          </td>
          {
            selectedCompanies.map(c => (
              <RowItem summary={c.summary} metric={'mp'} />
            ))
          }
        </tr>

        <tr>
          <td>
            <div><strong>Profiling Purpose</strong></div>
            <div>To generate further insights about you based on your interactions with their products using data analytics</div>
          </td>
          {
            selectedCompanies.map(c => (
              <RowItem summary={c.summary} metric={'pp'} />
            ))
          }
        </tr>

        <tr>
          <td>
            <div><strong>Affiliate's Business Purpose</strong></div>
            <div>For their affiliates to provide you with services</div>
          </td>
          {
            selectedCompanies.map(c => (
              <RowItem summary={c.summary} metric={'abp'} />
            ))
          }
        </tr>

        <tr>
          <td>
            <div><strong>Shared with Third Party Marketers</strong></div>
            <div>To perform targeted advertising campaigns of other products and services</div>
          </td>
          {
            selectedCompanies.map(c => (
              <RowItem summary={c.summary} metric={'tpm'} />
            ))
          }
        </tr>

        <tr>
          <td>
            <div><strong>Shared with Government Agencies</strong></div>
            <div>Without going through the official legal process</div>
          </td>
          {
            selectedCompanies.map(c => (
              <RowItem summary={c.summary} metric={'gov'} />
            ))
          }
        </tr>

        </tbody>

      </table>
    </div>
  )
}

export default CompareView
