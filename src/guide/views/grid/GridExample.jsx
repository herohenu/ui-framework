
import React, {
  Component,
} from 'react';

import Page, {
  Example,
} from '../../components/page/Page.jsx';

import {
  CheckBox,
  Grid,
  GridBodyEditableCell,
  GridLoadingRow,
  IconCog,
  IconEllipsis,
} from '../../../framework/framework.js';

export default class GridExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bodyRows: [],
      isInitialLoad: true,
      isLoadingBodyRows: false,
      isLastPage: false,
    };
  }

  componentDidMount() {
    this.lazyLoadBodyRows();
  }

  lazyLoadBodyRows() {
    if (this.state.isLoadingBodyRows || this.state.isLastPage) return;

    this.setState({
      isLoadingBodyRows: true,
    });

    // Fake request
    window.setTimeout(() => {
      const generatedRows = this.generateRows(this.state.bodyRows.length, 20);

      if (this.state.isInitialLoad) {
        this.setState({
          isInitialLoad: false,
        });
      }

      // If it returns an empty array, then last page reached
      if (generatedRows.length === 0) {
        this.setState({
          isLastPage: true,
          isLoadingBodyRows: false,
        });
      } else {
        this.setState({
          bodyRows: [...this.state.bodyRows, ...generatedRows],
          isLoadingBodyRows: false,
        });
      }
    }, 2000);
  }

  generateRows(indexStart, numberOfItems) {
    const newArray = [];
    const bodyRow = {
      id: null,
      name: 'Ford F150',
      status: 'In Production',
      fuel: 'Diesel, Unleaded',
      passengers: '3, 5, 6',
      cylinders: '6, 8',
      fuelEconomy: '25mpg',
      sold: '202.1k',
      registered: '200.5k',
    };
    let indexEnd = indexStart + numberOfItems;
    const indexMax = 80;
    indexEnd = indexEnd >= indexMax ? indexMax : indexEnd;
    for (let i = indexStart; i < indexEnd; i++) {
      newArray.push(
        Object.assign({}, bodyRow, {id: i})
      );
    }
    return newArray;
  }

  render() {
    const headerCells = [
      <CheckBox id="select-all" />,
      'Id',
      'Name',
      'Status',
      'Fuel',
      'Passengers',
      'Cylinders',
      'Fuel Economy',
      '# Sold',
      'Registered',
      null,
    ];

    const footerCells = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      '152.1m',
      'Registered',
      null,
    ];

    const bodyRenderer = [
      (item) => {
        return (
          <CheckBox id={item.id} />
        );
      },
      item => item.id,
      item => item.name,
      item => item.status,
      item => item.fuel,
      item => <GridBodyEditableCell
        content={item.passengers}
        onClick={() => {
          // Temp replacement for the edit modal
          let newValue = window.prompt(// eslint-disable-line no-alert
            'Edit this:',
            item.passengers
          );
          // Cancelled
          if (newValue === null) {
            return;
          }
          // If value deleted and empty string is rendered, there is nothing
          // to click in view to change it back, so it fixes that
          if (newValue === '') {
            newValue = 'deleted';
          }
          const newBodyRows = this.state.bodyRows.map((row) => {
            if (row.id === item.id) {
              row.passengers = newValue;
            }
            return row;
          });
          this.setState({
            bodyRows: newBodyRows,
          });
        }}
      />,
      item => item.cylinders,
      item => item.fuelEconomy,
      item => item.sold,
      item => item.registered,
      () => (
        <span>
          <IconEllipsis />
          <IconCog />
        </span>
      ),
    ];

    const ROW_HEIGHT = 34;
    const BODY_HEIGHT = 500;

    return (
      <Page title={this.props.route.name}>

        <Example isClear>

          <Grid
            classContainer="gridExample__container"
            classTable="gridExample__table"
            classHeader="gridExample__header"
            classHeaderRow="gridExample__headerRow"
            classHeaderCell="gridExample__headerCell"
            classBody="gridExample__body"
            classBodyRow="gridExample__bodyRow"
            classBodyCell="gridExample__bodyCell"
            classFooter="gridExample__footer"
            classFooterRow="gridExample__footerRow"
            classFooterCell="gridExample__footerCell"
            headerCells={headerCells}
            bodyRows={this.state.bodyRows}
            bodyRenderer={bodyRenderer}
            footerCells={footerCells}
            initialLoadingRow={this.state.isInitialLoad ? <GridLoadingRow isInitial /> : null}
            // Scroll
            // TODO: change to have a single source of truth.
            // Height should either be dynamically calculated or
            // the supplied value should be set as inline CSS to the cell.
            rowHeight={ROW_HEIGHT}
            bodyHeight={BODY_HEIGHT}
            overflowRecycledRowsCount={20}
            reverseZebraStripeClass="dataTable--reverseStriped"
            lazyLoadRows={this.lazyLoadBodyRows.bind(this)}
            loadingRow={this.state.isLoadingBodyRows && !this.state.isInitialLoad ? <GridLoadingRow /> : null}
            loadDistanceFromBottom={1000}
          />

        </Example>

      </Page>
    );
  }

}
