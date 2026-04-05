import React from 'react'

export default function PageHeader({ breadcrumb, title, status, badge, subTabs, activeSubTab, onChangeSubTab, children }) {
  return (
    <div className="page-header">
      <div className="page-breadcrumb">
        {breadcrumb.map((item, index) => (
          <React.Fragment key={item}>
            <span>{item}</span>
            {index < breadcrumb.length - 1 ? <span className="page-breadcrumb-separator">›</span> : null}
          </React.Fragment>
        ))}
      </div>

      <div className="page-title-row">
        <h1 className="page-title">{title}</h1>
        {badge ? <span className="page-live-badge">{badge}</span> : null}
        {status ? <div className="page-status-area">{status}</div> : null}
      </div>

      {subTabs?.length ? (
        <div className="page-tabs">
          <div className="page-tabs-track" style={{ transform: `translateX(${subTabs.findIndex((item) => item.id === activeSubTab) * 100}%)` }} />
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`page-tab${activeSubTab === tab.id ? ' is-active' : ''}`}
              onClick={() => onChangeSubTab(tab.id)}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      ) : null}

      {children}
    </div>
  )
}
