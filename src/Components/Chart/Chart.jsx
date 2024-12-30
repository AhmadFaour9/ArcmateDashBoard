import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';  // Import the connect function
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const renderActiveShape = (props, t) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 62;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
    return (
      <React.Fragment>
        <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill={fill} fontSize={20}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={14}>
          {`PV ${value}`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize={12}>
          {`(${t('Rate')} ${(percent * 100).toFixed(2)}%)`}
        </text>
      </React.Fragment>
    );
  };
const Charts = ({ counts }) => {
  const { t } = useTranslation(); // Use the t function to translate text
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const data = [
    { name: t('reportTableColumns.documents'), value: counts.documents },
    { name: t('reportTableColumns.filePages'), value: counts.pages },
    { name: t('reportTableColumns.files'), value: counts.files },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={(props) => renderActiveShape(props, t)}
          cx="50%"  // Adjusted to center horizontally
          cy="50%"  // Adjusted to center vertically
          innerRadius={90}
          outerRadius={100}
          fill="#8884d8"
          data={data}
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Map Redux state to props
const mapStateToProps = (state) => ({
  counts: state.item.counts,  // Access the counts from the Redux store
});
// Define prop types for the component
Charts.propTypes = {
  counts: PropTypes.shape({
    documents: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    files: PropTypes.number.isRequired,
  }).isRequired,
};

// Connect the component to the Redux store
export default connect(mapStateToProps)(Charts);
