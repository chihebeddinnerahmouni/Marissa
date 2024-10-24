import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface BreadCrumbProps {
  categoryName: any
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({categoryName}) => {
    const { t } = useTranslation()
  return (
    <div className="breadcrumb flex items-center gap-1 text-sm">
      <Link to="/help" className='text-main font-medium hover:underline'>Marissa</Link>
      <p>{">"}</p>
      <p>{t(categoryName)}</p>
    </div>
  );
}

export default BreadCrumb
