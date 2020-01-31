import React from 'react'
import ContentLoader from 'react-content-loader'

const TableRow = props => {
  const random = Math.random() * (1 - 0.7) + 0.7

  return (
    <ContentLoader height={40} width={1060} speed={1.2} primaryColor="#d9d9d9" secondaryColor="#ecebeb" {...props}>
      <rect x="0" y="13" rx="6" ry="6" width={100 * random} height="12" />
      <rect x="34" y="13" rx="6" ry="6" width={100 * random} height="12" />
      <rect x="150" y="13" rx="6" ry="6" width={200 * random} height="12" />
      <rect x="250" y="13" rx="6" ry="6" width={300 * random} height="12" />
      <rect x="633" y="13" rx="6" ry="6" width={78 * random} height="12" />
      <rect x="653" y="13" rx="6" ry="6" width={78 * random} height="12" />
      <rect x="755" y="13" rx="6" ry="6" width={117 * random} height="12" />
      <rect x="938" y="13" rx="6" ry="6" width={83 * random} height="12" />
      <rect x="0" y="39" rx="6" ry="6" width="1060" height=".3" />
    </ContentLoader>
  )
}

const Table = () => (
  <>
  	{Array(6).fill('').map((e, i) => (
      <TableRow key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
    ))}
  </>
)

export default Table
