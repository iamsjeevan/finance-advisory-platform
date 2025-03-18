
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';

type ChartProps = {
  type: 'line' | 'bar' | 'pie' | 'area';
  data: any;
  options?: any;
};

export const Chart = ({ type, data, options = {} }: ChartProps) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart
            data={data.labels ? data.labels.map((label: string, index: number) => ({
              name: label,
              value: data.datasets[0].data[index]
            })) : data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={data.labels ? "name" : "name"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={data.labels ? "value" : data.datasets[0].dataKey || "value"}
              stroke={data.datasets[0].borderColor || "#8884d8"}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart
            data={data.labels ? data.labels.map((label: string, index: number) => ({
              name: label,
              value: data.datasets[0].data[index]
            })) : data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={data.labels ? "name" : "name"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={data.labels ? "value" : data.datasets[0].dataKey || "value"}
              fill={data.datasets[0].backgroundColor || "#8884d8"}
            />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data.labels ? data.labels.map((label: string, index: number) => ({
                name: label,
                value: data.datasets[0].data[index]
              })) : data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.labels ? data.labels.map((_: any, index: number) => (
                <Cell key={`cell-${index}`} fill={data.datasets[0].backgroundColor[index] || `#${Math.floor(Math.random()*16777215).toString(16)}`} />
              )) : data.map((_: any, index: number) => (
                <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      case 'area':
        return (
          <AreaChart
            data={data.labels ? data.labels.map((label: string, index: number) => ({
              name: label,
              value: data.datasets[0].data[index]
            })) : data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={data.labels ? "name" : "name"} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={data.labels ? "value" : data.datasets[0].dataKey || "value"}
              stroke={data.datasets[0].borderColor || "#8884d8"}
              fill={data.datasets[0].backgroundColor || "#8884d8"}
            />
          </AreaChart>
        );
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      {renderChart()}
    </ResponsiveContainer>
  );
};
