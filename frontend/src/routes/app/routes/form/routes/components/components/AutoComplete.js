import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

//
class AutoCompleteExampleSimple extends Component {
  state = {
    dataSource: [],
  };

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  render() {
    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Simple examples</div>
          <div className="box-body">
            <AutoComplete
              hintText="Type anything"
              dataSource={this.state.dataSource}
              onUpdateInput={this.handleUpdateInput}
            />
            <AutoComplete
              hintText="Type anything"
              dataSource={this.state.dataSource}
              onUpdateInput={this.handleUpdateInput}
              floatingLabelText="Full width"
              fullWidth
            />
          </div>
        </div>
      </div>
    );
  }
}


//
const dataSource1 = [
  {
    text: 'text-value1',
    value: (
      <MenuItem
        primaryText="text-value1"
        secondaryText="&#9786;"
            />
        ),
  },
  {
    text: 'text-value2',
    value: (
      <MenuItem
        primaryText="text-value2"
        secondaryText="&#9786;"
            />
        ),
  },
];

const dataSource2 = ['12345', '23456', '34567'];

const dataSource3 = [
    {textKey: 'Some Text', valueKey: 'someFirstValue'},
    {textKey: 'Some Text', valueKey: 'someSecondValue'},
];
const dataSourceConfig = {
  text: 'textKey',
  value: 'valueKey',
};

const AutoCompleteExampleDataSource = () => (
  <div className="col-lg-6">
    <div className="box box-transparent">
      <div className="box-header">Data sources</div>
      <div className="box-body">
        <AutoComplete
          hintText="text-value data"
          filter={AutoComplete.noFilter}
          dataSource={dataSource1}
        /><br />
        <AutoComplete
          floatingLabelText="showAllItems"
          filter={AutoComplete.noFilter}
          openOnFocus
          dataSource={dataSource2}
        /><br />
        <AutoComplete
          floatingLabelText="Same text, different values"
          filter={AutoComplete.noFilter}
          openOnFocus
          dataSource={dataSource3}
          dataSourceConfig={dataSourceConfig}
        />
      </div>
    </div>
  </div>
);


//
const colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Black',
  'White',
];

const fruit = [
  'Apple', 'Apricot', 'Avocado',
  'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
  'Boysenberry', 'Blood Orange',
  'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
  'Coconut', 'Cranberry', 'Clementine',
  'Damson', 'Date', 'Dragonfruit', 'Durian',
  'Elderberry',
  'Feijoa', 'Fig',
  'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
  'Honeydew', 'Huckleberry',
  'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
  'Kiwi fruit', 'Kumquat',
  'Lemon', 'Lime', 'Loquat', 'Lychee',
  'Nectarine',
  'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
  'Olive', 'Orange',
  'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
  'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
  'Quince',
  'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
  'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
  'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
  'Ugli fruit',
  'Watermelon',
];

const AutoCompleteExampleFilters = () => (
  <div className="col-lg-6">
    <div className="box box-transparent">
      <div className="box-header">Filters</div>
      <div className="box-body">
        <AutoComplete
          floatingLabelText="Type 'r', case insensitive"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={colors}
        />
        <br />
        <AutoComplete
          floatingLabelText="Type 'peah', fuzzy search"
          filter={AutoComplete.fuzzyFilter}
          dataSource={fruit}
          maxSearchResults={5}
        />
      </div>
    </div>
  </div>
);


class AutoCompleteExampleControlled extends Component {
  state = {
    searchText: '',
  };

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText,
    });
  };

  handleNewRequest = () => {
    this.setState({
      searchText: '',
    });
  };

  render() {
    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Controlled examples</div>
          <div className="box-body">
            <AutoComplete
              hintText="Type 'r', case insensitive"
              searchText={this.state.searchText}
              onUpdateInput={this.handleUpdateInput}
              onNewRequest={this.handleNewRequest}
              dataSource={colors}
              filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
              openOnFocus
            />
          </div>
        </div>
      </div>
    );
  }
}


const AutoCompleteSection = () => (
  <article className="article">
    <h2 className="article-title">Material Auto Complete</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="col-xl-10">
          <div className="row">
            <AutoCompleteExampleSimple />
            <AutoCompleteExampleDataSource />
          </div>

          <div className="divider divider-lg divider-dashed" />
          <div className="row">
            <AutoCompleteExampleFilters />
            <AutoCompleteExampleControlled />
          </div>
        </div>
      </div>
    </section>
  </article>
);

module.exports = AutoCompleteSection;
