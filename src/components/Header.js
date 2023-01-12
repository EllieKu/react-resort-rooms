import React from 'react'

export default function Header({children, headerClass}) {
  const className = `${headerClass} header`
  return (
    <header className={className}>
      {children}
    </header>
  )
}

Header.defaultProps = {
  headerClass: 'defaultHeader'
} 