import React from 'react';

import { Table, Button, Tag } from 'antd';
import { DateTime } from 'luxon';
import { Segment } from 'semantic-ui-react';

class AntdTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
    };
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };
  setTimeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'time',
      },
    });
  };
  setDistanceSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'time',
      },
    });
  };

  render() {
    const trips = this.props.tripData;
    const processedTrips = trips.map(trip => {
      return {
        ...trip,
        startTime: DateTime.fromISO(trip.startTime).toFormat('yyyy LLL dd'),
        distance: trip.distance?.toFixed(2),
      };
    });

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Time',
        dataIndex: `startTime`,
        sorter: (a, b) =>
          a.startTime < b.startTime ? -1 : a.startTime > b.startTime ? 1 : 0,
        sortOrder: sortedInfo.columnKey === 'startTime' && sortedInfo.order,
      },

      {
        title: 'Distance (KM)',
        dataIndex: 'distance',
        sorter: (a, b) => a.distance - b.distance,
        sortOrder: sortedInfo.columnKey === 'distance' && sortedInfo.order,
        filteredValue: filteredInfo.distance || null,
        onFilter: (value, record) => record.distance.includes(value),
      },

      {
        title: 'Tags',
        dataIndex: 'tags.tagName',
        filters: [
          { text: 'busuiness', value: 'busuiness' },
          { text: 'vacation', value: 'vacation' },
        ],
        filteredValue: filteredInfo.tags || null,
        onFilter: (value, record) => record.tags.includes(value),
      },

      {
        title: 'Start Location',
        dataIndex: 'startLocation.displayName',
      },

      {
        title: 'End Location',
        dataIndex: 'endLocation.displayName',
      },
    ];
    return (
      <Segment>
        <div>
          <div className="table-operations">
            <Button onClick={this.clearFilters}>Clear filters</Button>
            <Button onClick={this.clearAll}>Clear filters and sorters</Button>
          </div>
          <Table
            columns={columns}
            dataSource={processedTrips}
            onChange={this.handleChange}
          />
        </div>
      </Segment>
    );
  }
}

export default AntdTableComponent;
